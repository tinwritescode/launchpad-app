import React from "react";
import { useStakingHook } from "../../useStaking";
import TabPanel from "./TabPanel";

const StakingTabs = () => {
  const { lockTime, APY } = useStakingHook();
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const handleTabItemClick = (index: number) => {
    setActiveTab(index);
  };

  const TabPanels = [
    {
      lockPeriod: "7 days",
      apyRate: "7",
      reLocksOnRegistration: true,
      earlyUnstakeFee: "0",
      status: "Unlocked",
    },
    {
      lockPeriod: "14 days",
      apyRate: "14",
      reLocksOnRegistration: true,
      earlyUnstakeFee: "0",
      status: "Unlocked",
    },
    {
      lockPeriod: "30 days",
      apyRate: "30",
      reLocksOnRegistration: true,
      earlyUnstakeFee: "0",
      status: "Unlocked",
    },
    {
      lockPeriod: "60 days",
      apyRate: "60",
      reLocksOnRegistration: true,
      earlyUnstakeFee: "0",
      status: "Unlocked",
    },
  ];

  return (
    <>
      <div className="h-1"></div>
      {lockTime && APY && (
        <TabPanel
          lockPeriod={`${lockTime?.toNumber() / 86400} days`}
          apyRate={APY.toString()}
          reLocksOnRegistration={false}
          status={"Unlocked"}
        />
      )}
    </>
  );
};

export default StakingTabs;
