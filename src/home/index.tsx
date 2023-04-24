import React, { useState } from "react";
import TextWrapper from "../components/TextWrapper";
import useGetPositionHF from "../hooks/state/useGetPositionsHF";
import LiquidationModal from "../modals/LiquidationModal";
import theme from "../theme";
import { IUserDataWithHF } from "../utils/interface";
import "./index.css";
import PositionsData from "./PositionsData";

/*const positionData: IUserDataWithHF[] = [
  {
    id: "0x77cd66d59ac48a0e7ce54ff16d9235a5ffff335e",
    borrowedReservesCount: 1,
    collateralReserve: [
      {
        currentATokenBalance: "2500000000000000000000",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8500",
          reserveLiquidationBonus: "11000",
          borrowingEnabled: false,
          utilizationRate: "0",
          symbol: "DAI",
          underlyingAsset: "0x6b175474e89094c44da98b954eedeac495271d0f",
          isPaused: false,
          price: { priceInEth: "100048793" },
          decimals: 18,
        },
      },
    ],
    borrowReserve: [
      {
        currentTotalDebt: "1000000000000000000000",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8000",
          borrowingEnabled: true,
          utilizationRate: "0.79257032",
          symbol: "ARTH",
          underlyingAsset: "0x8cc0f052fff7ead7f2edcccac895502e884a8a71",
          price: { priceInEth: "0" },
          decimals: 18,
        },
      },
    ],
    hf: BigNumber.from("0x0fa8f4dda0eafed0"),
  },
  {
    id: "0x7ec1d8ce05c1db1131c4e1a54dc9b0186c939fb9",
    borrowedReservesCount: 1,
    collateralReserve: [
      {
        currentATokenBalance: "20000000000",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8500",
          reserveLiquidationBonus: "11000",
          borrowingEnabled: false,
          utilizationRate: "0",
          symbol: "USDC",
          underlyingAsset: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          isPaused: false,
          price: { priceInEth: "100000000" },
          decimals: 6,
        },
      },
    ],
    borrowReserve: [
      {
        currentTotalDebt: "8128199557055450536813",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8000",
          borrowingEnabled: true,
          utilizationRate: "0.79257032",
          symbol: "ARTH",
          underlyingAsset: "0x8cc0f052fff7ead7f2edcccac895502e884a8a71",
          price: { priceInEth: "0" },
          decimals: 18,
        },
      },
    ],
    hf: BigNumber.from("0x0ff20ece411d8dff"),
  },
  {
    id: "0x67c569f960c1cc0b9a7979a851f5a67018c5a3b0",
    borrowedReservesCount: 1,
    collateralReserve: [
      {
        currentATokenBalance: "255000015761926731724",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8000",
          reserveLiquidationBonus: "11000",
          borrowingEnabled: true,
          utilizationRate: "0.79257032",
          symbol: "ARTH",
          underlyingAsset: "0x8cc0f052fff7ead7f2edcccac895502e884a8a71",
          isPaused: false,
          price: { priceInEth: "0" },
          decimals: 18,
        },
      },
      {
        currentATokenBalance: "10000000000000000",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "9000",
          reserveLiquidationBonus: "11000",
          borrowingEnabled: false,
          utilizationRate: "0",
          symbol: "WETH",
          underlyingAsset: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          isPaused: false,
          price: { priceInEth: "161560226000" },
          decimals: 18,
        },
      },
    ],
    borrowReserve: [
      {
        currentTotalDebt: "1000000002256991082",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8000",
          borrowingEnabled: true,
          utilizationRate: "0.79257032",
          symbol: "ARTH",
          underlyingAsset: "0x8cc0f052fff7ead7f2edcccac895502e884a8a71",
          price: { priceInEth: "0" },
          decimals: 18,
        },
      },
    ],
    hf: BigNumber.from("0x723be1025726ab49"),
  },
  {
    id: "0xecce08c2636820a81fc0c805dbdc7d846636bbc4",
    borrowedReservesCount: 1,
    collateralReserve: [
      {
        currentATokenBalance: "10000000000000000000",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8500",
          reserveLiquidationBonus: "11000",
          borrowingEnabled: false,
          utilizationRate: "0",
          symbol: "DAI",
          underlyingAsset: "0x6b175474e89094c44da98b954eedeac495271d0f",
          isPaused: false,
          price: { priceInEth: "100048793" },
          decimals: 18,
        },
      },
      {
        currentATokenBalance: "100000000000000000000",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8000",
          reserveLiquidationBonus: "11000",
          borrowingEnabled: true,
          utilizationRate: "0.79257032",
          symbol: "ARTH",
          underlyingAsset: "0x8cc0f052fff7ead7f2edcccac895502e884a8a71",
          isPaused: false,
          price: { priceInEth: "0" },
          decimals: 18,
        },
      },
    ],
    borrowReserve: [
      {
        currentTotalDebt: "100000000000000000",
        reserve: {
          usageAsCollateralEnabled: true,
          reserveLiquidationThreshold: "8000",
          borrowingEnabled: true,
          utilizationRate: "0.79257032",
          symbol: "ARTH",
          underlyingAsset: "0x8cc0f052fff7ead7f2edcccac895502e884a8a71",
          price: { priceInEth: "0" },
          decimals: 18,
        },
      },
    ],
    hf: BigNumber.from("0x02219b5142e25e6c59"),
  },
];*/

const Home = () => {
  /*const position = {
    isLoading: false,
    data: positionData,
  };*/
  const position = useGetPositionHF();
  const [selectedUser, setSelectedUser] = useState<IUserDataWithHF | null>(
    null
  );

  return (
    <div id={"app"}>
      {selectedUser && (
        <LiquidationModal
          openModal={true}
          onModalClose={() => setSelectedUser(null)}
          selectedUserData={selectedUser}
        />
      )}
      <div className={"p-l-24 p-r-24"}>
        <TextWrapper
          text={"Liquidation"}
          fontSize={24}
          className={"m-b-8"}
          fontWeight={"bold"}
        />
        <TextWrapper
          text={
            <div>
              A liquidation is a process that occurs when a borrower's health
              factor goes below 1 due to their collateral value not properly
              covering their loan/debt value.
              <br />
              From this ui you would be able to see all the position and can
              liquidate the position if it's HF goes below 1
            </div>
          }
          fontSize={16}
          className={"m-b-32"}
          color={theme.color.transparent[100]}
        />
        {position.isLoading ? (
          <p>Fetching position this might take several minutes</p>
        ) : position.data.length === 0 && !position.isLoading ? (
          <p>No position found</p>
        ) : (
          <PositionsData
            value={position.data}
            setSelectedUser={(data: IUserDataWithHF) => setSelectedUser(data)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
