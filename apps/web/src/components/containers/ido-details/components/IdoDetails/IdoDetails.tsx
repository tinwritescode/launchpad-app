import React from "react";
import data from "./ido-details-data.json";
import IdoName from "./IdoName";
import IdoStatus from "./IdoStatus";
import IdoButtonWallet from "./IdoButtonWallet";
import IdoTable from "./IdoTable";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useIdoDetail } from "../../hooks/useIdoDetail";
import { useStakingHook } from "~/components/containers/staking/useStaking";

const IdoDetail = () => {
  const { id } = useRouter().query as { id: string };
  const { data, isLoading } = api.project.getOne.useQuery(
    { id },
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const { amountStaked, stakingTokenName, stakingTokenBalance } =
    useStakingHook();

  const { idosInfo } = useIdoDetail({
    idoContractAddresses: data?.IDOContract?.map((c) => c.address),
  });

  const idoTier = idosInfo.find((ido) => {
    return (
      amountStaked &&
      ido.minStaking <= amountStaked &&
      amountStaked <= ido.maxStaking
    );
  });

  console.log(idoTier);

  if (isLoading) return <div>Loading...</div>;

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
            <IdoButtonWallet />
            <div className=" text-lg text-neutral-400">
              {data?.summaryContent}
            </div>
          </div>
          <div className="flex flex-col justify-center h-fit w-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md p-2">
            <div className="flex flex-row"></div>
            <hr className="mb-2" />
            <div className="text-xl text-left">CLOSED</div>
            <hr className="mb-2 mt-2" />

            <div className="flex flex-row"></div>
            <hr className="mb-2 mt-2" />
            <div className="flex flex-row"></div>
          </div>
        </div>
        {/* <IdoTable /> */}
      </div>
    </>
  );
};

export default IdoDetail;
