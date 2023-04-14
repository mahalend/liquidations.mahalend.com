import { BigNumber, Contract, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import ABIS from "../protocol/deployments/abi";
import { useGetAccount } from "../utils/NetworksCustomHooks";

import useCore from "./useCore";

export type TokenDetailsState = {
  isLoading: boolean;
  value: {
    symbol: string;
    decimals: number;
    balance: BigNumber;
  };
};

const LOADING_DEFAULT_BASIC_STATE = {
  isLoading: true,
  value: {
    symbol: "",
    decimals: 18,
    balance: BigNumber.from(0),
  },
};

const NON_LOADING_DEFAULT_BASIC_STATE = {
  isLoading: false,
  value: {
    symbol: "",
    decimals: 18,
    balance: BigNumber.from(0),
  },
};

const useGetTokenDetails = (address: string) => {
  const [fetchingDetails, setFetchingDetails] = useState<boolean>(false);
  const [tokenDetails, setTokenDetails] = useState<TokenDetailsState>(
    LOADING_DEFAULT_BASIC_STATE
  );

  const core = useCore();
  const account = useGetAccount();

  const fetch = useCallback(async () => {
    if (!utils.isAddress(address) || !account) {
      setTokenDetails(NON_LOADING_DEFAULT_BASIC_STATE);
    } else {
      setFetchingDetails(true);
      const contract = new Contract(address, ABIS.IERC20, core?.provider);
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();
      const balance = await contract.balanceOf(account);
      setFetchingDetails(false);
      setTokenDetails({
        isLoading: false,
        value: { symbol, decimals: decimals, balance },
      });
    }
  }, [address, account, core]);

  useEffect(() => {
    if (core && address) {
      fetch().catch((err) => {
        setFetchingDetails(false);
        setTokenDetails(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(
          `Failed to fetch token details of ${address} for ${address}: ${err.stack} `
        );
      });
    } else {
      setFetchingDetails(false);
      setTokenDetails(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [address, core, fetch]);

  return { fetchingDetails, tokenDetails };
};

export default useGetTokenDetails;
