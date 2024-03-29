import { ethers } from "ethers";
import React from "react";
import { BarLoader } from "react-spinners";

import Link from "next/link";
import {
  FaFacebook,
  FaFirefoxBrowser,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { api } from "../../../../../utils/api";

const Column = [
  "Project Name",
  "Offical Website",
  "Participants",
  "Total Raise/Target Raise",
  "Status",
  "Action",
];

const LIMIT_PAGE = 5;

const IDOList = () => {
  const [page, setPage] = React.useState(0);

  const { data, isLoading, error } = api.project.getAll.useQuery({
    offset: page * LIMIT_PAGE,
    limit: LIMIT_PAGE,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <BarLoader />
      </div>
    );
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
              <th
                key={item}
                className="px-6 py-3 font-semibold text-base bg-rose-50 text-gray-900 text-center whitespace-nowrap "
              >
                {item}
              </th>
            ))}
          </thead>
          <tbody>
            {data?.data?.map(
              (item: any) =>
                item.status === "ACTIVE" && (
                  <tr
                    className="px-6 py-2 border-b border-gray-200 hover:bg-gray-100"
                    key={item.id}
                  >
                    <td className="min-h-[80px] whitespace-nowrap">
                      <div className="flex items-center pl-4">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm font-semibold text-gray-500">
                            {item.token.symbol || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.token.name || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="min-h-[80px] flex flex-row items-center">
                      {item.websiteURL && (
                        <Link
                          href={item.websiteURL}
                          className="text-cyan-400 hover:text-cyan-600 flex flex-1 items-center justify-center"
                        >
                          <FaFirefoxBrowser className="text-4xl" />
                        </Link>
                      )}
                      {item.facebookURL && (
                        <Link
                          href={item.facebookURL}
                          className="text-cyan-400 hover:text-cyan-600 flex flex-1 items-center justify-center"
                        >
                          <FaFacebook className="text-4xl" />
                        </Link>
                      )}
                      {item.twitterURL && (
                        <Link
                          href={item.twitterURL}
                          className="text-cyan-400 hover:text-cyan-600 flex flex-1 items-center justify-center"
                        >
                          <FaTwitter className="text-4xl" />
                        </Link>
                      )}

                      {item.telegramURL && (
                        <Link
                          href={item.telegramURL}
                          className="text-cyan-400 hover:text-cyan-600 flex flex-1 items-center justify-center"
                        >
                          <FaTelegram className="text-4xl" />
                        </Link>
                      )}
                    </td>
                    <td className="min-h-[80px] whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                        {item.totalParticipants || 0}
                      </div>
                    </td>
                    <td className="min-h-[80px] text-sm text-gray-500 whitespace-nowrap text-center">
                      {item?.targettedRaise &&
                        item?.totalRaised &&
                        ethers.utils.formatEther(item.totalRaised) +
                          "/" +
                          ethers.utils.formatEther(item.targettedRaise)}
                    </td>
                    <td className="min-h-[80px] whitespace-nowrap text-center">
                      <span
                        className={
                          "px-2 inline-flex text-sm leading-5 font-semibold rounded-full" +
                          (item.sale.status === "CLOSE"
                            ? " bg-red-100 text-red-800"
                            : item.sale.status === "OPEN"
                            ? " bg-green-100 text-green-800"
                            : " bg-yellow-100 text-yellow-800")
                        }
                      >
                        {item.sale.status}
                      </span>
                    </td>
                    <td className="min-h-[80px] text-sm font-medium underline whitespace-nowrap text-center">
                      <Link
                        href={`/project/${item.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        More
                      </Link>
                    </td>
                  </tr>
                )
            )}
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
                <li key={item}>
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
