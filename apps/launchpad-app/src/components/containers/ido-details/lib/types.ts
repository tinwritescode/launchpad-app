type PoolInfo = {
  distributionPercentage: number;
  minAllocation: number;
  maxAllocation: number;
  tokenPrice: number;
  accessType: string;
};

type TokenInfo = {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  totalSupply: number;
};

type ProjectOverview = {
  name: string;
  tokenSymbol: string;
  pricePerToken: number;
  currency: string;
  totalRaise: number;
  targetRaise: number;
  allocation: number;
  startTime: Date;
  endTime: Date;
  participants: number;
  targetParticipants: number;
};

type TokennomicsData = {};

export type { PoolInfo, TokenInfo, ProjectOverview };
