import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type CustomProjectInfoProps = {
  id: string;
  name: string;
  image: string;
};

type Project = {
  id: string;
  status: string;
  name: string;
  image: string;
  createdAt: Date;
  upDatedAt: Date;
  token?: any;
};

type ProjectListProps = {
  data: Project[];
};

const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const _date = `0${d.getDate()}`.slice(-2);
  return `${_date}/${month}/${year}`;
};
export const ProjectInfo = function (props: CustomProjectInfoProps) {
  return (
    <a href={"asdas"}>
      <div style={{ display: "flex", color: "black", alignItems: "center" }}>
        <StyledImage src={props.image} />
        <p>{props.name}</p>
      </div>
    </a>
  );
};

export const ProjectList = function ({ data }: ProjectListProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#fbe9e7" }}>
            <TableCell align='left'>Project Name</TableCell>
            <TableCell align='left'>Token</TableCell>
            <TableCell align='center'>Create At</TableCell>
            <TableCell align='center'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.name}>
              <TableCell align='left'>
                <ProjectInfo id={row.id} name={row.name} image={row.image} />
              </TableCell>
              <TableCell align='left'>{row.token?.name}</TableCell>
              <TableCell align='center'>{formatDate(row.createdAt)}</TableCell>
              <TableCell align='center'>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;
