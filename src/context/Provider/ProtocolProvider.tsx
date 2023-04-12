import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import config from "../../config";
import Protocol from "../../protocol";
import { useGetAccount, useGetChainId } from "../../utils/NetworksCustomHooks";

export interface ProtocolContext {
  core: Protocol | undefined | null;
}

export const Context = createContext<ProtocolContext>({ core: null });

interface IProps {
  children: React.ReactNode;
}

export const ProtocolProvider = (props: IProps) => {
  const { children } = props;
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

  return <Context.Provider value={{ core }}>{children}</Context.Provider>;
};
