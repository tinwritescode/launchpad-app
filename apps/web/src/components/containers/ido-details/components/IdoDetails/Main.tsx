import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import {
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { Label } from "src/components/common/ui/label";
import { api } from "../../../../../utils/api";
import { cn } from "../../../../../utils/tailwind";
import { Card } from "../../../../common/ui/card";
import Spinner from "../../../../common/ui/spinner";
import IdoStart from "./IdoStart";
import { StakingInfo } from "./StakingInfo";
import WhitelistTable from "./WhitelistTable";
import { useAccount } from "wagmi";
import PleaseConnectYourWallet from "../../../../common/PleaseConnectYourWallet";
import Claim from "./Claim";

export function Main({}) {
  const router = useRouter();
  const query = router.query;
  const { isConnected } = useAccount();
  const { data } = api.project.getOne.useQuery(
    { id: query?.id as string },
    {
      enabled: !!query?.id,
    }
  );

  /**
   * Xem thông tin dự án: tên dự án, giá IDO, giới thiệu ngắn
   * Xem team (logo, linkedin, twitter)
   * Xem rank của mình, các rank hiện có, nút staking để lên rank
   * Các mạng xã hội của dự án
   * Trạng thái dự án
   */
  const steps = useMemo(
    () => [
      {
        title: "Project info",
        elements: [
          <>
            <div className="flex gap-6 items-center">
              <img
                src={data?.image}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold">{data?.name}</div>
                <div className="text-sm font-semibold text-gray-600">
                  ${data?.token?.symbol}
                </div>
              </div>
            </div>
          </>,
          <div>
            <Label className="flex items-center gap-1">
              <IoMdInformationCircleOutline />
              Description:
            </Label>
            <p
              className={cn(
                "text-sm text-gray-600",
                "whitespace-pre-wrap",
                "overflow-ellipsis overflow-hidden",
                "my-2"
              )}
            >
              {data?.summaryContent}
            </p>
          </div>,
          <div>
            <Label className="flex items-center gap-1">
              <IoMdInformationCircleOutline />
              Website:
            </Label>
            <a
              href={data?.website}
              target="_blank"
              className="text-sm text-gray-600"
            >
              {data?.website}
            </a>
          </div>,
          <div>
            <Label className="flex items-center gap-1">
              <IoMdInformationCircleOutline />
              Whitepaper:
            </Label>
            <a
              href={data?.whitepaper}
              target="_blank"
              className="text-sm text-gray-600"
            >
              {data?.whitepaper}
            </a>
          </div>,
          <div></div>,
        ] as React.ReactNode[],
        connectWalletRequired: false,
      },
      {
        title: "Team",
        elements: [
          <div className="grid grid-cols-3 gap-4">
            {["John", "Doe", "Alice", "Bob", "Lan", "Linh"].map((name) => (
              <Card className="flex flex-col items-center gap-1 p-4">
                <img
                  src="https://i.pravatar.cc/100"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-xs text-gray-600">CEO</div>

                <div className="flex gap-2">
                  <a href="#" target="_blank">
                    <IoLogoLinkedin className="w-6 h-6" />
                  </a>
                  <a href="#" target="_blank">
                    <IoLogoTwitter className="w-6 h-6" />
                  </a>
                  <a href="#" target="_blank">
                    <IoLogoInstagram className="w-6 h-6" />
                  </a>
                </div>
              </Card>
            ))}
          </div>,
        ] as React.ReactNode[],
        connectWalletRequired: false,
      },
      {
        title: "Staking",
        elements: [<StakingInfo />] as React.ReactNode[],
        connectWalletRequired: true,
      },
      {
        title: "Whitelist locked",
        elements: [<WhitelistTable />] as React.ReactNode[],
        connectWalletRequired: true,
      },
      {
        title: "IDO start",
        elements: [<IdoStart />] as React.ReactNode[],
        connectWalletRequired: true,
      },
      {
        title: "Claim",
        elements: [<Claim />] as React.ReactNode[],
        connectWalletRequired: true,
      },
      {
        title: "History",
        elements: [] as React.ReactNode[],
        connectWalletRequired: true,
      },
    ],
    []
  );

  const { address } = useAccount();

  const { data: userWhiteListInfo } = api.project.getUserWhiteListInfo.useQuery(
    {
      id: query?.id as string,
      walletAddress: address as string,
    },
    {
      enabled: !!query?.id && !!address,
    }
  );

  const [currentStep, setCurrentStep] = React.useState(0);
  const [maxStep, setMaxStep] = React.useState(4);

  useEffect(() => {
    if (!userWhiteListInfo?.isIdoStarted) {
      setMaxStep(4);
      setCurrentStep(4);
    }

    if (userWhiteListInfo?.isIdoEnded) {
      setMaxStep(5);
      setCurrentStep(5);
    }

    if (userWhiteListInfo?.isClaimed) {
      setMaxStep(6);
      setCurrentStep(6);
    }
  }, [isConnected, userWhiteListInfo]);

  return (
    <div className="flex py-10 w-full items-center justify-center">
      <div className="aspect-square w-[600px] space-y-4 rounded-md border bg-gray-50 p-8 shadow-md">
        <div className="text-center text-2xl font-semibold">
          {steps[currentStep]?.title || <Spinner />}
        </div>

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

        {steps[currentStep]?.connectWalletRequired && !isConnected ? (
          <PleaseConnectYourWallet />
        ) : (
          <div className="space-y-3 py-4">{steps[currentStep]?.elements}</div>
        )}
      </div>
    </div>
  );
}
