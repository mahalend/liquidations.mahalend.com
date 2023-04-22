import { Configuration } from "../utils/interface";

const configurations: { [env: string]: Configuration } = {
  42161: {
    networkName: "Arbitrum One",
    networkDisplayName: "Arbitrum One",
    networkIconName: "Arb",
    chainId: 42161,
    etherscanUrl: "https://arbiscan.io/",
    defaultProvider:
      "https://restless-compatible-field.arbitrum-mainnet.discover.quiknode.pro/3915584d29576b2a6277f7b30972c5b3673149c4/",
    deployments: require("../protocol/deployments/arbitrum.json"),
    gasLimitMultiplier: 1.1,
    blockchainToken: "ARB",
    blockchainTokenName: "ARB",
    blockchainTokenDecimals: 18,
    supportedTokens: [],
    decimalOverrides: {},
    graphqlUrl:
      "https://api.thegraph.com/subgraphs/name/mahalend/protocol-v3-arbitrum",
  },
};

export default configurations;
