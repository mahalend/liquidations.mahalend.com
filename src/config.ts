import { chain } from "wagmi";
import { isProduction } from "./analytics/Mixpanel";
import arbitrum from "./configs/arbitrum";
import ethereum from "./configs/ethereum";
import { Configuration } from "./utils/interface";

const configurations: { [env: string]: Configuration } = {
  ...ethereum,
  ...arbitrum,
};

export let ConfigChains = [chain.mainnet, chain.arbitrum];

if (isProduction) {
  ConfigChains = [chain.mainnet, chain.arbitrum];
}

export default configurations;

export const getSupportedChains = (): number[] =>
  Object.keys(configurations).map((i) => Number(i));
