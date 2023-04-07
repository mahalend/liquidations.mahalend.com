import Web3 from 'web3';
import {BigNumber} from 'ethers';
import {formatUnits, parseUnits} from 'ethers/lib/utils';

import {EthereumConfig} from './interface';
import {DEFAULT_ETHEREUM_CONFIG} from './constants';

export function web3ProviderFrom(endpoint: string, config?: EthereumConfig): any {
  const ethConfig: EthereumConfig = Object.assign(DEFAULT_ETHEREUM_CONFIG, config || {});

  const providerClass = endpoint.includes('wss')
    ? Web3.providers.WebsocketProvider
    : Web3.providers.HttpProvider;

  return new providerClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout,
  });
}

export function balanceToDecimal(s: string): string {
  return formatUnits(s);
}

export function decimalToBalance(d: string | number, decimals = 18): BigNumber {
  return parseUnits(String(d), decimals);
}
