import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Input } from "../../components/common/ui/input";
import { Label } from "../../components/common/ui/label";
import { api } from "../../utils/api";
import { BigNumber as BigNumberJS } from "bignumber.js";
import { BigNumber, ethers } from "ethers";
import { BarLoader } from "react-spinners";
import { Button } from "../../components/common";
import { getErc20Contract, useErc20Contract } from "../../libs/blockchain";
import { getSigner } from "../../utils/ethereum";
import { toast } from "react-hot-toast";
import { cn } from "../../utils/tailwind";
import { AiOutlineCheck } from "react-icons/ai";

export function Main({}) {
  const router = useRouter();
  const query = router.query;

  const { data: dividendInfo } = api.project.getDividendContractInfo.useQuery(
    {
      id: query?.projectId as string,
    },
    {
      enabled: !!query?.projectId,
    }
  );
  const erc20Contract =
    dividendInfo && getErc20Contract(dividendInfo?.tokenAddress);

  const steps = [
    {
      title: "Send token",
      elements: [
        <div>
          <Label>Token address</Label>
          <Input
            placeholder="Token address"
            value={dividendInfo?.contractAddress}
            disabled
          />
        </div>,

        <div>
          <Label>Current balance</Label>
          {dividendInfo && (
            <Input
              placeholder="Current balance"
              value={
                dividendInfo
                  ? ethers.utils.formatEther(
                      BigNumberJS(dividendInfo?.dividendBalance).toFixed(0)
                    )
                  : "Loading..."
              }
              disabled
            />
          )}
        </div>,

        <div>
          <Label>Required balance</Label>
          <Input
            placeholder="Required balance"
            value={
              dividendInfo
                ? ethers.utils.formatEther(
                    BigNumberJS(dividendInfo?.requiredBalance).toFixed(0)
                  )
                : "Loading..."
            }
            disabled
          />
        </div>,

        // Left to deposit
        <div>
          <Label>Left to deposit</Label>
          {dividendInfo && (
            <Input
              placeholder="Left to deposit"
              value={
                BigNumberJS(dividendInfo?.dividendBalance).gt(
                  dividendInfo?.requiredBalance
                )
                  ? "0"
                  : ethers.utils.formatEther(
                      BigNumberJS(dividendInfo.requiredBalance)
                        .minus(BigNumberJS(dividendInfo.dividendBalance))
                        .toFixed(0)
                    ) || "Loading..."
              }
              disabled
            />
          )}
        </div>,

        <div className="py-3">
          <Button
            onClick={async () => {
              if (!erc20Contract) return;

              toast.promise(
                erc20Contract
                  .connect(getSigner())
                  .transfer(
                    dividendInfo?.contractAddress,
                    BigNumberJS(dividendInfo?.requiredBalance)
                      .minus(BigNumberJS(dividendInfo?.dividendBalance))
                      .toFixed(0)
                  ),
                {
                  loading: "Sending...",
                  success: "Sent!",
                  error: "Failed to send",
                }
              );
            }}
            disabled={
              !erc20Contract ||
              !BigNumberJS(dividendInfo?.dividendBalance).lt(
                dividendInfo?.requiredBalance
              )
            }
          >
            Send
          </Button>
        </div>,
      ] as React.ReactNode[],
    },
    {
      title: "Wait for distributing",
      elements: [<Input placeholder="Token address" />] as React.ReactNode[],
    },
    {
      title: "IDO ready",
      elements: [<Input placeholder="Token address" />] as React.ReactNode[],
    },
  ];
  const [currentStep, setCurrentStep] = React.useState(0);
  const [maxStep, setMaxStep] = React.useState(0);

  useEffect(() => {
    if (!dividendInfo) return;

    if (
      BigNumberJS(dividendInfo?.dividendBalance).gte(
        dividendInfo?.requiredBalance
      )
    ) {
      setMaxStep(1);
    }
  }, [dividendInfo]);

  return (
    <div className="flex py-10 w-full items-center justify-center">
      <div className="aspect-square w-[600px] space-y-4 rounded-md border bg-gray-50 p-8 shadow-md">
        <div className="text-center text-2xl font-semibold">IDO Controller</div>

        <div className="flex items-center justify-evenly space-x-4">
          {steps.map((step, index) => (
            <button
              onClick={() => {
                if (index > maxStep) return;
                return setCurrentStep(index);
              }}
            >
              <div
                className="flex flex-col items-center justify-center space-y-1"
                key={step.title}
              >
                <div
                  className={cn(
                    "flex aspect-square w-14 items-center justify-center rounded-full bg-gray-800 p-4 font-bold text-white hover:opacity-80",
                    {
                      "bg-green-500": index < maxStep,
                    }
                  )}
                >
                  {index < maxStep ? <AiOutlineCheck /> : index + 1}
                </div>
                <div className="text-sm font-semibold">{step.title}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-3 py-4">{steps[currentStep]?.elements}</div>
      </div>
    </div>
  );
}
