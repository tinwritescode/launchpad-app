import { Stack } from '@mui/material';
import { ethers } from 'ethers';
import Link from 'next/link';
import { TbCoin } from 'react-icons/tb';
import { useAccount } from 'wagmi';
import { useStakingHook } from '../../containers/staking/useStaking';
import { Button } from '../AppButton';
import { LoginModal } from '../LoginModal/LoginModal';
import { ChangeNetwork } from './ChangeNetwork';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { unclaimedRewards } = useStakingHook();
  const links = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'IDOs',
      url: '/ido-list',
    },
    {
      name: 'Staking',
      url: '/staking',
    },
  ];

  const formattedUnclaimRewards = Number(
    ethers.utils.formatEther(unclaimedRewards || '0')
  ).toFixed(2);

  return (
    <>
      <nav className="flex justify-evenly gap-3 p-4 py-3 border-b text-gray-600 items-center sticky top-0 bg-white">
        <div className="flex gap-8 items-center">
          <Link href="/">
            <h1 className="font-bold font-mono text-3xl text-gray-800">
              StrawBerry
            </h1>
          </Link>
          <div className="flex gap-8">
            {links.map((link) => (
              <Link className="font-semibold" href={link.url} key={link.name}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {isConnected && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    className="font-bold gap-0.5"
                    onClick={() => {
                      router.push('/staking');
                    }}
                  >
                    <TbCoin />
                    {formattedUnclaimRewards || '0'} STRAW
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p>
                    Unclaimed Rewards: {formattedUnclaimRewards || '0'}
                    STRAW
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <LoginModal />
        </div>
      </nav>
      <Stack spacing={2}>
        <ChangeNetwork />
      </Stack>
    </>
  );
}

export default Header;
