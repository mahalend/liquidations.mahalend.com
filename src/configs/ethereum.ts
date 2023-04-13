import { Configuration } from "../utils/interface";

const configurations: { [env: string]: Configuration } = {
  1: {
    networkName: "Ethereum",
    networkDisplayName: "Ethereum",
    networkIconName: "Ethereum",
    chainId: 1,
    etherscanUrl: "https://etherscan.io",
    defaultProvider:
      "https://eth-mainnet.g.alchemy.com/v2/HY3urTDGBnhgqGXmCsjPEzyiVSY3NLh8",
    deployments: require("../protocol/deployments/ethereum.json"),
    gasLimitMultiplier: 1.1,
    blockchainToken: "ETH",
    blockchainTokenName: "ETH",
    blockchainTokenDecimals: 18,
    supportedTokens: ["MAHA", "ARTH"],
    decimalOverrides: {
      USDC: 6,
    },
    graphqlUrl:
      "https://gateway.thegraph.com/api/4b90debd6507cf14fefec6b071de88dd/subgraphs/id/5YfboeM5FQD4rjmJV2YTCAkQHZr8BqgTe2VfLL245p2h",
  },
};

export default configurations;
