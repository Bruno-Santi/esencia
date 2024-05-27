import { IoMdClose } from "react-icons/io";
import { Dialog, DialogTitle, IconButton, DialogContent, Box } from "@mui/material";
import { TeamForm } from ".";
import { useDashboard } from "../../hooks/useDashboard";

export const ModalTeam: React.FC<{
  closeModal: () => void;
}> = ({ closeModal, generateAssessment = false }) => {
  const theme = localStorage.getItem("theme");
  const { startToggleModal } = useDashboard();

  const handleClose = () => {
    closeModal();
    startToggleModal();
  };

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth='lg' sx={{ overflowY: "hidden" }}>
      <DialogTitle className='dark:bg-black'>
        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
          <IconButton
            className={`text-5xl ${theme !== "dark" ? `text-primary/60` : `text-tertiary`} z-1 cursor-pointer duration-700 hover:text-secondary `}
            onClick={handleClose}
          >
            <IoMdClose className='dark:text-teal-50 text-secondary' />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className='dark:bg-primary overflow-y-hidden'>
        <div className='flex flex-col dark:bg-primary w-full'>
          <TeamForm closeModal={handleClose} handleClose={handleClose} generateAssessment={generateAssessment} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
