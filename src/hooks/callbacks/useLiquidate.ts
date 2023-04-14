import { BigNumber } from "ethers";
import { useCallback } from "react";
import { useAddPopup } from "../../state/application/hooks";
import { useTransactionAdder } from "../../state/transactions/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";
import { useGetChainId } from "../../utils/NetworksCustomHooks";
import useCore from "../useCore";

const useLiquidate = (
  user: string,
  collateralAsset: string,
  debtAsset: string,
  debtToCover: BigNumber,
  receiveAtoken: boolean
) => {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const chainId = useGetChainId();

  return useCallback(
    async (
      onInitiating: () => void,
      onSuccess: () => void,
      onFailure: (e: string) => void
    ): Promise<void> => {
      if (core === undefined || core === null)
        onFailure("Internal core error please try refreshing the page");
      else
        try {
          const contract = core.getPoolContract(chainId);
          const response = await contract.liquidationCall(
            collateralAsset,
            debtAsset,
            user,
            debtToCover,
            receiveAtoken
          );
          onInitiating();

          addTransaction(response, {
            summary: `Liquidate #${user.toString()}`,
          });

          const tx = await response.wait();

          if (tx.status === 1) onSuccess();
          if (tx.status !== 1) onFailure("");
        } catch (e: any) {
          onFailure(formatErrorMessage(e?.data?.message || e?.message));
          addPopup({
            error: {
              message: formatErrorMessage(e?.data?.message || e?.message),
              stack: e.stack,
            },
          });
        }
    },
    [
      core,
      chainId,
      collateralAsset,
      debtAsset,
      user,
      debtToCover,
      receiveAtoken,
      addTransaction,
      addPopup,
    ]
  );
};

export default useLiquidate;
