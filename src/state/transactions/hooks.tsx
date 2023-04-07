import {TransactionResponse} from '@ethersproject/providers';
import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetAccount, useGetChainId} from "../../utils/NetworksCustomHooks";

import {useAddPopup} from '../application/hooks';
import {AppDispatch, AppState} from '../index';

import {addTransaction, clearAllTransactions} from './actions';
import {TransactionDetails} from './reducer';

/**
 * Helper that can take a ethers library transaction response and
 * add it to the list of transactions.
 */
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: { summary?: string; approval?: { tokenAddress: string; spender: string } },
) => void {
  const chainId = useGetChainId();
  const account = useGetAccount();
  const dispatch = useDispatch<AppDispatch>();
  const addPopup = useAddPopup();

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
      }: { summary?: string; approval?: { tokenAddress: string; spender: string } } = {},
    ) => {
      if (!account) return;
      if (!chainId) return;

      const {hash} = response;
      if (!hash) {
        throw Error('No transaction hash found.');
      }

      addPopup(
        {
          txn: {
            hash,
            loading: true,
            success: false,
            summary: summary,
          },
        },
        hash,
      );

      dispatch(addTransaction({hash, from: account, chainId, approval, summary}));
    },
    // eslint-disable-next-line
    [dispatch, chainId, account],
  );
}

// Returns all the transactions for the current chain.
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const chainId = useGetChainId();
  const state = useSelector<AppState, AppState['transactions']>((state) => state.transactions);

  return chainId ? state[chainId] ?? {} : {};
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) {
    return false;
  }
  return !transactions[transactionHash].receipt;
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000;
}

// Returns whether a token has a pending approval transaction.
export function useHasPendingApproval(
  tokenAddress: string | undefined,
  spender: string | undefined,
): boolean {
  const allTransactions = useAllTransactions();
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash];
        if (!tx) return false;
        if (tx.receipt) {
          return false;
        } else {
          const approval = tx.approval;
          if (!approval) return false;
          return (
            approval.spender === spender &&
            approval.tokenAddress === tokenAddress &&
            isTransactionRecent(tx)
          );
        }
      }),
    [allTransactions, spender, tokenAddress],
  );
}

export function useClearAllTransactions(): { clearAllTransactions: () => void } {
  const chainId = useGetChainId();
  const dispatch = useDispatch<AppDispatch>();
  return {
    clearAllTransactions: useCallback(() => dispatch(clearAllTransactions({chainId: chainId})), [
      chainId,
      dispatch,
    ]),
  };
}
