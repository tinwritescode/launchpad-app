import React from "react";
import { ProjectDetailsTab } from "./ProjectDetailsTab";
import { ScheduleTab } from "./ScheduleTab";
import { YourAllocationTab } from "./YourAllocationTab";
import { PoolDetailsTab } from "./PoolDetailsTab";

type Props = {};

const activeTabClass = "border-b-4 border-yellow-400 text-yellow-400 font-bold";

const IdoTable = (props: Props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <>
      <ul className="grid grid-flow-row md:grid-flow-col justify-start items-center gap-4 border-b-2 text-xl mb-2">
        <li>
          <button
            className={activeTab == 0 ? activeTabClass : ""}
            onClick={() => setActiveTab(0)}
          >
            Project Details
          </button>
        </li>
        <li>
          <button
            className={activeTab == 1 ? activeTabClass : ""}
            onClick={() => setActiveTab(1)}
          >
            Pool Details
          </button>
        </li>
        <li>
          <button
            className={activeTab == 2 ? activeTabClass : ""}
            onClick={() => setActiveTab(2)}
          >
            Schedule
          </button>
        </li>
        <li>
          <button
            className={activeTab == 3 ? activeTabClass : ""}
            onClick={() => setActiveTab(3)}
          >
            Your Allocation
          </button>
        </li>
      </ul>
      {/* {activeTab == 0 && <ProjectDetailsTab />} */}
      <ul>
        <li style={activeTab == 0 ? { display: "block" } : { display: "none" }}>
          <ProjectDetailsTab />
        </li>
        <li style={activeTab == 1 ? { display: "block" } : { display: "none" }}>
          <PoolDetailsTab />
        </li>
        <li style={activeTab == 2 ? { display: "block" } : { display: "none" }}>
          <ScheduleTab />
        </li>
        <li style={activeTab == 3 ? { display: "block" } : { display: "none" }}>
          <YourAllocationTab />
        </li>
      </ul>
    </>
  );
};

export default IdoTable;
