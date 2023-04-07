import React, {createContext, useEffect, useState} from 'react';

import config from '../../config';
import Protocol from '../../protocol';
import {useDispatch} from "react-redux";
import {useGetAccount, useGetChainId} from "../../utils/NetworksCustomHooks";

export interface ProtocolContext {
  core: Protocol;
}

// @ts-ignore
export const Context = createContext<ProtocolContext>({core: null});

interface IProps {
  children: any;
}

export const ProtocolProvider = (props: IProps) => {
  const {children} = props;
  const chainId = useGetChainId();
  const account = useGetAccount();
  const [core, setCore] = useState<Protocol>();
  const dispatch = useDispatch();


  useEffect(() => {
    if (!core && config) {
      const newCore = new Protocol(config, chainId);
      if (account) {
        newCore.unlockWallet(window.ethereum, account);
      }
      setCore(newCore);
    } else if (account && core) {
      core.unlockWallet(window.ethereum, account);
    }
  }, [account, core, dispatch, chainId]);

  // @ts-ignore
  return <Context.Provider value={{core}}>{children}</Context.Provider>;
};
