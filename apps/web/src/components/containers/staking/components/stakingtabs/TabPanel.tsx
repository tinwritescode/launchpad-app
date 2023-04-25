import React from "react";

type Props = {
  lockPeriod: string;
  apyRate: string;
  reLocksOnRegistration: boolean;
  earlyUnstakeFee: string;
  status: string;
};

const TabPanel = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap justify-between">
          <div className="text-lg text-gray-500">
            Lock period:{" "}
            <span className="text-white font-semibold">{props.lockPeriod}</span>
          </div>
          <div className="text-white text-lg">APY Rate</div>
        </div>
        <div className="flex flex-row flex-wrap justify-between">
          <div className="text-lg text-gray-500">
            Re-locks on registration:{" "}
            <span className="text-white ">
              {props.reLocksOnRegistration ? "Yes" : "No"}
            </span>
          </div>
          <div className="text-2xl font-semibold text-green-500">
            {props.apyRate}%
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-between">
          <div className="text-lg text-gray-500">
            Early unstake fee:{" "}
            <span className="text-white">{props.earlyUnstakeFee}%</span>
          </div>
          <div className="text-lg text-gray-500">*APY is dynamic</div>
        </div>
        <div className="text-lg text-gray-500">
          Status: <span className="text-white">{props.status}</span>
        </div>
      </div>
    </>
  );
};

export default TabPanel;
