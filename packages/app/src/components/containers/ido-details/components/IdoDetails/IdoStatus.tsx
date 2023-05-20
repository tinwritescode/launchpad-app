import React from "react";

type Props = {
  isOpen: boolean;
};

const IdoStatus = ({ isOpen }: Props) => {
  return (
    <>
      {isOpen ? (
        <span className="text-xs bg-green-500 w-fit px-2 py-0.5 rounded-lg">
          🟢 Open
        </span>
      ) : (
        <div className="text-xs text-red-700 bg-red-400 w-fit px-2 py-0.5 rounded-lg">
          🔴 Closed
        </div>
      )}
    </>
  );
};

export default IdoStatus;
