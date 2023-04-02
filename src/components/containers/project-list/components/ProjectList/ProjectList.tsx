import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { create } from "zustand";
import { api } from "~/utils/api";
import { Create } from "../../../create-ido";
import { ProjectInfo } from "../IDOList/IDOList.style";
import * as S from "./ProjectList.style";
interface Props {}

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

const ProjectList: React.FC<Props> = () => {
  const { data, isLoading, error } = api.project.getAll.useQuery({
    offset: 0,
    limit: 10,
  });

  const { open, toggleModal } = projectListStore();

  // create modal

  if (isLoading) {
    return <div>Loading...</div>;
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
      <S.TopAction>
        <Button onClick={toggleModal}>Create IDO</Button>
      </S.TopAction>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fbe9e7" }}>
              <TableCell align="left">Project Name</TableCell>
              <TableCell align="left">Token</TableCell>
              <TableCell align="center">Create At</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">
                  <ProjectInfo id={row.id} name={row.name} image={row.image} />
                </TableCell>
                <TableCell align="left">{row.token?.name}</TableCell>
                <TableCell align="center">
                  {formatDate(row.createdAt)}
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <S.TopAction>
        <Button onClick={toggleModal}>Create IDO</Button>
      </S.TopAction>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          p: 4,
          width: "80%",
          marginX: "auto",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            pt: 4,
            pb: 4,
            outline: 0,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
            boxShadow: 24,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              size: "1.5rem",
            }}
          >
            Create IDO
          </Typography>
          <Typography id="modal-modal-description">
            <Create />
          </Typography>
        </Box>
      </Modal>
    </S.Container>
  );
};

export default ProjectList;
