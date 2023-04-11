import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {IUserDataWithHF} from "../../utils/interface";
import {useGetChainId} from "../../utils/NetworksCustomHooks";
import useCore from "../useCore";
import useGetV3UnhealthyPosition from "./useGetV3UnhealthyPosition";



interface IV3PositionsWithHF {
  isLoading: boolean;
  data: IUserDataWithHF[];
}

const useGetPositionHF = () => {
  const [value, setValue] = useState<IV3PositionsWithHF>({isLoading: true, data: []});

  const core = useCore();
  const { address: account } = useAccount();

  const chainId = useGetChainId();
  const contract = core?.getPoolContract(chainId);
  const v3Positon = useGetV3UnhealthyPosition();

  const fetchData = useCallback(async () => {
    if (v3Positon.isLoading || v3Positon.data.length === 0) {
      setValue({isLoading: false, data: []});
      return;
    }

    const v3PositonsWithHf = await Promise.all(
      v3Positon.data.map(async (data) => {
        const response = await contract.getUserAccountData();
        const factor: BigNumber = response.healthFactor;

        return {
          ...data,
          hf: factor
        }
      }))

    setValue({
      isLoading: false,
      data: v3PositonsWithHf,
    });
  }, [account, contract]);

  useEffect(() => {
    if (core) {
      fetchData().catch((err) => {
        setValue({isLoading: false, data: []});
        console.error(
          `Failed to fetch hf for position: ${err.stack}`
        );
      });
    }
  }, [setValue, core, account, fetchData]);

  return value;
};

export default useGetPositionHF;
