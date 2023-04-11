import {useDispatch} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';

import config from '../../config';
import {useGetChainId} from "../../utils/NetworksCustomHooks";
import {updateBlockNumber} from './actions';
import useDebounce from '../../hooks/useDebounce';
import {getDefaultProvider} from '../../utils/provider';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';

export default function Updater(): null {
  const chainId = useGetChainId()

  const dispatch = useDispatch();
  const windowVisible = useIsWindowVisible();

  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId: chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return {chainId, blockNumber};
          return {chainId, blockNumber: Math.max(blockNumber, state.blockNumber)};
        }
        return state;
      });
    },
    [chainId, setState],
  );

  // The attach/detach listeners.
  useEffect(() => {
    if (!window.ethereum || !chainId || !windowVisible) return undefined;
    setState({chainId, blockNumber: null});

    const provider = getDefaultProvider(config[chainId]);
    provider
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error: any) =>
        console.error(`Failed to get block number for chainId: ${chainId}`, error),
      );

    provider.on('block', blockNumberCallback);
    return () => {
      provider.removeListener('block', blockNumberCallback);
    };
  }, [dispatch, chainId, blockNumberCallback, windowVisible]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      }),
    );
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  return null;
}
