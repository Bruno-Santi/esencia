import { IoMdClose } from "react-icons/io";
import { Dialog, DialogTitle, IconButton, DialogContent, Box } from "@mui/material";
import { TeamForm } from ".";
import { useDashboard } from "../../hooks/useDashboard";

export const ModalTeam: React.FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const { startToggleModal } = useDashboard();
  const theme = localStorage.getItem("theme");
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if ((event.target as HTMLElement).tagName.toLowerCase() !== "div") {
      closeModal();
      startToggleModal();
    }
  };
  return (
    <Dialog open={true} onClose={() => handleClose(e)} fullWidth maxWidth='lg' sx={{ overflowY: "hidden" }}>
      <DialogTitle className='dark:bg-black'>
        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
          <IconButton
            className={`text-5xl ${theme !== "dark" ? `text-primary/60` : `text-tertiary`} z-1 cursor-pointer duration-700 hover:text-secondary `}
            onClick={() => {
              closeModal();
              startToggleModal();
            }}
          >
            {/* <IoMdClose className='dark:text-teal-50 text-secondary' /> */}
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className='dark:bg-black overflow-y-hidden'>
        <div className='flex flex-col dark:bg-black w-full'>
          <TeamForm closeModal={closeModal} handleClose={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
