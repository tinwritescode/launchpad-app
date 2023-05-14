import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useStakingHook } from "~/components/containers/staking/useStaking";
import { useErc20Contract } from "~/libs/blockchain";
import { api } from "~/utils/api";
import { getSigner } from "~/utils/ethereum";
import { Button } from "../../../../common";
import IdoButtonWallet from "./IdoButtonWallet";
import IdoName from "./IdoName";
import IdoStatus from "./IdoStatus";
import IdoTable from "./IdoTable";
import { Main } from "./Main";
import Head from "next/head";
import { env } from "../../../../../env.mjs";

const IdoDetail = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading, isError } = api.project.getOne.useQuery(
    { id },
    { enabled: !!id, refetchOnWindowFocus: true }
  );
  const { amountStaked, stakingTokenName, stakingTokenBalance } =
    useStakingHook();
  const userTier =
    amountStaked &&
    data?.IDOContract?.find(
      (c) =>
        amountStaked.gte(ethers.utils.parseEther(c.minStakedAmount)) &&
        amountStaked.lt(ethers.utils.parseEther(c.maxStakedAmount))
    );

  const getAproveAmount = async (tokenAddress: any, tierAdress: any) => {
    const singer = getSigner();

    console.log(singer, tokenAddress, tierAdress);
    const allownce = useErc20Contract(tokenAddress).allowance(
      singer.getAddress(),
      tierAdress
    );

    return allownce;
  };

  const { data: approveAmount } = useQuery(
    ["approveAmount", data?.token?.address, userTier?.address],
    () => {
      return getAproveAmount(data?.token?.address, userTier?.address);
    },
    { enabled: !!data?.token?.address && !!userTier?.address }
  );

  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>
          {data?.name} - {env.NEXT_PUBLIC_PROJECT_NAME}
        </title>
      </Head>
      <Main />
    </>
  );

  return (
    <>
      <div className="container h-full bg-slate-800 text-white p-4">
        <div className="flex flex-row gap-2 py-8 ">
          <div className="flex flex-col justify-center w-full gap-2 ">
            {/* ido logo */}
            <div className=" flex items-center justify-center h-24 w-24 bg-cover bg-center bg-[url('https://bscpad.com/images/choose-icon-bg.png')]">
              <img
                className="h-14 w-14 rounded-full box-border"
                src={data?.image}
                alt="logo"
              />
            </div>
            <IdoName
              name={data?.name}
              twitterUrl={""}
              telegramUrl={""}
              websiteUrl={""}
            />
            <IdoStatus isOpen={data?.status == "ACTIVE"} />
            <div className="text-xs text-yellow-800 bg-yellow-600 w-fit px-2 py-0.5 rounded-lg">
              BUSD
            </div>
            <div className=" text-lg text-neutral-400">
              {data?.roadmapContent}
            </div>
            {(data?.token?.address && userTier?.address && (
              <IdoButtonWallet
                connectedButtonProps={{
                  purchaseTokenAddress: data?.token?.address as string,
                  idoContractAddress: userTier?.address as string,
                  amount: userTier?.purchaseCap.toString() as string,
                  idoPrice: userTier?.idoPrice.toString() as string,
                }}
              />
            )) || <Button>Stake now to join</Button>}
            <div className=" text-lg text-neutral-400">
              {data?.summaryContent}
            </div>
          </div>
          <div className="flex flex-col justify-center h-fit w-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md p-2">
            <div className="grid grid-cols-2 ">
              <div className="">
                <h1>Your Blance:</h1>
                <div className="text-xl text-left">
                  {stakingTokenBalance &&
                    stakingTokenName &&
                    ethers.utils.formatEther(stakingTokenBalance)}{" "}
                  {stakingTokenName}
                </div>
              </div>
              <div className="">
                <h1>Your Tier:</h1>
                <div className="text-xl text-left">{userTier?.name}</div>
              </div>
            </div>
            <h1>Your approved amount:</h1>
            <div className="text-lg text-left">
              <div>{ethers.utils.formatEther(approveAmount || 0)}</div>
              <div>
                {userTier?.purchaseCap &&
                approveAmount?.gt(
                  ethers.utils.parseEther(userTier?.purchaseCap)
                ) ? (
                  <h1>{`approve amount greater than purchase Cap ${userTier?.purchaseCap}`}</h1>
                ) : (
                  <h1>{`approve amount less than purchase Cap ${userTier?.purchaseCap}`}</h1>
                )}
              </div>
            </div>
            <hr className="mb-2" />
            <div className="text-xl text-left">
              {data?.status == "ACTIVE" ? "OPENED" : "CLOSED"}
            </div>
            <hr className="mb-2 mt-2" />

            <div className="grid grid-cols-2 "></div>

            <hr className="mb-2 mt-2" />
            <div className="grid grid-cols-2 "></div>
          </div>
        </div>
        <IdoTable />
      </div>
    </>
  );
};

export default IdoDetail;
