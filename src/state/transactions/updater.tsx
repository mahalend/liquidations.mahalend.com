import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import config from '../../config';
import {useGetChainId} from "../../utils/NetworksCustomHooks";
import {getDefaultProvider} from '../../utils/provider';
import {useAddPopup, useBlockNumber} from '../application/hooks';
import {AppDispatch, AppState} from '../index';

import {checkedTransaction, finalizeTransaction} from './actions';

export function shouldCheck(
  lastBlockNumber: number,
  tx: { addedTime: number; receipt?: {}; lastCheckedBlockNumber?: number },
): boolean {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // Every 10 blocks if pending for longer than an hour.
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // Every 3 blocks if pending more than 5 minutes.
    return blocksSinceCheck > 2;
  } else {
    // Otherwise every block.
    return true;
  }
}

export default function Updater(): null {
  const chainId = useGetChainId();

  const lastBlockNumber = useBlockNumber();

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<AppState, AppState['transactions']>((state) => state.transactions);

  const transactions = chainId ? state[chainId] ?? {} : {};

  // Show d on confirm.
  const addPopup = useAddPopup();

  useEffect(() => {
    if (!chainId || !window.ethereum || !lastBlockNumber) {
      return;
    }

    const provider = getDefaultProvider(config[chainId]);
    Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .forEach((hash) => {
        provider
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                }),
              );

              addPopup(
                {
                  txn: {
                    hash,
                    success: receipt.status === 1,
                    summary: transactions[hash]?.summary,
                  },
                },
                hash,
              );
            } else {
              dispatch(checkedTransaction({chainId, hash, blockNumber: lastBlockNumber}));
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error);
          });
      });
  }, [chainId, transactions, lastBlockNumber, dispatch, addPopup]);

  return null;
}
