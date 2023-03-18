import React from "react";
import styled from "styled-components";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import ExpandableRow from "./ExpandableRow";

interface FramingTableDataTypes {
  key: string;
  pools: string;
  apy: string;
  staked: string;
  totalValueLocked: string;
}

const StyledTable = styled(Table)``;

const data = [
  {
    key: "1",
    pools: "Pools",
    apy: "APY",
    staked: "STAKED",
    totalValueLocked: "TOTAL VALUE LOCKED",
  },
  // {
  //   key: "2",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
  // {
  //   key: "3",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
  // {
  //   key: "4",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
  // {
  //   key: "5",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
  // {
  //   key: "6",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
  // {
  //   key: "7",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
  // {
  //   key: "8",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
  // {
  //   key: "9",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
  // {
  //   key: "10",
  //   pools: "Pools",
  //   apy: "APY",
  //   staked: "STAKED",
  //   totalValueLocked: "TOTAL VALUE LOCKED",
  // },
];

const columns: ColumnsType<FramingTableDataTypes> = [
  {
    title: "Pools",
    dataIndex: "pools",
    key: "pools",
  },
  {
    title: "APY",
    dataIndex: "apy",
    key: "apy",
  },
  {
    title: "STAKED",
    dataIndex: "staked",
    key: "staked",
  },
  {
    title: "TOTAL VALUE LOCKED",
    dataIndex: "totalValueLocked",
    key: "totalValueLocked",
  },
  Table.EXPAND_COLUMN,
];

const FarmingTable = () => {
  return (
    <StyledTable
      // @ts-ignore
      columns={columns}
      dataSource={data}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => <ExpandableRow />,
        expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <DownOutlined onClick={(e) => onExpand(record, e)} />
          ) : (
            <DownOutlined onClick={(e) => onExpand(record, e)} />
          ),
      }}
    />
  );
};

export default FarmingTable;
