import { useCallback, useEffect, useState } from "react";
import config from "../../config";
import { IReserveData } from "../../utils/interface";
import { useGetChainId } from "../../utils/NetworksCustomHooks";

interface IReserve {
  isLoading: boolean;
  data: IReserveData[];
}

const useGetReservesData = (symbol: string | null) => {
  const [data, setData] = useState<IReserve>({ isLoading: true, data: [] });
  const chainId = useGetChainId();

  const fetchData = useCallback(async () => {
    // Todo: Get reserveLiquidationThreshold, reserveLiquidationBonus
    fetch(config[chainId].graphqlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
      query GET_DATA {
        reserves(first: 1000, where:{ symbol: "${symbol}" }){
          symbol
          isFrozen
          configurationHistory(orderBy: "timestamp", first: 1, orderDirection:"desc") {
            timestamp
            reserveLiquidationBonus
            reserveLiquidationThreshold
          }
        }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res: { data: { reserves: IReserveData[] } }) => {
        if (res?.data?.reserves) {
          setData({
            isLoading: false,
            data: res.data.reserves,
          });
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, [symbol]);

  useEffect(() => {
    if (symbol) {
      setData({ isLoading: true, data: [] });
      fetchData().catch((err) => {
        setData({ isLoading: false, data: [] });
        console.error(`Failed to fetch Reserves Data: ${err.stack}`);
      });
    }
  }, [symbol]);

  return data;
};

export default useGetReservesData;
