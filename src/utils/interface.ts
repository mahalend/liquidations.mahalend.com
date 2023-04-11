import { BigNumber } from "ethers";
import Protocol from "../protocol";

export type BasicState = {
  isLoading: boolean;
  value: BigNumber;
};

export type BasicBooleanState = {
  isLoading: boolean;
  value: boolean;
};

export type BasicStateString = {
  isLoading: boolean;
  value: string;
};

export type BasicNumberState = {
  isLoading: boolean;
  value: number;
};

export type IModalProps = {
  openModal: boolean;
  onModalClose: () => void;
};

export type IABIS = {
  [key: string]: any[];
};

export type Deployments = {
  [contractName: string]: {
    address: string;
    abi: string;
  };
};

export type EthereumConfig = {
  testing: boolean;
  autoGasMultiplier: number;
  defaultConfirmations: number;
  defaultGas: string;
  defaultGasPrice: string;
  ethereumNodeTimeout: number;
};

export type Configuration = {
  chainId: number;
  networkName: string;
  networkIconName: string;
  networkDisplayName: string;
  etherscanUrl: string;
  defaultProvider: string;
  deployments: Deployments;
  blockchainToken: "MATIC" | "ETH" | "BNB";
  gasLimitMultiplier: number;
  blockchainTokenName: string;
  blockchainTokenDecimals: number;
  supportedTokens: string[];
  decimalOverrides: { [name: string]: number };
};

export type configKeys = keyof Configuration;

export type PopupContent = {
  txn?: {
    hash: string;
    success: boolean;
    loading?: boolean;
    summary?: string;
  };
  error?: {
    message: string;
    stack: string;
  };
};

export type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;

export interface ApplicationState {
  blockNumber: { [chainId: number]: number };
  popupList: PopupList;
  walletModalOpen: boolean;
  settingsMenuOpen: boolean;
}

export interface TransactionDetails {
  hash: string;
  approval?: { tokenAddress: string; spender: string };
  summary?: string;
  receipt?: SerializableTransactionReceipt;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  from: string;
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
}

export interface ProtocolContext {
  core: Protocol;
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

export interface IUserDataWithHF extends IUserData {
  hf: BigNumber;
}
