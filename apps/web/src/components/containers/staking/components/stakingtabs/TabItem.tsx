import React from "react";

type Props = {
  value: string;
  isActive: boolean;
  onClick: () => void;
};

const TabItem = ({ value, isActive, onClick }: Props) => {
  return (
    <>
      {isActive ? (
        <li
          className="flex-1 px-4 py-2 text-center border-gray-500 border bg-gray-500 cursor-pointer text-green-500 font-bold"
          onClick={onClick}
        >
          {value}
        </li>
      ) : (
        <li
          className="flex-1 border px-4 py-2  border-gray-500 text-center cursor-pointer"
          onClick={onClick}
        >
          {value}
        </li>
      )}
    </>
  );
};

export default TabItem;
