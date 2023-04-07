import {BigNumber} from 'ethers';
import {
  ApplicationState,
  BasicBooleanState, BasicNumberState,
  BasicState,
  BasicStateString, EthereumConfig,
} from './interface';

export const DEFAULT_ETHEREUM_CONFIG: EthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000,
};

export const INITIAL_APP_STATE: ApplicationState = {
  blockNumber: {},
  popupList: [],
  walletModalOpen: false,
  settingsMenuOpen: false,
};

export const LOADING_DEFAULT_BASIC_STATE: BasicState = {
  isLoading: true,
  value: BigNumber.from(0)
};

export const LOADING_DEFAULT_BOOLEAN_STATE: BasicBooleanState = {
  isLoading: true,
  value: true
};

export const NON_LOADING_DEFAULT_BOOLEAN_STATE: BasicBooleanState = {
  isLoading: false,
  value: false
};

export const NON_LOADING_DEFAULT_BASIC_STATE: BasicState = {
  isLoading: false,
  value: BigNumber.from(0)
};

export const LOADING_DEFAULT_NUMBER_BASIC_STATE: BasicNumberState = {
  isLoading: true,
  value: 0
};

export const NON_LOADING_DEFAULT_NUMBER_BASIC_STATE: BasicNumberState = {
  isLoading: false,
  value: 0
};

export const LOADING_DEFAULT_BASIC_STATE_STRING: BasicStateString = {
  isLoading: true,
  value: "",
};

export const NON_LOADING_DEFAULT_BASIC_STATE_STRING: BasicStateString = {
  isLoading: false,
  value: "0",
};
