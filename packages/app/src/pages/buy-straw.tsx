import React from 'react';
import PageLayout from '../components/templates/PageLayout';
import { Label } from '../components/common/ui/label';
import { Input } from '../components/common/ui/input';
import { Button } from '../components/common';
import { useAccount, useMutation } from 'wagmi';
import { getErc20Contract } from '../libs/blockchain';
import { env } from '../env.mjs';
import { getSigner } from '../utils/ethereum';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/common/ui/card';

function BuyStraw() {
  const { address } = useAccount();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { mutate: buyStraw } = useMutation({
    mutationFn: async (amount: number) => {
      if (!address) throw new Error('No address');
      // 0x5163128950FE980aA7C0E3A6A8517d9EA76D38DF
      const strawberry = getErc20Contract(
        env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS
      );
      const amountInWei = ethers.utils.parseEther(amount.toString());
      const tx = await strawberry
        .connect(getSigner())
        .mint(address as string, amountInWei);
      await tx.wait();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Something went wrong');
    },
    onSuccess: () => {
      toast.success('Success');
    },
  });

  return (
    <PageLayout>
      <Card className="my-3">
        <CardHeader>
          <CardTitle>Buy Strawberry</CardTitle>
          <CardDescription>
            This is the page for you to buy Strawberry (for free, testnet only
            :D)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Amount</Label>
            <Input type="number" placeholder="0.0" ref={inputRef} />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center">
            <Button
              onClick={() => {
                const amount = inputRef.current?.value;

                buyStraw(Number(amount));
              }}
              className="px-10"
              size="lg"
            >
              Buy
            </Button>
          </div>
        </CardFooter>
      </Card>
    </PageLayout>
  );
}

export default BuyStraw;
