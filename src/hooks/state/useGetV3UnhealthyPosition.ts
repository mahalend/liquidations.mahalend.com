import { useCallback, useEffect, useState } from "react";
import { IUserData } from "../../utils/interface";

interface IV3Positions {
  isLoading: boolean;
  data: IUserData[];
}

const useGetV3UnhealthyPosition = () => {
  const [data, setData] = useState<IV3Positions>({ isLoading: true, data: [] });

  const count = 0;
  // let maxCount = 6;

  const url =
    "https://gateway.thegraph.com/api/4b90debd6507cf14fefec6b071de88dd/subgraphs/id/5YfboeM5FQD4rjmJV2YTCAkQHZr8BqgTe2VfLL245p2h";
  // const url = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2";

  const fetchV3Apr = useCallback(async () => {
    // Todo: Get reserveLiquidationThreshold, reserveLiquidationBonus
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
      query GET_LOANS {
        users(first:10, skip:${
          1000 * count
        }, orderBy: id, orderDirection: desc, where: {borrowedReservesCount_gt: 0}) {
          id
          borrowedReservesCount
          collateralReserve:reserves(where: {currentATokenBalance_gt: 0}) {
            currentATokenBalance
            reserve{
              usageAsCollateralEnabled
              reserveLiquidationThreshold
              reserveLiquidationBonus
              borrowingEnabled
              utilizationRate
              symbol
              underlyingAsset
              isPaused
              price {
                priceInEth
              }
              decimals
            }
          }
          borrowReserve: reserves(where: {currentTotalDebt_gt: 0}) {
            currentTotalDebt
            reserve{
              usageAsCollateralEnabled
              reserveLiquidationThreshold
              borrowingEnabled
              utilizationRate
              symbol
              underlyingAsset
              price {
                priceInEth
              }
              decimals
            }
          }
        }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res: { data: { users: IUserData[] } }) => {
        console.log("data", res);
        if (res.data?.users) {
          setData({
            isLoading: false,
            data: res.data.users,
          });
        } else {
          setData({
            isLoading: false,
            data: [],
          });
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, [count]);

  useEffect(() => {
    setData({ isLoading: true, data: [] });
    fetchV3Apr().catch((err) => {
      setData({ isLoading: false, data: [] });
      console.error(`Failed to fetch Positions: ${err.stack}`);
    });
  }, [fetchV3Apr]);

  return data;
};

export default useGetV3UnhealthyPosition;
