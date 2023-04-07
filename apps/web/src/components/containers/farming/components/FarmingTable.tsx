// import { DownOutlined } from "@ant-design/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import { Table } from "antd";
// import type { ColumnsType } from "antd/es/table";
import { useFarmingHook } from "../useFarming";
import ExpandableRow from "./ExpandableRow";

const data = [
  {
    key: "1",
    pools: "Pools",
    apy: "APY",
    staked: "STAKED",
    totalValueLocked: "TOTAL VALUE LOCKED",
  },
];

// const columns: ColumnsType<any> = [
//   {
//     title: "Pools",
//     dataIndex: "pools",
//     key: "pools",
//   },
//   {
//     title: "APY",
//     dataIndex: "apy",
//   },
//   {
//     title: "STAKED",
//     dataIndex: "staked",
//   },
//   {
//     title: "TOTAL VALUE LOCKED",
//     dataIndex: "totalValueLocked",
//   },
//   Table.EXPAND_COLUMN,
// ];

const FarmingTable = () => {
  return (
    <h1>Table Farming</h1>
    // <Table
    //   columns={columns}
    //   dataSource={data}
    //   pagination={false}
    //   expandable={{
    //     expandedRowRender: (record) => <ExpandableRow />,
    //     expandIcon: ({ expanded, onExpand, record }) =>
    //       expanded ? (
    //         <DownOutlined onClick={(e) => onExpand(record, e)} />
    //       ) : (
    //         <DownOutlined onClick={(e) => onExpand(record, e)} />
    //       ),
    //   }}
    // />
  );
};

export default FarmingTable;
