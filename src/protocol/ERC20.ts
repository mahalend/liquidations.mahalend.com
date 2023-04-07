import {BigNumber, Contract} from 'ethers';
import {formatUnits} from 'ethers/lib/utils';
import {Signer} from '@ethersproject/abstract-signer';
import {Provider} from '@ethersproject/abstract-provider';
import {TransactionResponse} from '@ethersproject/providers';

import ABIS from './deployments/abi';

class ERC20 {
  symbol: string;
  address: string;
  decimal: number;
  protected contract: Contract;

  constructor(address: string, provider: Signer | Provider, symbol: string, decimal = 18) {
    this.contract = new Contract(address, ABIS.IERC20, provider);
    this.address = address;
    this.symbol = symbol;
    this.decimal = decimal;
  }

  get estimateGas() {
    return this.contract.estimateGas;
  }

  connect(signerOrProvider: Signer | Provider) {
    this.contract = new Contract(this.address, ABIS.IERC20, signerOrProvider);
  }

  totalSupply(): Promise<BigNumber> {
    return this.contract.totalSupply();
  }

  balanceOf(account: string): Promise<BigNumber> {
    return this.contract.balanceOf(account);
  }

  transfer(recipient: string, amount: BigNumber): Promise<TransactionResponse> {
    return this.contract.transfer(recipient, amount);
  }

  allowance(owner: string, spender: string): Promise<BigNumber> {
    return this.contract.allowance(owner, spender);
  }

  approve(spender: string, amount: BigNumber): Promise<TransactionResponse> {
    return this.contract.approve(spender, amount);
  }

  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumber,
  ): Promise<TransactionResponse> {
    return this.contract.transferFro(sender, recipient, amount);
  }

  async displayedBalanceOf(account: string): Promise<string> {
    const balance = await this.balanceOf(account);
    return formatUnits(balance, this.decimal);
  }

  async displayedTotalSupply(): Promise<string> {
    const supply = await this.totalSupply();
    return Number(formatUnits(supply, this.decimal)).toFixed(0);
  }
}

export default ERC20;
