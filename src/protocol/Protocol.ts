import { Contract, ethers } from "ethers";
import Web3 from "web3";
import { configKeys, Configuration } from "../utils/interface";
import { getDefaultProvider } from "../utils/provider";
import ABIS from "./deployments/abi";

import ERC20 from "./ERC20";

/**
 * An API module of ARTH contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class Protocol {
  myAccount: string | undefined;

  web3: Web3 | undefined;

  _signer?: ethers.Signer;

  _config: {
    [chainId: number]: Configuration;
  };

  _contracts: {
    [chainId: number]: { [name: string]: Contract };
  };

  provider: ethers.providers.BaseProvider | undefined;

  _tokens: {
    [chainId: number]: { [name: string]: ERC20 };
  };

  _activeNetwork: number;

  constructor(cfg: { [chainId: number]: Configuration }, chainId: number) {
    this._activeNetwork = chainId;
    this._contracts = {};
    this._tokens = {};
    this._tokens = {};

    try {
      for (const [chainIdString, config] of Object.entries(cfg)) {
        const chainId = Number(chainIdString);
        const { deployments } = config;
        this.provider = getDefaultProvider(config);
        const networkConfig: { [name: string]: Contract } = {};
        const tokens: { [name: string]: ERC20 } = {};

        for (const [name, deployment] of Object.entries(deployments)) {
          if (!deployment.abi) continue;
          //to push all erc20 tokens in tokens array
          if (cfg[chainId].supportedTokens.includes(name)) {
            tokens[name] = new ERC20(
              deployments[name].address,
              this.provider,
              name,
              cfg[chainId].decimalOverrides[name] || 18
            );
          }

          // to push all others as contracts
          networkConfig[name] = new Contract(
            deployment.address,
            ABIS[deployment.abi],
            this.provider
          );
        }

        this._contracts[chainId] = networkConfig;
        this._tokens[chainId] = tokens;
      }
    } catch (e) {
      console.log("Error in contracts mapping", e);
    }

    this._config = cfg;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider);
    this.web3 = new Web3(provider);
    this.provider = newProvider;
    this._signer = newProvider.getSigner(0);
    this.myAccount = account;

    for (const [chainId, contracts] of Object.entries(this._contracts)) {
      for (const [name, contract] of Object.entries(contracts)) {
        this._contracts[Number(chainId)][name] = contract.connect(this._signer);
      }
    }

    for (const tokens of Object.values(this._tokens)) {
      for (const token of Object.values(tokens)) {
        if (token && token.address) token.connect(this._signer);
      }
    }
  }

  config(id: configKeys, chainId: number) {
    return this._config[chainId][id];
  }

  getPoolContract(chainId: number): Contract {
    return this._contracts[chainId]["Pool"];
  }
}
