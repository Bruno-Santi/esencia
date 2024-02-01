import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from "@mui/material";
import { MembersTable } from "./MembersTable";
import { useDashboard } from "../../hooks/useDashboard";
import { AddMemberModal } from "./AddMemberModal";
import { useAuthSlice } from "../../hooks/useAuthSlice";

export const ModalMembers: React.FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const { creatingLoading } = useAuthSlice();
  const { membersActiveTeam, activeTeam, startToggleModal } = useDashboard();
  const [addMember, setAddMember] = useState(false);
  const theme = localStorage.getItem("theme");

  const toggleAddMember = () => {
    setAddMember((prevState) => !prevState);
  };

  return (
    <Dialog open={true} onClose={() => closeModal()} fullWidth maxWidth='md' className='bg-black/30'>
      <DialogTitle className='dark:bg-gradient-to-br dark:from-zinc-900 font-poppins dark:to-gray-800 dark:border-b-2  '>
        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
          <IconButton
            className={`text-5xl ${theme !== "dark" ? `text-primary/60` : `text-tertiary`} z-1 cursor-pointer duration-700 hover:text-secondary `}
            onClick={() => {
              closeModal();
              startToggleModal();
            }}
          >
            <IoMdClose className='dark:text-teal-50' />
          </IconButton>
        </Box>
        <div className={theme === "dark" ? "text-lg font-poppins text-tertiary" : "text-lg font-poppins text-primary"}>{activeTeam.name} Members</div>
      </DialogTitle>
      <DialogContent className='dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800  dark:text-tertiary'>
        <div className='flex flex-col'>
          <div
            onClick={toggleAddMember}
            className={`${
              creatingLoading ? "btn-secondary" : "btn-primary"
            } flex w-fit text-xl  mt-4 p-2 rounded-md cursor-pointer duration-700 font-poppins hover:bg-tertiary hover:text-primary`}
          >
            Add{" "}
            <i className='text-3xl ml-2 my-auto '>
              <CiCirclePlus />
            </i>
          </div>
          {addMember && <AddMemberModal key={addMember.toString()} closeAddMember={toggleAddMember} />}
          {membersActiveTeam.length ? <MembersTable /> : ""}
        </div>
      </DialogContent>
    </Dialog>
  );
};
