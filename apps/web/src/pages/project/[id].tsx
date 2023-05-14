import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IDODetail } from "../../components/containers/ido-details/components";
import PageLayout from "../../components/templates/PageLayout";
import { api } from "../../utils/api";

type Props = {};

// function IDODetail({}: Props) {
//   const { isAdmin } = useIsAdmin();
//   return (
//     <PageLayout>
//       <Stack spacing={2}>
//         <TopDetailInfo />
//         <MiddleDetailInfo />
//         <ProjectSummary />
//       </Stack>
//       {isAdmin && <AdminSpeedDial />}
//     </PageLayout>
//   );
// }

const IDO = (props: Props) => {
  return (
    <>
      <PageLayout>
        <IDODetail />
      </PageLayout>
    </>
  );
};

export default IDO;

const AdminSpeedDial = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: markProjectAsDeposited } =
    api.project.divideTokenForProjectContracts.useMutation();
  const router = useRouter();
  const { id } = router?.query;

  return (
    <>
      <SpeedDial
        ariaLabel="Admin speed dial"
        icon={<AdminPanelSettings />}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
      >
        {/* Mark project as deposited */}
        <SpeedDialAction
          icon={<CheckCircleIcon />}
          tooltipTitle="Mark as deposited"
          onClick={() => setOpen(true)}
        />
      </SpeedDial>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Mark as deposited</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this project as deposited?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              toast.promise(
                markProjectAsDeposited({ projectId: id as string }),
                {
                  loading: "Marking project as deposited...",
                  success: (e) => {
                    return e.transactionHash;
                  },
                  error: (e) => {
                    return e?.message
                      ? `Error: ${e.message}`
                      : `Fail to mark project as deposited`;
                  },
                }
              );
              setOpen(false);
            }}
          >
            Confirm
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
