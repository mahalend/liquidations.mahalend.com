import { Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import ABIS from "../protocol/deployments/abi";
import {
  LOADING_DEFAULT_BASIC_STATE,
  NON_LOADING_DEFAULT_BASIC_STATE,
} from "../utils/constants";
import { BasicState } from "../utils/interface";
import { useGetAccount } from "../utils/NetworksCustomHooks";

import useCore from "./useCore";

const useGetAddressBalance = (address: string | null) => {
  const [tokenDetails, setTokenDetails] = useState<BasicState>(
    LOADING_DEFAULT_BASIC_STATE
  );

  const core = useCore();
  const account = useGetAccount();

  const fetch = useCallback(async () => {
    if (address === null || core === null || core === undefined) {
      setTokenDetails(NON_LOADING_DEFAULT_BASIC_STATE);
    } else {
      const contract = new Contract(address, ABIS.IERC20, core.provider);
      const balance = await contract.balanceOf(account);
      setTokenDetails({
        isLoading: false,
        value: balance,
      });
    }
  }, [address, account, core]);

  useEffect(() => {
    if (core && address) {
      fetch().catch((err) => {
        setTokenDetails(NON_LOADING_DEFAULT_BASIC_STATE);
        console.error(
          `Failed to fetch token details of ${address} fors ${address}: ${err.stack} `
        );
      });
    } else {
      setTokenDetails(NON_LOADING_DEFAULT_BASIC_STATE);
    }
  }, [address, core, fetch]);

  return tokenDetails;
};

export default useGetAddressBalance;
