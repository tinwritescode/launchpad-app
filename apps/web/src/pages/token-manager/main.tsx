import { useQuery } from "@tanstack/react-query";
import { BigNumber as BigNumberJS } from "bignumber.js";
import { ethers } from "ethers";
import { Dividend__factory } from "ido-contracts/typechain-types";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { Button } from "../../components/common";
import { Input } from "../../components/common/ui/input";
import { Label } from "../../components/common/ui/label";
import Spinner from "../../components/common/ui/spinner";
import { getErc20Contract, getRpcProvider } from "../../libs/blockchain";
import { api } from "../../utils/api";
import { getSigner } from "../../utils/ethereum";
import { cn } from "../../utils/tailwind";

const formatEtherAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function Main({}) {
  const router = useRouter();
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
  const {
    data: distributeInfo,
    isLoading,
    isInitialLoading,
  } = useQuery(
    ["distribute", query?.projectId],
    async () => {
      if (!dividendInfo) {
        return null;
      }

      const provider = getRpcProvider();
      const iface = Dividend__factory.createInterface();
      return Promise.all(
        dividendInfo.distributeLogs.map(async (log) => {
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
    }
  );

  const steps = [
    {
      title: "Send token",
      elements: [
        <div>
          <Label>Token name</Label>
          <Input
            placeholder="Token name"
            value={dividendInfo?.tokenName}
            disabled
          />
        </div>,

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
                  )
                  .then((tx) => tx.wait()),
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
      elements: [
        isLoading || isInitialLoading ? (
          <Spinner />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-left">Address</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {distributeInfo?.map((info) => (
                <tr>
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
        <p>
          <div>
            <AiOutlineCheck className="inline-block mr-2" /> Ready to start IDO
          </div>
          <div>
            <AiOutlineCheck className="inline-block mr-2" /> IDO start date:{" "}
            {moment(dividendInfo?.idoStartIn.toString()).format(
              "YYYY/MM/DD - HH:mm"
            )}
          </div>
        </p>,
      ] as React.ReactNode[],
    },
    {
      title: "IDO finished",
      elements: [],
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

    if (dividendInfo?.isDistributed) {
      setMaxStep(2);
    }

    if (dividendInfo?.isReady) {
      setMaxStep(3);
    }
  }, [dividendInfo]);

  return (
    <div className="flex py-10 w-full items-center justify-center">
      <div className="aspect-square w-[600px] space-y-4 rounded-md border bg-gray-50 p-8 shadow-md">
        <div className="text-center text-2xl font-semibold">IDO Controller</div>

        {isError ? (
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
                        "flex aspect-square w-14 items-center justify-center rounded-full bg-gray-800 p-4 font-bold text-white hover:opacity-80",
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
            <div className="space-y-3 py-4">{steps[currentStep]?.elements}</div>
          </div>
        )}
      </div>
    </div>
  );
}
