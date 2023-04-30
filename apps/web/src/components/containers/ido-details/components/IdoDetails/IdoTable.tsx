import React from "react";
import { ProjectDetailsTab } from "./ProjectDetailsTab";
import { ScheduleTab } from "./ScheduleTab";
import { YourAllocationTab } from "./YourAllocationTab";

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
            Schedule
          </button>
        </li>
        <li>
          <button
            className={activeTab == 2 ? activeTabClass : ""}
            onClick={() => setActiveTab(2)}
          >
            Your Allocation
          </button>
        </li>
      </ul>
      {activeTab == 0 && <ProjectDetailsTab />}
      {activeTab == 1 && <ScheduleTab />}
      {activeTab == 2 && <YourAllocationTab />}
    </>
  );
};

export default IdoTable;
