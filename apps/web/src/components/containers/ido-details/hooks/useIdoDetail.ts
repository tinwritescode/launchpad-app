import { useEffect, useState } from "react";
import { getErc20Contract, getIdoContract } from "../../../../libs/blockchain";
import moment from "moment";
import { BigNumber } from "ethers";

export enum SaleStatus {
  NOT_STARTED,
  STARTED,
  ENDED,
}

export type IdoInfo = {
  address: string;
  minStaking: BigNumber;
  maxStaking: BigNumber;
  idoPrice: BigNumber;
  purchaseCap: BigNumber;
  startTime: BigNumber;
  endTime: BigNumber;
};

export type TokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: BigNumber;
  address: string;
};

export type SaleTotal = {
  idoAddress: string;
  totalAmount: BigNumber;
  participants: number;
};

export const useIdoDetail = ({
  erc20ContractAddress,
  idoContractAddresses,
}: {
  erc20ContractAddress?: string;
  idoContractAddresses?: string[];
  userAddress?: string;
}) => {
  const erc20Contract = erc20ContractAddress
    ? getErc20Contract(erc20ContractAddress)
    : null;
  const idoContracts = idoContractAddresses?.map((address) =>
    address ? getIdoContract(address) : null
  );

  const idoContract = idoContracts?.find((contract) => contract !== null);

  /*
   * Sale info includes sale status, sale start time, sale end time
   */
  // const [isSaleFetched, setIsSaleFetched] = useState<boolean>(false);
  // const [saleStatus, setSaleStatus] = useState<SaleStatus>(
  //   SaleStatus.NOT_STARTED
  // );
  // const [saleStartTime, setSaleStartTime] = useState<number>();
  // const [saleStartIn, setSaleStartIn] = useState<string>();
  // const [saleEndTime, setSaleEndTime] = useState<number>();
  // const [saleEndIn, setSaleEndIn] = useState<string>();

  // const formatAsCountdown = (now: number, future: number) => {
  //   const duration = moment.duration(future - now);
  //   let padded = [
  //     duration.days(),
  //     duration.hours(),
  //     duration.minutes(),
  //     duration.seconds(),
  //   ].map((item) => item.toString().padStart(2, "0"));
  //   return `${padded[0]} d, ${padded[1]} h, ${padded[2]} m, ${padded[3]} s`;
  // };
  // const fetchSaleInfo = async () => {
  //   const [startTime, endTime] = await Promise.all([
  //     idoContract!.startTime(),
  //     idoContract!.endTime(),
  //   ]);
  //   setSaleStartTime(startTime.toNumber());
  //   setSaleEndTime(endTime.toNumber());
  //   setIsSaleFetched(true);
  // };
  // const handleSaleInfo = async () => {
  //   if (saleStatus === SaleStatus.ENDED) {
  //     return;
  //   }

  //   const currentTime = new Date().getTime();
  //   if (saleEndTime! < currentTime) {
  //     setSaleStatus(SaleStatus.ENDED);
  //     setSaleEndIn("Sale ended");
  //     return;
  //   }
  //   if (saleStatus === SaleStatus.STARTED) {
  //     setSaleEndIn(formatAsCountdown(currentTime, saleEndTime!));
  //     return;
  //   }

  //   if (saleStartTime! < currentTime) {
  //     setSaleStatus(SaleStatus.STARTED);
  //     setSaleStartIn("Sale started");
  //     return;
  //   }
  //   setSaleStartIn(formatAsCountdown(currentTime, saleStartTime!));
  // };

  // useEffect(() => {
  //   if (isSaleFetched || !idoContract) return;
  //   fetchSaleInfo();
  // }, [idoContract?.address]);
  // useEffect(() => {
  //   if (!isSaleFetched || !saleStartTime || !saleEndTime) return;
  //   handleSaleInfo();

  //   const interval = setInterval(() => {
  //     if (saleStatus === SaleStatus.ENDED) {
  //       clearInterval(interval);
  //       return;
  //     }

  //     handleSaleInfo();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [isSaleFetched, saleStartTime, saleEndTime, saleStatus]);

  /*
   * Total sale of each IDO
   */
  const [isSaleHistoryFetched, setisSaleHistoryFetched] =
    useState<boolean>(false);
  const [salesTotal, setSalesTotal] = useState<SaleTotal[]>();

  const fetchSaleTotal = async () => {
    const totals = await Promise.all(
      idoContracts!.map(async (contract) => {
        const purchases = await contract!.purchaseHistory();
        const totalAmount = purchases.reduce(
          (acc, purchase) => acc.add(purchase.amount),
          BigNumber.from(0)
        );
        const uniqueParticipants = new Set(
          purchases.map((purchase) => purchase.account)
        );
        return {
          idoAddress: contract!.address,
          totalAmount: totalAmount,
          participants: uniqueParticipants.size,
        };
      })
    );
    setSalesTotal(totals);
    setisSaleHistoryFetched(true);
  };

  // useEffect(() => {
  //   if (
  //     saleStatus === SaleStatus.NOT_STARTED ||
  //     isSaleHistoryFetched ||
  //     !idoContracts
  //   )
  //     return;
  //   fetchSaleTotal();
  // }, [idoContracts?.map((contract) => contract?.address)]);

  /*
   * Token info
   */
  const [isTokenInfoFetched, setIsTokenInfoFetched] = useState<boolean>(false);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();

  const fetchTokenInfo = async () => {
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      erc20Contract!.name(),
      erc20Contract!.symbol(),
      erc20Contract!.decimals(),
      erc20Contract!.totalSupply(),
    ]);
    setTokenInfo({
      name,
      symbol,
      decimals,
      totalSupply,
      address: erc20Contract!.address,
    });
    setIsTokenInfoFetched(true);
  };

  useEffect(() => {
    if (isTokenInfoFetched || !erc20Contract) return;
    fetchTokenInfo();
    setIsLoading(true);
  }, [erc20Contract?.address]);

  /*
   * IDOs info
   */
  const [isIDOsInfoFetched, setIsIDOsInfoFetched] = useState<boolean>(false);
  const [idosInfo, setIDOsInfo] = useState<IdoInfo[]>([]);

  const fetchIDOsInfo = async () => {
    const idos = await Promise.all(
      idoContracts!.map(async (contract) => {
        const [
          address,
          minStaking,
          maxStaking,
          idoPrice,
          purchaseCap,
          startTime,
          endTime,
        ] = await Promise.all([
          contract!.address,
          contract!.minStakingRequired(),
          contract!.maxStakingRequired(),
          contract!.idoPrice(),
          contract!.purchaseCap(),
          contract!.startTime(),
          contract!.endTime(),
        ]);
        return [
          {
            address,
            minStaking,
            maxStaking,
            idoPrice,
            purchaseCap,
            startTime,
            endTime,
          },
        ];
      })
    );
    setIDOsInfo(idos.flat());
    setIsIDOsInfoFetched(true);
  };

  useEffect(() => {
    if (isIDOsInfoFetched || !idoContracts) return;
    fetchIDOsInfo();
    setIsLoading(true);
  }, [idoContracts?.map((contract) => contract?.address)]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isTokenInfoFetched || !isIDOsInfoFetched) return;
    setIsLoading(false);
  }, [isTokenInfoFetched, isIDOsInfoFetched]);

  return {
    // saleInfo: {
    //   saleStatus,
    //   saleStartIn,
    //   saleEndIn,
    // },
    // salesTotal,
    isLoading,
    tokenInfo,
    idosInfo,
  };
};
