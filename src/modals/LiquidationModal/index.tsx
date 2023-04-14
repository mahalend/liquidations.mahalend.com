import { BigNumber } from "ethers";
import React, { useMemo, useState } from "react";
import CollateralDropDown from "../../components/CollateralDropDown";
import DataField from "../../components/DataField";
import Input from "../../components/Input";
import InputContainer from "../../components/InputContainer";
import Modal from "../../components/Modal";
import Selector from "../../components/Selector";
import TextWrapper from "../../components/TextWrapper";
import useCore from "../../hooks/useCore";
import useGetAddressBalance from "../../hooks/useGetAddressBalance";
import theme from "../../theme";
import { formatToBN, getDisplayBalance } from "../../utils/formatBalance";
import {
  IModalProps,
  IReserveData,
  IUserBorrowReserve,
  IUserCollateralReserve,
  IUserDataWithHF,
} from "../../utils/interface";
import LiquidationButton from "./LiquidationButton";

interface IProps {
  selectedUserData: IUserDataWithHF;
}

const reservesData: IReserveData[] = [
  {
    symbol: "DAI",
    configurationHistory: [
      {
        timestamp: 1670829767,
        reserveLiquidationBonus: "11000",
        reserveLiquidationThreshold: "9000",
      },
    ],
  },
];

const LiquidationModal = (props: IModalProps & IProps) => {
  const core = useCore();
  const [amount, setAmount] = useState<string>("");

  const [openDepositedCollateral, setOpenDepositedCollateral] =
    useState<boolean>(false);
  const [selectedDepositedCollateral, setSelectedDepositedCollateral] =
    useState<string>("");
  const depositedCollateral = useMemo(() => {
    setSelectedDepositedCollateral(
      props.selectedUserData.collateralReserve[0].reserve.symbol
    );
    return props.selectedUserData.collateralReserve.map(
      (data) => data.reserve.symbol
    );
  }, [props.selectedUserData.collateralReserve]);
  const depositCollateralReserve: IUserCollateralReserve | undefined =
    useMemo(() => {
      return props.selectedUserData.collateralReserve.filter(
        (data) => data.reserve.symbol === selectedDepositedCollateral
      )[0];
    }, [props.selectedUserData.collateralReserve, selectedDepositedCollateral]);

  const [openBorrowToken, setOpenBorrowToken] = useState<boolean>(false);
  const [selectedBorrowToken, setSelectedBorrowToken] = useState<string>("");
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
    const value = Number(
      getDisplayBalance(
        BigNumber.from(borrowReserve.currentTotalDebt),
        borrowReserve.reserve.decimals
      )
    );
    const HF = Number(getDisplayBalance(props.selectedUserData.hf));

    if (HF > 1) return 0;
    else if (HF > 0.95) return value / 2;
    else return value;
  }, [borrowReserve, props.selectedUserData.hf]);

  const borrowTokenBalance = useGetAddressBalance(
    borrowReserve?.reserve.underlyingAsset || null
  );

  const reserveData = {
    isLoading: false,
    data: reservesData,
  };

  //ToDo: UnComment for production
  /*const reserveData = useGetReservesData(
    depositCollateralReserve?.reserve.symbol || null
  );*/

  const errorMessage: string = useMemo(() => {
    if (formatToBN(amount).gt(maxAllowedLiquidation)) {
      return "You cannot liquidate more than the max allowed liquidation";
    }
    if (formatToBN(amount).lt(borrowTokenBalance.value)) {
      return "Insufficient balance";
    }
    return "";
  }, [amount, borrowTokenBalance.value, maxAllowedLiquidation]);

  if (
    borrowReserve === undefined ||
    depositCollateralReserve === undefined ||
    core === undefined ||
    core === null ||
    core?._signer === undefined
  )
    return <div>Something went wrong please try again later</div>;

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
          {reserveData.data && reserveData.data.length > 0 && (
            <DataField
              label={"Collateral bonus"}
              isValueLoading={reserveData.isLoading}
              value={`${
                Number(
                  reserveData.data[0].configurationHistory[0]
                    .reserveLiquidationBonus
                ) /
                  100 -
                100
              }%`}
              className={"m-t-12"}
            />
          )}
        </div>
        <div className={"m-t-32"}>
          {errorMessage !== "" ? (
            <TextWrapper
              text={errorMessage}
              color={theme.color.red[300]}
              align={"center"}
            />
          ) : (
            <LiquidationButton
              core={core}
              signer={core._signer}
              selectedUserData={props.selectedUserData}
              amount={amount}
              borrowReserve={borrowReserve}
              depositCollateralReserve={depositCollateralReserve}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LiquidationModal;
