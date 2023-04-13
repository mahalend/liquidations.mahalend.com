import { useCallback, useEffect, useState } from "react";
import { IReserveData } from "../../utils/interface";

interface IReserve {
  isLoading: boolean;
  data: IReserveData[];
}

const useGetReservesData = (symbol: string | null) => {
  const [data, setData] = useState<IReserve>({ isLoading: true, data: [] });

  const url =
    "https://gateway.thegraph.com/api/4b90debd6507cf14fefec6b071de88dd/subgraphs/id/5YfboeM5FQD4rjmJV2YTCAkQHZr8BqgTe2VfLL245p2h";
  // const url = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2";

  const fetchData = useCallback(async () => {
    // Todo: Get reserveLiquidationThreshold, reserveLiquidationBonus
    fetch(url, {
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
