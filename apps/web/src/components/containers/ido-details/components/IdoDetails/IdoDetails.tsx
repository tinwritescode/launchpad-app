import React from "react";
import data from "./ido-details-data.json";
import IdoName from "./IdoName";
import IdoStatus from "./IdoStatus";
import IdoButtonWallet from "./IdoButtonWallet";
import IdoTable from "./IdoTable";

type Props = {};

const IdoDetail = (props: Props) => {
  return (
    <>
      <div className="container h-screen bg-slate-800 text-white p-2">
        <div className="flex flex-row gap-2 py-8 ">
          <div className="flex flex-col justify-center w-full gap-2 ">
            {/* ido logo */}
            <div className=" flex items-center justify-center h-24 w-24 bg-cover bg-center bg-[url('https://bscpad.com/images/choose-icon-bg.png')]">
              <img
                className="h-14 w-14 rounded-full box-border"
                src={data.avatar_img}
                alt="logo"
              />
            </div>
            <IdoName
              name={data.name}
              twitterUrl={data.twitter_url}
              telegramUrl={data.telegram_url}
              websiteUrl={data.website_url}
            />
            <IdoStatus isOpen={data.is_open} />
            <div className="text-xs text-yellow-800 bg-yellow-600 w-fit px-2 py-0.5 rounded-lg">
              BUSD
            </div>
            <div className=" text-lg text-neutral-400">{data.description}</div>
            <IdoButtonWallet />
          </div>
          <div className="flex flex-col justify-center h-fit w-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md p-2">
            <div className="text-2xl font-semibold text-left">CLOSED</div>
          </div>
        </div>
        <IdoTable />
      </div>
    </>
  );
};

export default IdoDetail;
