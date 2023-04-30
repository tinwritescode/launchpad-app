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
      <ul className="flex flex-row flex-wrap justify-between gap-2 text-lg font-semibold">
        <TabItem
          value="7 DAYS"
          isActive={activeTab == 0}
          onClick={() => {
            handleTabItemClick(0);
          }}
        />
        <TabItem
          value="14 DAYS"
          isActive={activeTab == 1}
          onClick={() => {
            handleTabItemClick(1);
          }}
        />
        <TabItem
          value="30 DAYS"
          isActive={activeTab == 2}
          onClick={() => {
            handleTabItemClick(2);
          }}
        />
        <TabItem
          value="60 DAYS"
          isActive={activeTab == 3}
          onClick={() => {
            handleTabItemClick(3);
          }}
        />
      </ul>
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
