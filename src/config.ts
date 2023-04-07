import ethereum from "./configs/ethereum";
import { Configuration } from "./utils/interface";
import { isProduction } from "./analytics/Mixpanel";
import { chain } from "wagmi";

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

export const getChainsRpc = (): object => {
  var returnObj = {};
  Object.entries(configurations).map(
    // @ts-ignore
    ([k, d]) => (returnObj[k] = d.defaultProvider)
  );
  return returnObj;
};
