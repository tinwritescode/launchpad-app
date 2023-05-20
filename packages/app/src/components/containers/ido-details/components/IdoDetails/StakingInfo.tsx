import React from "react";
import { useStakingHook } from "../../../staking/useStaking";
import { Label } from "../../../../common/ui/label";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common";
import { ArrowRightOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

type Props = {};

export function StakingInfo({}: Props) {
  const { amountStaked } = useStakingHook();
  const router = useRouter();

  return (
    <div>
      <div className="space-y-3">
        <Label>Staked Amount</Label>
        <Input value={amountStaked?.div((1e18).toFixed(0)).toString()} />

        <Button
          onClick={() => {
            router.push("/staking");
          }}
        >
          <ArrowRightOutlined />
          Go to staking page
        </Button>
      </div>
    </div>
  );
}
