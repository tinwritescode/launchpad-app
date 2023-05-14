import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { BarLoader } from "react-spinners";
import { api } from "~/utils/api";
import * as S from "./IDOList.style";
import { ethers } from "ethers";
import Link from "next/link";

interface Props {}

const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const _date = `0${d.getDate()}`.slice(-2);
  return `${_date}/${month}/${year}`;
};

const Column = [
  "Project Name",
  "Token",
  "CreateAt",
  "Target Raise",
  "Status",
  "Action",
];

const LIMIT_PAGE = 5;

const IDOList: React.FC<Props> = () => {
  const [page, setPage] = React.useState(0);

  const { data, isLoading, error, refetch } = api.project.getAll.useQuery({
    offset: page * LIMIT_PAGE,
    limit: LIMIT_PAGE,
  });

  if (isLoading) {
    return <BarLoader />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md p-4 sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {Column.map((item) => (
              <th className="px-6 py-3 font-semibold text-base bg-slate-300 text-gray-900 whitespace-nowrap ">
                {item}
              </th>
            ))}
          </thead>
          <tbody>
            {data?.data?.map((item) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src={"https://picsum.photos/200/300"}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">{"straw"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{<BarLoader />}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {item.createdAt && formatDate(item.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {item?.targettedRaise &&
                    ethers.utils.formatEther(item.targettedRaise)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {item.status}
                </td>
                <td className="px-6 py-4 text-sm text-center font-medium underline whitespace-nowrap">
                  <Link
                    href={`/project/${item.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data && data.meta && (
          <nav
            className="flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 ">
              Showing{" "}
              <span className="font-semibold text-gray-900 ">
                {(page * LIMIT_PAGE || 1) + " - " + (page + 1) * LIMIT_PAGE}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 ">
                {data.meta.total}
              </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              {Array.from(
                Array(Math.ceil(data.meta.total / LIMIT_PAGE)).keys()
              ).map((item) => (
                <li>
                  <div
                    className={`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                      item === page ? "font-semibold text-gray-900" : ""
                    }`}
                    onClick={() => setPage(item)}
                  >
                    {item + 1}
                  </div>
                </li>
              ))}

              <li>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === Math.ceil(data.meta.total / LIMIT_PAGE)}
                  className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 400"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default IDOList;

// <TableContainer component={Paper} variant="outlined">
//   <Table>
//     <TableHead>
//       <TableRow>
//         <StyledTableCell align="left">Project Name</StyledTableCell>
//         <StyledTableCell align="left">Token</StyledTableCell>
//         <StyledTableCell align="center">Create At</StyledTableCell>
//         <StyledTableCell align="center">Status</StyledTableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {data?.data.map((row) => (
//         <StyledTableRow key={row.name}>
//           <StyledTableCell align="left">
//             <S.ProjectInfo
//               id={row.id as string}
//               name={row.name as string}
//               image={row.image as string}
//               url={`/project/${row.id}`}
//             />
//           </StyledTableCell>
//           <StyledTableCell align="left">CORRECT ME</StyledTableCell>
//           <StyledTableCell align="center">
//             {formatDate(row.createdAt as Date)}
//           </StyledTableCell>
//           <StyledTableCell align="center">{row.status}</StyledTableCell>
//         </StyledTableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>
