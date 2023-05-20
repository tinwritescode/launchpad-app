import React from "react";

export const YourAllocationTab = () => {
  return (
    <>
      <div className="grid grid-flow-row md:grid-flow-col gap-4">
        <div className="overflow-x-auto">
          <table className="text-sm text-left w-full">
            <thead className="text-xs uppercase bg-gray-700 ">
              <tr>
                <th className="px-6 py-3">No. </th>
                <th className="px-6 py-3">Allocation</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Claim</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">1</th>
                <td className="px-6 py-4">0.0000</td>
                <td className="px-6 py-4">2021-09-01</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-md">
                    Claim
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">1</th>
                <td className="px-6 py-4">0.0000</td>
                <td className="px-6 py-4">2021-09-01</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-md">
                    Claim
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-500">
                <th className="px-6 py-4 font-medium whitespace-nowrap">1</th>
                <td className="px-6 py-4">0.0000</td>
                <td className="px-6 py-4">2021-09-01</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-md">
                    Claim
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-xl">
            + Add token to MetaMask
          </button>
        </div>
      </div>
    </>
  );
};
