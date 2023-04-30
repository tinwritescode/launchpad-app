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
    offset: 0,
    limit: 10,
  });

  if (isLoading) {
    return <BarLoader />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
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
  );
};

export default IDOList;
