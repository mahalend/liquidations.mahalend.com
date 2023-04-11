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
  const v3Position = useGetV3UnhealthyPosition('');

  const fetchData = useCallback(async () => {
    const contract = core?.getPoolContract(chainId);
    if (v3Position.isLoading || v3Position.data.length === 0 || contract === undefined) {
      setValue({isLoading: false, data: []});
      return;
    }


    const v3PositionsWithHf = await Promise.all(
      v3Position.data.map(async (data) => {
        const response = await contract.getUserAccountData(data.id);
        const factor: BigNumber = response.healthFactor;

        return {
          ...data,
          hf: factor
        }
      }))

    setValue({
      isLoading: false,
      data: v3PositionsWithHf,
    });
  }, [chainId, core, v3Position.data, v3Position.isLoading]);

  useEffect(() => {
    if (core) {
      fetchData().catch((err) => {
        setValue({isLoading: false, data: []});
        console.error(
          `Failed to fetch hf for position: ${err.stack}`
        );
      });
    }
  }, [core, fetchData]);

  return value;
};

export default useGetPositionHF;
