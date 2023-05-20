import { BigNumber } from "ethers";
import { BigNumber as BNjs } from "bignumber.js";

export const calculateDividendPercent = (
  dividend: BigNumber,
  dividendPercent: number
) => {
  const dividendAmount = BNjs(dividend.toString())
    .multipliedBy(BNjs(dividendPercent.toString()))
    .dividedBy(100)
    .toFixed(0);

  return dividendAmount;
};
