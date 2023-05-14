import React from "react";
import TabItem from "./TabItem";
import TabPanel from "./TabPanel";

type Props = {};

const StakingTabs = (props: Props) => {
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
      {TabPanels.map((item, index) => {
        if (index == activeTab) {
          return (
            <TabPanel
              lockPeriod={item.lockPeriod}
              apyRate={item.apyRate}
              reLocksOnRegistration={item.reLocksOnRegistration}
              earlyUnstakeFee={item.earlyUnstakeFee}
              status={item.status}
              key={index}
            />
          );
        }
      })}
    </>
  );
};

export default StakingTabs;
