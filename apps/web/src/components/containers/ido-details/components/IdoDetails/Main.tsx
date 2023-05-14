import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { getErc20Contract } from "../../../../../libs/blockchain";
import { api } from "../../../../../utils/api";
import { getSigner } from "../../../../../utils/ethereum";
import { cn } from "../../../../../utils/tailwind";
import Spinner from "../../../../common/ui/spinner";
import { BigNumber as BigNumberJS } from "bignumber.js";
import { Input } from "src/components/common/ui/input";
import { Button } from "src/components/common/AppButton";
import { Label } from "src/components/common/ui/label";

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

  /**
     * 
     * - Xem thông tin dự án: tên dự án, giá IDO, giới thiệu ngắn
- Xem team (logo, linkedin, twitter)
- Xem rank của mình, các rank hiện có, nút staking để lên rank
- Các mạng xã hội của dự án
- Trạng thái dự án

     */

  const steps = [
    {
      title: "Project info",
      elements: [] as React.ReactNode[],
    },
    {
      title: "Team",
      elements: [] as React.ReactNode[],
    },
    {
      title: "Staking",
      elements: [
        <div>
          <Label>Stake</Label>
          <Input />
        </div>,
      ] as React.ReactNode[],
    },
    {
      title: "Social media",
      elements: [] as React.ReactNode[],
    },
    {
      title: "Whitelist locked",
      elements: [] as React.ReactNode[],
    },
    {
      title: "IDO start",
      elements: [] as React.ReactNode[],
    },
    {
      title: "Claim",
      elements: [] as React.ReactNode[],
    },
    {
      title: "History",
      elements: [] as React.ReactNode[],
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

        <div className="overflow-x-auto py-4">
          <div className="flex w-[1000px] text-center">
            {steps.map((step, index) => (
              <div key={step.title} className="flex-1">
                <button
                  onClick={() => {
                    if (index > maxStep) return;
                    return setCurrentStep(index);
                  }}
                >
                  <div className="flex flex-col items-center justify-center space-y-1">
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
                    <div className="text-sm font-semibold flex items-center whitespace-nowrap">
                      {index === maxStep && <Spinner className="w-4" />}
                      {step.title}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 py-4">{steps[currentStep]?.elements}</div>
      </div>
    </div>
  );
}
