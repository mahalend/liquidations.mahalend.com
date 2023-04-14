import { ethers } from "ethers";
import React, { useMemo, useState } from "react";
import Button from "../../components/Button";
import TextWrapper from "../../components/TextWrapper";
import useApprove, { ApprovalState } from "../../hooks/callbacks/useApprove";
import useLiquidate from "../../hooks/callbacks/useLiquidate";
import useGetTokenDetails from "../../hooks/useGetTokenDetails";
import Protocol from "../../protocol";
import ERC20 from "../../protocol/ERC20";
import { formatToBN } from "../../utils/formatBalance";
import {
  ITxStatus,
  IUserBorrowReserve,
  IUserCollateralReserve,
  IUserDataWithHF,
} from "../../utils/interface";
import { useGetChainId } from "../../utils/NetworksCustomHooks";

interface IProps {
  core: Protocol;
  signer: ethers.Signer;
  amount: string;
  selectedUserData: IUserDataWithHF;
  borrowReserve: IUserBorrowReserve;
  depositCollateralReserve: IUserCollateralReserve;
}

const LiquidationButton = (props: IProps) => {
  const chainId = useGetChainId();

  const [txStatus, setTxStatus] = useState<ITxStatus>("initial");

  const { fetchingDetails, tokenDetails } = useGetTokenDetails(
    props.borrowReserve.reserve.underlyingAsset
  );

  const token = useMemo(() => {
    return new ERC20(
      props.borrowReserve.reserve.underlyingAsset,
      props.signer,
      tokenDetails.value.symbol,
      tokenDetails.value.decimals
    );
  }, [
    props.borrowReserve.reserve.underlyingAsset,
    props.signer,
    tokenDetails.value.symbol,
    tokenDetails.value.decimals,
  ]);

  const [approveStatus, approve] = useApprove(
    token,
    props.core.getPoolContract(chainId).address || ""
  );

  const isApproved = useMemo(
    () => approveStatus === ApprovalState.APPROVED,
    [approveStatus]
  );
  const isApproving = useMemo(
    () => approveStatus === ApprovalState.PENDING,
    [approveStatus]
  );

  const liquidateAction = useLiquidate(
    props.selectedUserData.id,
    props.depositCollateralReserve.reserve.underlyingAsset,
    props.borrowReserve.reserve.underlyingAsset,
    formatToBN(props.amount, 18),
    false
  );
  const handleLiquidate = () => {
    liquidateAction(
      () => {
        setTxStatus("in-progress");
      },
      () => {
        setTxStatus("successful");
        window.location.reload();
      },
      () => {
        setTxStatus("not-successful");
      }
    ).then();
  };

  return (
    <div>
      {fetchingDetails ? (
        <TextWrapper text={"Fetching Details...."} align={"center"} />
      ) : isApproved ? (
        <Button
          trackingid={"liquidate-modal"}
          className={"primary-button"}
          onClick={handleLiquidate}
        >
          Liquidate
        </Button>
      ) : (
        <Button
          trackingid={"approve"}
          className={"primary-button"}
          disabled={isApproving}
          onClick={approve}
        >
          {isApproving ? "Approving" : "Approve"}
        </Button>
      )}
    </div>
  );
};

export default LiquidationButton;
