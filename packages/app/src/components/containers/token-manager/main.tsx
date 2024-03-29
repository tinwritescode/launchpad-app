import { Dividend__factory } from "@strawberry/contracts";
import { useQuery } from "@tanstack/react-query";
import { BigNumber as BigNumberJS } from "bignumber.js";
import { ethers } from "ethers";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { FaHourglassEnd } from "react-icons/fa";
import { useAccount } from "wagmi";
import { getErc20Contract, getRpcProvider } from "../../../libs/blockchain";
import { api } from "../../../utils/api";
import { getSigner } from "../../../utils/ethereum";
import { cn } from "../../../utils/tailwind";
import { Button } from "../../common";
import PleaseConnectYourWallet from "../../common/PleaseConnectYourWallet";
import { Input } from "../../common/ui/input";
import { Label } from "../../common/ui/label";
import Spinner from "../../common/ui/spinner";

const formatEtherAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function Inside() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const query = router.query;
  const { data: dividendInfo, isError } =
    api.project.getDividendContractInfo.useQuery(
      {
        id: query?.projectId as string,
      },
      {
        enabled: !!query?.projectId,
        retry: 0,
      }
    );
  const erc20Contract =
    dividendInfo && getErc20Contract(dividendInfo?.tokenAddress);
  const { data: distributeInfo, refetch: refetchDistributeInfo } = useQuery(
    ["distribute", query?.projectId],
    async () => {
      if (!dividendInfo) {
        return null;
      }

      const provider = getRpcProvider();
      const iface = Dividend__factory.createInterface();
      return Promise.all(
        dividendInfo.distributeLogs.map(async (log: any) => {
          const parsedLog = iface.parseLog(log);
          return {
            address: parsedLog.args[0],
            token: parsedLog.args[1],
            amount: parsedLog.args[2],
            timestamp: (await provider.getBlock(log.blockNumber)).timestamp,
          };
        })
      );
    },
    {
      enabled: !!query?.projectId && !!dividendInfo,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

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

    if (dividendInfo?.isDistributed) {
      setMaxStep(2);
    }

    if (dividendInfo?.isReady) {
      setMaxStep(3);
    }
  }, [dividendInfo]);

  const steps = [
    {
      title: "Send token",
      elements: [
        <div key={1}>
          <Label>Token name</Label>
          <Input
            placeholder="Token name"
            value={dividendInfo?.tokenName}
            disabled
          />
        </div>,

        <div key={2}>
          <Label>Token address</Label>
          <Input
            placeholder="Token address"
            value={dividendInfo?.contractAddress}
            disabled
          />
        </div>,

        <div key={3}>
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

        <div key={4}>
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

        <div key={5}>
          <Label>Left to send 👇</Label>
          {dividendInfo && (
            <Input
              placeholder="Left to send"
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

        <div key={6}>
          <p className="text-xs text-foreground">
            💡 Clicking the button below will send the remaining tokens to the
            dividend contract. <br />
            💡 Once the tokens are sent, our contract will distribute the tokens
            to every ido contract that has been created.
          </p>
        </div>,

        <div key={7}>
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
                  )
                  .then((tx) => tx.wait()),
                {
                  loading: "Sending...",
                  success: (e) => {
                    refetchDistributeInfo();
                    return "Sent!";
                  },
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
      elements: [
        (distributeInfo?.length === 0 && (
          <div className="my-10">
            <div className="text-center text-sm flex items-center flex-col gap-4">
              <FaHourglassEnd size={50} />

              <div>
                No distribute logs, please wait for distribute (usually take 24
                hours after sending tokens)
              </div>
            </div>
          </div>
        )) || (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-left">Address</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {distributeInfo?.map((info: any) => (
                <tr key={`${info.address}_${info.timestamp}`}>
                  <td>{formatEtherAddress(info.address)}</td>
                  <td>{ethers.utils.formatEther(info.amount.toString())}</td>
                  <td>{moment(info.timestamp).format("YYYY/MM/DD - HH:mm")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ),
      ] as React.ReactNode[],
    },
    {
      title: "IDO ready",
      elements: [
        <div key={1}>
          <AiOutlineCheck className="inline-block mr-2" /> Ready to start IDO
        </div>,
        <div key={2}>
          <AiOutlineCheck className="inline-block mr-2" /> IDO start date:{" "}
          {moment(
            BigNumberJS(dividendInfo?.idoStartIn.toString() || "0")
              .multipliedBy(1000)
              .toNumber()
          ).format("YYYY/MM/DD - HH:mm")}
        </div>,
      ] as React.ReactNode[],
    },
    {
      title: "IDO finished",
      elements: [],
    },
  ];

  return (
    <div className="flex py-10 w-full items-center justify-center">
      <div className="aspect-square w-[600px] space-y-4 rounded-md text-gray-800 border bg-gray-50 p-8 shadow-md">
        <div className="text-center text-2xl font-semibold">IDO Controller</div>

        {isConnected ? (
          isError ? (
            <div>Error</div>
          ) : (
            <div>
              <div className="flex items-center justify-evenly space-x-4">
                {steps.map((step, index) => (
                  <button
                    onClick={() => {
                      if (index > maxStep) return;
                      return setCurrentStep(index);
                    }}
                    key={step.title}
                  >
                    <div
                      className="flex flex-col items-center justify-center space-y-1"
                      key={step.title}
                    >
                      <div
                        className={cn(
                          "flex aspect-square w-14 items-center justify-center rounded-full bg-gray-800 font-bold text-white hover:opacity-80",
                          {
                            "bg-green-500": index < maxStep,
                          }
                        )}
                      >
                        {index < maxStep ? <AiOutlineCheck /> : index + 1}
                      </div>
                      <div className="text-sm font-semibold flex items-center">
                        {index === maxStep && <Spinner className="w-4" />}
                        {step.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="space-y-3 py-4">
                {steps[currentStep]?.elements.map((element, index) => (
                  <div key={index}>{element}</div>
                ))}
              </div>
            </div>
          )
        ) : (
          <PleaseConnectYourWallet />
        )}
      </div>
    </div>
  );
}

export const Main = dynamic(() => Promise.resolve(Inside), {
  ssr: false,
});
