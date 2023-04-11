import { chain } from "wagmi";
import { isProduction } from "./analytics/Mixpanel";
import ethereum from "./configs/ethereum";
import { Configuration } from "./utils/interface";

const configurations: { [env: string]: Configuration } = {
  ...ethereum,
};

export let ConfigChains = [chain.mainnet];

if (isProduction) {
  ConfigChains = [chain.mainnet];
}

export default configurations;

export const getSupportedChains = (): number[] =>
  Object.keys(configurations).map((i) => Number(i));
