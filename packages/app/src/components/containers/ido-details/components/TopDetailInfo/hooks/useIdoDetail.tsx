import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  getErc20Contract,
  getIdoContract,
} from '../../../../../../libs/blockchain';

export const useIdoDetail = ({
  erc20ContractAddress,
  idoContractAddress,
}: {
  erc20ContractAddress?: string;
  idoContractAddress?: string;
}) => {
  const erc20Contract = erc20ContractAddress
    ? getErc20Contract(erc20ContractAddress)
    : null;
  const idoContract = idoContractAddress
    ? getIdoContract(idoContractAddress)
    : null;
  const [saleEndIn, setSaleEndIn] = useState<string>();

  useEffect(() => {
    if (!idoContract || !erc20Contract) return;

    (async () => {
      const timeInSeconds = (await idoContract.endTime())
        .toString()
        .slice(0, 10);

      // Fix here
      const saleEndIn = moment
        .unix(Number(timeInSeconds))
        .format('DD [D], HH [H], mm [M], ss [S]');

      setSaleEndIn(() => saleEndIn);
    })();
  }, [
    idoContract?.address,
    erc20Contract?.address,
    idoContract,
    erc20Contract,
  ]);

  return {
    erc20Contract,
    idoContract,
    saleEndIn,
  };
};
