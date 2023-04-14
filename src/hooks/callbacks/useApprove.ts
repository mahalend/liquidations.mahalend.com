import { BigNumber, ethers } from "ethers";
import { useCallback, useMemo } from "react";

import ERC20 from "../../protocol/ERC20";
import { useAddPopup } from "../../state/application/hooks";
import {
  useHasPendingApproval,
  useTransactionAdder,
} from "../../state/transactions/hooks";
import formatErrorMessage from "../../utils/formatErrorMessage";
import useAllowance from "../state/useAllowance";

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from("1000000000000000000000000");

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

/**
 * Returns a variable indicating the state of the approval and a function which
 * approves if necessary or early returns.
 */
function useApprove(
  token: ERC20,
  spender: string
): [ApprovalState, () => Promise<void>] {
  const pendingApproval = useHasPendingApproval(token.address, spender);
  const currentAllowance = useAllowance(token, spender, pendingApproval);
  const addPopup = useAddPopup();

  // Check the current approval status.
  const approvalState: ApprovalState = useMemo(() => {
    // We might not have enough data to know whether we need to approve.
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // The amountToApprove will be defined if currentAllowance is.
    return currentAllowance.lt(APPROVE_BASE_AMOUNT)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pendingApproval]);

  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    try {
      if (
        approvalState !== ApprovalState.NOT_APPROVED &&
        approvalState !== ApprovalState.UNKNOWN
      ) {
        console.error("Approve was called unnecessarily");
        return;
      }

      const response = await token.approve(spender, APPROVE_AMOUNT);
      addTransaction(response, {
        summary: `Approve ${token.symbol}`,
        approval: {
          tokenAddress: token.address,
          spender: spender,
        },
      });
    } catch (e: any) {
      console.log(e);
      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e?.stack,
        },
      });
    }
  }, [approvalState, token, spender, addTransaction, addPopup]);

  return [approvalState, approve];
}

export default useApprove;
