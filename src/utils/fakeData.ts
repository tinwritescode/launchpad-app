import { api } from "./api";

export const importData = async function () {
  // chains
  api.chain.createOne.useMutation().mutateAsync({
    name: "Binance Smart Chain",
    image: "https://bscscan.com/images/main/bsc-token-logo/BUSD.svg",
  });
  api.chain.createOne.useMutation().mutateAsync({
    name: "Ethereum",
    image: "https://bscscan.com/images/main/bsc-token-logo/ETH.svg",
  });
  api.chain.createOne.useMutation().mutateAsync({
    name: "Polygon",
    image: "https://bscscan.com/images/main/bsc-token-logo/Polygon.svg",
  });

  // tokens
  api.token.createOne.useMutation().mutateAsync({
    name: "Binance USD",
    symbol: "BUSD",
    decimals: 18,
  });
  api.token.createOne.useMutation().mutateAsync({
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  });
  api.token.createOne.useMutation().mutateAsync({
    name: "Polygon",
    symbol: "MATIC",
    decimals: 18,
  });

  const chainId = api.chain.getAll.useQuery().data[0].id;

  api.project.createOne.useMutation().mutateAsync({
    name: "Mi Fen",
    startTime: Date.now(),
    endTime: Date.now() + 10 * 24 * 60 * 60 * 1000,
    targetRaise: 1000000,
    allocation: 1000000,
    summaryContent: "Mi Fen",
    videoURL: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
    comparisonContent: "Mi Fen",
    roadmapContent: "Mi Fen",
    pricePerToken: 1,
    Chain: {
      chainId: chainId,
    },
    Token: {
      name: "Mi Fen",
      symbol: "MIFEN",
      address: "0x0000",
      decimals: 18,
      totalSupply: 1000000,
    },
  });
};
