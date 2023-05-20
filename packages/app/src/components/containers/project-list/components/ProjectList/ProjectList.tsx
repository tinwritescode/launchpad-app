import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BarLoader } from 'react-spinners';
import { create } from 'zustand';
import { ProjectInfo } from '../IDOList/IDOList.style';
import * as S from './ProjectList.style';
import { api } from '../../../../../utils/api';

const projectListStore = create<{ open: boolean; toggleModal: () => void }>(
  (set) => ({
    open: false,
    toggleModal: () => set((state) => ({ open: !state.open })),
  })
);
const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const _date = `0${d.getDate()}`.slice(-2);
  return `${_date}/${month}/${year}`;
};

const ProjectList = () => {
  const { data, isLoading, error } = api.project.getAll.useQuery({
    offset: 0,
    limit: 10,
  });

  const { open, toggleModal } = projectListStore();

  if (isLoading) {
    return <BarLoader />;
  }
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <S.Container>
      <S.UserInfoCard
        name="User Name"
        role="User Role"
        description="User Description"
        img="https://picsum.photos/200/300"
        link="http://localhost:3000/"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fbe9e7' }}>
              <TableCell align="left">Project Name</TableCell>
              <TableCell align="left">Token</TableCell>
              <TableCell align="center">Create At</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">
                  <ProjectInfo
                    id={row.id as string}
                    name={row.name as string}
                    image={row.image as string}
                    url={`/project/${row.id}`}
                  />
                </TableCell>
                <TableCell align="left">CORRECT ME</TableCell>
                <TableCell align="center">
                  {formatDate(row.createdAt as Date)}
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </S.Container>
  );
};

export default ProjectList;
