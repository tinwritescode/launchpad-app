import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Button } from "../components/common";
import { Progress } from "../components/common/Progress";
import { useStakingHook } from "../components/containers/staking/useStaking";
import PageLayout from "../components/templates/PageLayout";
import { env } from "../env.mjs";
import { useErc20Contract } from "../libs/blockchain";
import {
  IDO_CONTRACT_STAKING_REQUIRED,
  IDO_CONTRACT_TAILWIND_COLORS,
  TierKeys,
} from "../server/api/routers/project/project.constant";
import { cn } from "../utils/tailwind";

function Home() {
  const router = useRouter();
  const { balanceOf } = useErc20Contract(env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS);
  const { amountStaked } = useStakingHook();
  const { address: walletAddress, isConnected } = useAccount();
  const balance = useQuery(
    ["balance"],
    () => balanceOf(walletAddress as string),
    {
      enabled: !!walletAddress,
    }
  );
  const renderEmptyIdo = () => (
    <>
      <div className="flex justify-center">
        <Image
          src="/assets/empty.png"
          alt="No IDO available"
          width={150}
          height={150}
        />
      </div>
      <div className="flex justify-center">
        <p>Currently there is no projects</p>
      </div>
    </>
  );
  const idoTypes = [
    {
      label: "Opening sales on Strawberry Launchpad",
      render: () => renderEmptyIdo(),
    },
    {
      label: "Upcoming sales on Strawberry Launchpad",
      render: () => renderEmptyIdo(),
    },
    {
      label: "Closed sales on Strawberry Launchpad",
      render: () => {
        const header = [
          "Project Name",
          "Type",
          "Participants",
          "Total Raised",
          "Network",
          "Price",
        ];

        const mockData = [
          {
            projectName: "Crypcade City",
            type: "Land Sale",
            participants: 6,
            totalRaised: "2,000 BOX",
            network: "Binance Smart Chain",
            price: "0.2 BNB/BOX",
            image:
              "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/e53dd3b35f68872386d20038eb7396a4caeadd70cd6989e8ea.jpg",
          },
          {
            projectName: "MetaDoge",
            type: "Land Sale",
            participants: 75,
            totalRaised: "1,280 BOX",
            network: "Binance Smart Chain",
            price: "300 BUSD/BOX",
            image:
              "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/9ac9cd9af0cd342eafec15affed5dba6c885c85a71825b3fb5.png",
          },
          {
            projectName: "DRIVEZ",
            type: "Land Sale",
            participants: 0,
            totalRaised: "300 BOX",
            network: "Binance Smart Chain",
            price: "475 BUSD/BOX",
            image:
              "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/9124e0f1519a509bc11c39f9aadab76c6eb0f04fb12fd9ed54.png",
          },
          {
            projectName: "MCity",
            type: "Land Sale",
            participants: 13,
            totalRaised: "1,000 BOX",
            network: "Binance Smart Chain",
            price: "200 BUSD/BOX",
            image:
              "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/d4922a260fab23aa9e46f3c9788e33580287c60d10f22fa5f6.png",
          },
          {
            projectName: "iStep - Phase 2",
            type: "Land Sale",
            participants: 145,
            totalRaised: "1,000 BOX",
            network: "Binance Smart Chain",
            price: "3500 ISTEP/BOX",
            image:
              "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/f2dedb80caa7a58f078911f222f5eefa530a4fffa4db240b68.jpg",
          },
          {
            projectName: "Bikearn",
            type: "Land Sale",
            participants: 242,
            totalRaised: "2,250 BOX",
            network: "Binance Smart Chain",
            price: "150 BUSD/BOX",
            image:
              "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/86504dc60dc15916605e77946a862e4c193db2dd75b455fabe.png",
          },
        ];

        return (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-700">
                {header.map((item, index) => (
                  <th key={index} className="px-4 py-4 text-center">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 whitespace-nowrap">
                  <td className="p-5 text-center px-5">
                    <div className="flex items-center space-x-2">
                      <img
                        src={item.image}
                        alt={item.projectName}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>{item.projectName}</div>
                    </div>
                  </td>
                  <td className="text-center px-5">
                    <div className="bg-yellow-100 p-1 text-yellow-600 text-xs px-4 rounded-2xl whitespace-nowrap">
                      {item.type}
                    </div>
                  </td>
                  <td className="text-center px-5">{item.participants}</td>
                  <td className="text-center px-5">{item.totalRaised}</td>
                  <td className="text-center px-5">{item.network}</td>
                  <td className="text-center px-5">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      },
    },
  ];
  const userTierIndex =
    isConnected &&
    amountStaked &&
    Object.values(IDO_CONTRACT_STAKING_REQUIRED).findIndex((value, index) => {
      return (
        amountStaked.gte(ethers.utils.parseEther(value.toString())) &&
        amountStaked.lt(
          ethers.utils.parseEther(
            IDO_CONTRACT_STAKING_REQUIRED[
              Object.keys(IDO_CONTRACT_STAKING_REQUIRED)[index + 1] as TierKeys
            ]?.toString() ?? "0"
          )
        )
      );
    });

  return (
    <PageLayout>
      <Head>
        <title>{env.NEXT_PUBLIC_PROJECT_NAME} - Home</title>
      </Head>

      <div className="text-center space-y-4 my-10">
        <h2 className="text-4xl font-semibold">Strawberry Launchpad</h2>
        {isConnected && balance.data && (
          <div>
            <div className="text-muted-foreground text-sm">Your balance</div>
            <div className="font-semibold text-lg">
              {ethers.utils.commify(ethers.utils.formatEther(balance?.data))}
            </div>
          </div>
        )}

        <div className="space-x-2">
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/buy-straw")}
          >
            Buy STRAW
          </Button>
          <Button size="lg">
            <Link className="block" href="/staking">
              Stake now
            </Link>
          </Button>
        </div>
      </div>

      <div className="text-center space-y-4">
        <Link className="font-semibold" href="/how-to-stake">
          How to stake? &gt;&gt;
        </Link>

        {isConnected && amountStaked && (
          <div>
            <p className="text-sm text-muted-foreground">Your staked amount:</p>
            <div className="font-semibold text-lg">
              {ethers.utils.commify(ethers.utils.formatEther(amountStaked))}{" "}
              STRAW
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8 my-10">
        {isConnected && userTierIndex && (
          <Progress value={20 * userTierIndex} />
        )}

        <div className="grid grid-cols-3 md:flex gap-1 md:gap-10 items-center justify-center">
          {Object.keys(IDO_CONTRACT_STAKING_REQUIRED).map((_key) => {
            const key = _key as TierKeys;
            const value = IDO_CONTRACT_STAKING_REQUIRED[key];
            return (
              // TODO: Add color
              <div
                key={key}
                className={cn(
                  "p-1 md:p-4 bg-gray-100 rounded-lg overflow-clip aspect-square flex items-center justify-center h-32",
                  IDO_CONTRACT_TAILWIND_COLORS[key] as string
                )}
              >
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    {key} required
                  </div>
                  <div className="font-semibold text-lg">
                    {ethers.utils.commify(value ?? 0)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {idoTypes.map((idoType) => (
        <section key={idoType.label} className="space-y-8 my-10">
          <h2 className="text-2xl font-semibold text-center">
            {idoType.label}
          </h2>

          <div className="w-full overflow-x-auto">{idoType.render()}</div>
        </section>
      ))}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
