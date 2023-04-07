import {Chain, useNetwork, useAccount} from "wagmi";
import {getSupportedChains} from "../config";

export function useGetChainId(): number {
  const {chain} = useNetwork();
  return chain ? !chain.unsupported ? chain.id : getSupportedChains()[0] : getSupportedChains()[0];
}

export function useGetChains(): number[] {
  const {chains} = useNetwork();
  return chains.map(data => data.id);
}

export function useGetChainDetails(chainId: number): Chain | undefined {
  const {chains} = useNetwork();
  return chains.find(chains => chains.id === chainId);
}

export function useGetAccount(): string | undefined {
  const {address} = useAccount();
  return address;
}
