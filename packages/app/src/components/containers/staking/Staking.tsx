import { ethers } from 'ethers';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { BarLoader } from 'react-spinners';
import { useAccount } from 'wagmi';
import { env } from '../../../env.mjs';
import PleaseConnectYourWallet from '../../common/PleaseConnectYourWallet';
import StakingTabs from './components/stakingtabs/StakingTabs';
import { useStakingHook } from './useStaking';
import dynamic from 'next/dynamic';
import { Button } from '../../common/index';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../common/ui/tooltip';

const Staking = () => {
  const { isConnected } = useAccount();
  const {
    withdraw,
    approve,
    approveAmount,
    stake,
    decimals,
    amountStaked,
    stakingTokenBalance,
    totalStaked,
    numberOfStakers,
    APY,
    unclaimedRewards,
    claimReward,
  } = useStakingHook();
  const stakeInputRef = useRef<HTMLInputElement>(null);
  const withdrawInputRef = useRef<HTMLInputElement>(null);

  const onWithdrawButtonClick = () => {
    toast.promise(
      withdraw({
        amount: ethers.utils.parseUnits(
          withdrawInputRef.current?.value || '0',
          decimals
        ),
      }).then((tx) => tx?.wait()),
      {
        loading: 'Withdrawing...',
        success: 'Withdrawn!',
        error: (err) => {
          console.error(err.message);

          return 'Failed to withdraw';
        },
      }
    );
  };

  const onStakingApprove = () => {
    toast.promise(
      approve({
        amount: ethers.constants.MaxUint256,
        stakingAddress: env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
      }).then((tx) => tx?.wait()),
      {
        loading: 'Approving...',
        success: 'Approved!',
        error: (err) => {
          return 'Failed to approve';
        },
      }
    );
  };

  const onStakeButtonClick = () => {
    toast.promise(
      stake({
        amount: ethers.utils.parseUnits(
          stakeInputRef.current?.value || '0',
          decimals
        ),
      }).then((tx) => tx?.wait()),
      {
        loading: 'Staking...',
        success: 'Staked!',
        error: (err) => {
          console.error(err.message);

          return 'Failed to stake';
        },
      }
    );
  };

  const onClaimButtonClick = () => {
    toast.promise(
      claimReward().then((tx) => tx?.wait()),
      {
        loading: 'Claiming...',
        success: 'Claimed!',
        error: (err) => {
          console.error(err.message);

          return 'Failed to claim';
        },
      }
    );
  };

  return isConnected ? (
    <div className="grid md:grid-cols-3 my-0 mx-auto gap-4 text-white ">
      <div className="col-span-2 flex flex-col h-fit w-full px-8 py-8 bg-slate-900 gap-3 min-w-max">
        <div className="text-2xl font-bold">Participate IDO Stake</div>
        <div className="text-lg font-bold">
          <span className="text-3xl font-bold">
            {ethers.utils.commify(
              ethers.utils.formatEther(amountStaked || '0')
            ) || <BarLoader />}
          </span>{' '}
          STRAW
        </div>
        <div className="text-xl font-bold text-gray-500">Total Stake</div>
        <hr className="border-gray-500" />
        <div className="h-1"></div>
        <StakingTabs />
        <div className="h-1"></div>
        {stakingTokenBalance ? (
          <div className="text-lg text-gray-500 font-semibold">
            Balance:{' '}
            {ethers.utils.commify(
              ethers.utils.formatEther(stakingTokenBalance)
            )}{' '}
            STRAW
          </div>
        ) : (
          <div className="text-lg text-gray-500 font-semibold">
            <BarLoader />
          </div>
        )}
        <div className="flex flex-row gap-4 h-16">
          <div className="flex flex-row w-3/5 border border-gray-500 p-2 focus-within:border-purple-500">
            <input
              type="text"
              className=" bg-slate-900 border-none focus:outline-none grow-[2]"
              ref={stakeInputRef}
            />
            <button
              className="px-4"
              onClick={() => {
                if (!stakeInputRef?.current || !stakingTokenBalance) return;

                stakeInputRef.current.value =
                  ethers.utils.formatEther(stakingTokenBalance);
              }}
            >
              MAX
            </button>
          </div>
          {approveAmount?.gt(0) ? (
            <button
              className="bg-gray-600 w-2/5 p-1"
              onClick={onStakeButtonClick}
            >
              STAKE
            </button>
          ) : (
            <button
              className="bg-purple-400 w-2/5 p-1"
              onClick={onStakingApprove}
            >
              APPROVE
            </button>
          )}
        </div>
        <div className="text-lg text-gray-500 font-semibold">
          {amountStaked ? (
            `Staked: ${ethers.utils.commify(
              ethers.utils.formatEther(amountStaked)
            )} STRAW`
          ) : (
            <BarLoader />
          )}
        </div>
        <div className="flex flex-row gap-4 h-16">
          <div className="flex flex-row w-3/5 border border-gray-500 p-2 focus-within:border-purple-500">
            <input
              type="text"
              className=" bg-slate-900 border-none focus:outline-none grow-[2]"
              ref={withdrawInputRef}
            />
            <button
              className="px-4"
              onClick={() => {
                if (!withdrawInputRef?.current || !amountStaked) return;

                withdrawInputRef.current.value =
                  ethers.utils.formatEther(amountStaked);
              }}
            >
              MAX
            </button>
          </div>
          <button
            className="bg-gray-600 w-2/5 p-1"
            onClick={onWithdrawButtonClick}
          >
            WITHDRAW
          </button>
        </div>
        <div className="text-lg text-gray-500 font-semibold">
          {unclaimedRewards ? (
            <div className="flex flex-row gap-4 justify-between items-center">
              <div className="flex flex-col">
                <div className="text-lg text-gray-500 font-semibold">
                  <span>Unclaimed Rewards</span>
                  <div className="text-3xl font-bold">
                    {ethers.utils.commify(
                      ethers.utils.formatEther(unclaimedRewards)
                    )}{' '}
                    STRAW
                  </div>
                </div>
              </div>
              <Button variant="subtle" onClick={onClaimButtonClick}>
                CLAIM
              </Button>
            </div>
          ) : (
            <BarLoader />
          )}
        </div>
      </div>

      <div className="flex flex-col h-fit w-full justify-start min-w-max gap-4">
        <div className="flex flex-col px-8 py-8 gap-4 bg-slate-900">
          <div className="text-3xl font-bold">
            {totalStaked ? (
              `$${ethers.utils.commify(
                ethers.utils.formatEther(totalStaked || '0')
              )}
              `
            ) : (
              <BarLoader />
            )}
          </div>
          <div className="text-xl font-bold text-gray-500">
            Total Value Locked
          </div>
        </div>
        <div className="flex flex-col px-8 py-8 gap-4 bg-slate-900">
          {APY && (
            <>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="text-3xl font-bold flex items-center gap-1 tracking-wider">
                      <span className="inline-block truncate md:max-w-[300px] max-w-xs">
                        {ethers.utils.commify(APY?.toString())}
                      </span>
                      %
                    </div>
                  </TooltipTrigger>

                  <TooltipContent>
                    <div className="text-lg font-semibold items-center gap-1">
                      <span className="inline-block">
                        {ethers.utils.commify(APY?.toString())}
                      </span>
                      %
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-xl font-bold text-gray-500">APY</div>
            </>
          )}
        </div>
        <div className="flex flex-col px-8 py-8 gap-4 bg-slate-900">
          <div className="text-3xl font-bold">
            {numberOfStakers ? (
              ethers.utils.commify(numberOfStakers.toString())
            ) : (
              <BarLoader />
            )}
          </div>
          <div className="text-xl font-bold text-gray-500">
            Number of Stakers
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PleaseConnectYourWallet />
  );
};

export default dynamic(() => Promise.resolve(Staking), {
  ssr: false,
});
