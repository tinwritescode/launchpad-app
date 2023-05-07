import React from "react";

export const ScheduleTab = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="text-sm text-left w-1/2">
          <thead className="text-xs uppercase bg-gray-700 ">
            <tr>
              <th className="px-6 py-3">Round</th>
              <th className="px-6 py-3">Opens</th>
              <th className="px-6 py-3">Closes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-500">
              <th className="px-6 py-3 font-medium whitespace-nowrap">
                Allocation
              </th>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            <tr className="border-b border-gray-500">
              <th className="px-6 py-3 font-medium whitespace-nowrap">
                FCFS-Prepare
              </th>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            <tr className="border-b border-gray-500">
              <th className="px-6 py-3 font-medium whitespace-nowrap">
                FCFS-Start
              </th>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
