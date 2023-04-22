import { useCallback, useEffect, useState } from "react";
import config from "../../config";
import { IUserData } from "../../utils/interface";
import { useGetChainId } from "../../utils/NetworksCustomHooks";

interface IV3Positions {
  isLoading: boolean;
  data: IUserData[];
}

const useGetV3UnhealthyPosition = () => {
  const [data, setData] = useState<IV3Positions>({ isLoading: true, data: [] });
  const chainId = useGetChainId();
  console.log("chainId", chainId);

  const count = 0;
  // let maxCount = 6;

  const fetchV3Apr = useCallback(async () => {
    fetch(config[chainId].graphqlUrl, {
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
  }, [chainId]);

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
