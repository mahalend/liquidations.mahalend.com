import { useCallback, useEffect, useState } from "react";

interface IV3Positions {
  isLoading: boolean;
  data: IUserData[];
}

export interface IUserCollateralReserve {
  currentATokenBalance: string;
  reserve: {
    usageAsCollateralEnabled: boolean;
    reserveLiquidationThreshold: string;
    reserveLiquidationBonus: string;
    borrowingEnabled: boolean;
    utilizationRate: string;
    symbol: string;
    underlyingAsset: string;
    isPaused: boolean;
    price: {
      priceInEth: string;
    };
    decimals: number;
  };
}

export interface IUserBorrowReserve {
  currentTotalDebt: string;
  reserve: {
    usageAsCollateralEnabled: boolean;
    reserveLiquidationThreshold: string;
    borrowingEnabled: boolean;
    utilizationRate: string;
    symbol: string;
    underlyingAsset: string;
    price: {
      priceInEth: string;
    };
    decimals: number;
  };
}

export interface IUserData {
  id: string;
  borrowedReservesCount: number;
  collateralReserve: IUserCollateralReserve[];
  borrowReserve: IUserBorrowReserve[];
}

const useGetV3UnhealthyPosition = (user_id: string) => {
  const [data, setData] = useState<IV3Positions>({ isLoading: true, data: [] });

  const count = 0;
  // let maxCount = 6;
  let user_id_query = "";

  if (user_id) {
    user_id_query = `id: "${user_id}",`;
    // maxCount = 1;
  }

  const url =
    "https://gateway.thegraph.com/api/2e2459d46adbe9edc64838d10f1dde6e/subgraphs/id/5YfboeM5FQD4rjmJV2YTCAkQHZr8BqgTe2VfLL245p2h";
  // const url = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2';

  const fetchV3Apr = useCallback(async () => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
      query GET_LOANS {
        users(first:10, skip:${
          1000 * count
        }, orderBy: id, orderDirection: desc, where: {${user_id_query}borrowedReservesCount_gt: 0}) {
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
        setData({
          isLoading: false,
          data: res.data.users,
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, [count, user_id_query]);

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
