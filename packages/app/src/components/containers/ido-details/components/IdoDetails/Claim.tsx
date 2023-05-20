import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useAccount } from 'wagmi';
import { api } from '../../../../../utils/api';
import { Button } from '../../../../common';
import { Input } from '../../../../common/ui/input';
import { Label } from '../../../../common/ui/label';
import useIdoStart from './hooks/useIdoStart';
import Spinner from '../../../../common/ui/spinner';

function Claim() {
  const { query } = useRouter();
  const { address } = useAccount();
  const { data, isLoading } = api.project.getUserWhiteListInfo.useQuery({
    id: query?.id as string,
    walletAddress: address as string,
  });
  const { claim } = useIdoStart({
    idoContractAddress: data?.idoContractAddress,
    proof: data?.proof?.proof,
    stakedAmount: data?.proof?.stakedAmount,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const percentButtons = ['25', '50', '75', '100'];

  if (!isLoading && !data?.isWhiteListed) {
    <p>❌ You are not whitelisted</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label className="mb-2 font-semibold">Amount</Label>
        <Label className="flex items-center gap-1">
          Claim amount: {data?.claimedAmounts}
        </Label>
      </div>

      <Input ref={inputRef} disabled={!data?.isIdoStarted} />

      <div className="flex gap-1">
        {percentButtons.map((percent) => (
          <Button
            size="sm"
            variant="outline"
            key={percent}
            disabled={!data?.isIdoStarted}
            className="flex-1"
            onClick={() => {
              if (!data?.claimedAmounts) return;
              if (!inputRef.current) return;

              inputRef.current.value = BigNumber.from(data?.claimedAmounts)
                .mul(percent)
                .div(100)
                .toString();
            }}
          >
            {percent}%
          </Button>
        ))}
      </div>

      <div className="h-4"></div>

      {/* Is ido started? */}
      {!data?.isIdoEnded ? (
        <p>❌ IDO has not ended yet. You cannot claim.</p>
      ) : (
        <p>✅ IDO has ended. You can claim.</p>
      )}

      <div className="flex justify-center">
        <Button
          onClick={() => {
            if (!inputRef.current?.value) return;

            return claim.mutate({ amount: inputRef.current?.value });
          }}
          disabled={!data?.isIdoEnded}
        >
          {!data?.isIdoEnded ? (
            <>
              <Spinner className="mr-2 w-4" color="green" />
              <span>IDO has not ended yet</span>
            </>
          ) : (
            'Claim'
          )}
        </Button>
      </div>
    </div>
  );
}

export default Claim;
