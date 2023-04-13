import { BigNumber } from "ethers";
import React, { useMemo, useState } from "react";
import Button from "../../components/Button";
import CollateralDropDown from "../../components/CollateralDropDown";
import DataField from "../../components/DataField";
import Input from "../../components/Input";
import InputContainer from "../../components/InputContainer";
import Modal from "../../components/Modal";
import Selector from "../../components/Selector";
import TextWrapper from "../../components/TextWrapper";
import useGetAddressBalance from "../../hooks/useGetAddressBalance";
import { getDisplayBalance } from "../../utils/formatBalance";
import {
  IModalProps,
  IUserBorrowReserve,
  IUserDataWithHF,
} from "../../utils/interface";

interface IProps {
  selectedUserData: IUserDataWithHF;
}

const LiquidationModal = (props: IModalProps & IProps) => {
  console.log("props", props.selectedUserData);
  const [amount, setAmount] = useState<string>("");

  const [openDepositedCollateral, setOpenDepositedCollateral] =
    useState<boolean>(false);
  const [selectedDepositedCollateral, setSelectedDepositedCollateral] =
    useState<string>("Select Receiving Collateral");
  const depositedCollateral = useMemo(() => {
    setSelectedDepositedCollateral(
      props.selectedUserData.collateralReserve[0].reserve.symbol
    );
    return props.selectedUserData.collateralReserve.map(
      (data) => data.reserve.symbol
    );
  }, [props.selectedUserData.collateralReserve]);
  /*const depositCollateralReserve: IUserCollateralReserve = useMemo(() => {
    return props.selectedUserData.collateralReserve.filter(
      (data) => data.reserve.symbol === selectedDepositedCollateral
    )[0];
  }, [props.selectedUserData.collateralReserve, selectedDepositedCollateral]);*/

  const [openBorrowToken, setOpenBorrowToken] = useState<boolean>(false);
  const [selectedBorrowToken, setSelectedBorrowToken] =
    useState<string>("Select Token");
  const borrowToken = useMemo(() => {
    setSelectedBorrowToken(
      props.selectedUserData.borrowReserve[0].reserve.symbol
    );
    return props.selectedUserData.borrowReserve.map(
      (data) => data.reserve.symbol
    );
  }, [props.selectedUserData.borrowReserve]);
  const borrowReserve: IUserBorrowReserve | undefined = useMemo(() => {
    return props.selectedUserData.borrowReserve.filter(
      (data) => data.reserve.symbol === selectedBorrowToken
    )[0];
  }, [props.selectedUserData.borrowReserve, selectedBorrowToken]);

  const maxAllowedLiquidation = useMemo(() => {
    if (borrowReserve === undefined) return 0;

    // here if above CLOSE_FACTOR_HF_THRESHOLD then 50% allowed and if below then 100% allowed
    //ToDo: Above logic setup
    return (
      Number(
        getDisplayBalance(
          BigNumber.from(borrowReserve.currentTotalDebt),
          borrowReserve.reserve.decimals
        )
      ) / 2
    );
  }, [borrowReserve]);

  const borrowTokenBalance = useGetAddressBalance(
    borrowReserve?.reserve.underlyingAsset || null
  );

  return (
    <Modal
      title={"Liquidate"}
      open={props.openModal}
      handleClose={props.onModalClose}
      closeButton
    >
      <div>
        <div className={"bottom-divider p-b-24"}>
          <TextWrapper text={`${props.selectedUserData.id}`} align={"center"} />
          <div className={"single-line-start-between m-t-24"}>
            <TextWrapper text={"Collateral"} fontWeight={600} />
            <div>
              {props.selectedUserData.collateralReserve.map((data) => {
                return (
                  <TextWrapper
                    text={`${getDisplayBalance(
                      BigNumber.from(data.currentATokenBalance),
                      data.reserve.decimals
                    )}
                    ${data.reserve.symbol}`}
                    align={"right"}
                  />
                );
              })}
            </div>
          </div>
          <div className={"single-line-start-between m-t-24"}>
            <TextWrapper text={"Debt"} fontWeight={600} />
            <div>
              {props.selectedUserData.borrowReserve.map((data) => {
                return (
                  <TextWrapper
                    text={`${getDisplayBalance(
                      BigNumber.from(data.currentTotalDebt),
                      data.reserve.decimals
                    )}
                    ${data.reserve.symbol}`}
                    align={"right"}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={"m-t-24 p-b-24 bottom-divider"}>
          <div className={"m-t-24"}>
            <TextWrapper
              text={"Select Collateral"}
              fontWeight={"bold"}
              className={"m-b-12"}
            />
            <Selector
              openSelector={openDepositedCollateral}
              toggleSelector={() =>
                setOpenDepositedCollateral(!openDepositedCollateral)
              }
              dropdownValue={depositedCollateral}
              selectedData={selectedDepositedCollateral}
              setSelectedData={setSelectedDepositedCollateral}
              width={"100%"}
              dropDownWidth={"100%"}
            />
          </div>
          <div className={"m-t-24"}>
            <TextWrapper
              text={"Pay debt"}
              fontWeight={"bold"}
              className={"m-b-12"}
            />
            <InputContainer
              label={"Enter Amount"}
              dataLabel={"Balance"}
              dataValueLoading={borrowTokenBalance.isLoading}
              dataValue={Number(
                getDisplayBalance(
                  borrowTokenBalance.value,
                  borrowReserve?.reserve.decimals || 18,
                  6
                )
              ).toLocaleString("en-US", { minimumFractionDigits: 3 })}
            >
              <div className={"single-line-center-between"}>
                <Input
                  value={amount}
                  setValue={(data) => setAmount(data)}
                  onMaxClick={() => {
                    setAmount(
                      Number(
                        getDisplayBalance(BigNumber.from(0), 18, 18)
                      ).toString()
                    );
                  }}
                />
                <CollateralDropDown
                  selectedSymbol={selectedBorrowToken}
                  showDropDown={openBorrowToken}
                  hasDropDown={borrowToken.length > 1}
                  toggleDropDown={() => setOpenBorrowToken(!openBorrowToken)}
                  symbols={borrowToken}
                  ondropDownValueChange={(data) => setSelectedBorrowToken(data)}
                />
              </div>
            </InputContainer>
          </div>
        </div>
        <div className={"m-t-24"}>
          <DataField
            label={"Max allowed Debt"}
            value={maxAllowedLiquidation.toString()}
          />
          <DataField
            label={"Collateral bonus"}
            value={`x %`}
            className={"m-t-12"}
          />
        </div>
        <Button
          trackingid={"liquidate-modal"}
          className={"m-t-32 primary-button"}
        >
          Liquidate
        </Button>
      </div>
    </Modal>
  );
};

export default LiquidationModal;
