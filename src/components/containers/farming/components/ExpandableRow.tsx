import React, { useMemo } from "react";
import styled from "styled-components";
import { Input, Button, InputNumber } from "antd";
import { useFarmingHook } from "../useFarming";
import { env } from "../../../../env.mjs";
import { BigNumber, ethers } from "ethers";
import { formatNumber } from "../../../../utils/format";

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    box-sizing: border-box;
    padding: 10px;
}`;

const StyledInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eaeaea;
    padding: 10px;
    box-sizing: border-box;
    gap: 10px;
}`;

const StyledExpandableRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
}`;

const ExpandableRow = () => {
  const {
    amountStaked,
    stakingTokenName,
    approve,
    stake,
    stakingTokenBalance,
    claimReward,
    unclaimedRewards,
    approveAmount,
  } = useFarmingHook();

  const balanceInEther = useMemo(() => {
    return ethers.utils.formatEther(stakingTokenBalance || "0");
  }, [stakingTokenBalance]);
  const amountStakedInEther = useMemo(() => {
    return ethers.utils.formatEther(amountStaked || "0");
  }, [amountStaked]);
  const unclaimedRewardsInEther = useMemo(() => {
    return ethers.utils.formatEther(unclaimedRewards || "0");
  }, [unclaimedRewards]);

  const inputRef = React.useRef<React.ElementRef<typeof InputNumber>>(null);
  const withdrawRef = React.useRef<React.ElementRef<typeof InputNumber>>(null);

  return (
    <>
      <StyledExpandableRow>
        <StyledForm>
          <h3>Deposit</h3>
          <StyledInput>
            <InputNumber
              max={Number(balanceInEther)}
              ref={inputRef}
              step={1}
              min={0}
            />
            <Button
              onClick={() => {
                if (inputRef.current) inputRef.current.value = balanceInEther;
              }}
            >
              MAX
            </Button>
            {approveAmount?.gt(BigNumber.from(0)) ? (
              <Button
                onClick={() => {
                  return stake({
                    amount: ethers.utils.parseEther(
                      inputRef.current?.value || "0"
                    ),
                  });
                }}
              >
                STAKE
              </Button>
            ) : (
              <Button
                disabled={balanceInEther === "0"}
                onClick={() =>
                  approve({
                    amount: ethers.constants.MaxUint256,
                    stakingAddress: env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
                  })
                }
              >
                APRROVE
              </Button>
            )}
          </StyledInput>
          <span>
            Your balance:{" "}
            {`${formatNumber(balanceInEther)} ${stakingTokenName}`}
          </span>
        </StyledForm>
        <StyledForm>
          <h3>Withdraw</h3>
          <StyledInput>
            <InputNumber ref={withdrawRef} />
            <Button
              onClick={() => {
                if (withdrawRef.current)
                  withdrawRef.current.value = amountStakedInEther;
              }}
            >
              MAX
            </Button>
            <Button>Withdraw</Button>
          </StyledInput>
          <span>
            deposited:{" "}
            {`${formatNumber(amountStakedInEther)} ${stakingTokenName}`}
          </span>
        </StyledForm>
        <StyledForm>
          <h3>Pending Rewards</h3>
          <StyledInput>
            <h3>{`${formatNumber(
              unclaimedRewardsInEther
            )} ${stakingTokenName}`}</h3>
            <Button
              disabled={Number(unclaimedRewardsInEther) === 0}
              onClick={() => {
                return claimReward();
              }}
            >
              Claim
            </Button>
          </StyledInput>
        </StyledForm>
      </StyledExpandableRow>
      <div>
        <span>Get ${stakingTokenName}-BNB</span>
        <span>Get ${stakingTokenName}-BNB</span>
        <span>Get ${stakingTokenName}-BNB</span>
      </div>
    </>
  );
};

export default ExpandableRow;
