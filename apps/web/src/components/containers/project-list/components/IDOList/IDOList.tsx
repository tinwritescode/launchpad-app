import { Prisma } from "database";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { api } from "~/utils/api";
import * as S from "./IDOList.style";

interface Props {}

const StyledTableCell = styled(TableCell)(({ theme }) => ({}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const _date = `0${d.getDate()}`.slice(-2);
  return `${_date}/${month}/${year}`;
};

const IDOList: React.FC<Props> = () => {
  const { data, isLoading, error, refetch } = api.project.getAll.useQuery({
    // status,
    offset: 0,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  const onChange = (key: string) => {
    refetch();
  };
  return (
    <>
      {/* project List
      {JSON.stringify(data)} */}
      {/* <S.ProjectList data = {data} /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fbe9e7" }}>
              <StyledTableCell align="left">Project Name</StyledTableCell>
              <StyledTableCell align="left">Token</StyledTableCell>
              <StyledTableCell align="center">Create At</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">
                  <S.ProjectInfo
                    id={row.id as string}
                    name={row.name as string}
                    image={row.image as string}
                    url={`/project/${row.id}`}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">CORRECT ME</StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(row.createdAt as Date)}
                </StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default IDOList;
