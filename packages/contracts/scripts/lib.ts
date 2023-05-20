import { NonceManager } from '@ethersproject/experimental';
import { ethers, network } from 'hardhat';
import { Erc20 } from '../src/lib/typechain-types';
import { Staking } from '../src/lib/typechain-types/contracts/Staking';
import { deployContract } from '../src/lib/utils';
import { PLATFORM_TOKEN_INFO } from './deploy';

export async function deployStakingContract(
  signer: NonceManager,
  platformTokenInfo: typeof PLATFORM_TOKEN_INFO
) {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

  const timeUnitInSecs = 60;
  const rewardRatio = {
    numerator: 1,
    denominator: 10000,
  };
  const totalSupply = platformTokenInfo.totalSupply;
  const lockTime = ONE_YEAR_IN_SECS;

  const address: Record<string, string> = {};
  address['stakingToken'] = await deployContract(
    'Erc20',
    totalSupply,
    platformTokenInfo.name,
    platformTokenInfo.symbol
  );
  address['rewardToken'] = address['stakingToken'];

  switch (network.name) {
    case 'polygonMumbai': {
      address['WETH'] = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; // WMATIC
      break;
    }
    default: {
      address['WETH'] = await deployContract(
        'Erc20',
        totalSupply,
        'Wrapped Ether',
        'WETH'
      );
      break;
    }
  }

  const Staking = await ethers.getContractFactory('Staking');
  const stakingContract = await Staking.connect(signer).deploy(
    timeUnitInSecs,
    rewardRatio.numerator,
    rewardRatio.denominator,
    address['stakingToken'],
    address['rewardToken'],
    address['WETH'],
    lockTime
  );

  console.log('Staking deployed to:', stakingContract.address);

  return {
    stakingContract: stakingContract as Staking,
    stakingTokenAddress: address['stakingToken'],
    rewardTokenAddress: address['rewardToken'],
    WETHAddress: address['WETH'],
  };
}

export async function deployIDOToken(signer: NonceManager) {
  return {
    idoToken: await (await ethers.getContractFactory('Erc20'))
      .connect(signer)
      .deploy(ethers.utils.parseEther('1000000000'), 'Dragon Ball Z', 'DBZ'),
  };
}

export async function deployUSDCToken(signer: NonceManager) {
  return {
    usdcToken: await (await ethers.getContractFactory('Erc20'))
      .connect(signer)
      .deploy(ethers.utils.parseEther('1000000000'), 'USD Coin', 'USDC'),
  };
}

export async function deployDividendContract(signer: NonceManager) {
  const Dividend = await ethers.getContractFactory('Dividend');
  const dividendContract = await Dividend.connect(signer).deploy();

  console.log('Dividend deployed to:', dividendContract.address);

  return {
    dividendContract,
  };
}

export async function deployIdoContract(
  idoToken: Erc20,
  stakingTokenAddress: string,
  stakingContract: Staking
) {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const idoPrice = ethers.utils.parseEther('1.5');
  const startTime = currentTimestampInSeconds + 60;
  const endTime = currentTimestampInSeconds + 60 * 60;
  const purchaseCap = ethers.utils.parseEther('1000');
  const minStakingRequired = ethers.utils.parseEther('100');
  const maxStakingRequired = ethers.utils.parseEther('1000');

  const IdoContract = await ethers.getContractFactory('IDOContract');
  const idoContract = await IdoContract.deploy(
    idoToken.address,
    stakingTokenAddress,
    idoPrice,
    purchaseCap,
    startTime,
    endTime,
    stakingContract.address,
    minStakingRequired,
    maxStakingRequired
  );

  await idoContract.deployed();

  console.log('IDO Contract address:', idoContract.address);

  return {
    idoContract,
  };
}
