import { IoMdClose } from "react-icons/io";
import { Modal } from "../../layaout";
import { CiCirclePlus } from "react-icons/ci";
import React, { useEffect, useState } from "react";
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

  const toggleAddMember = () => {
    setAddMember((prevState) => {
      console.log("Previous state:", prevState);
      const newState = !prevState;
      console.log("New state:", newState);
      return newState;
    });
  };
  return (
    <Modal>
      <div
        className='text-5xl text-primary/60 z-50 cursor-pointer absolute right-4 top-4 duration-700 hover:text-secondary '
        onClick={() => {
          closeModal();
          startToggleModal();
        }}
      >
        <IoMdClose />
      </div>
      <div className='flex flex-col'>
        <div className='text-lg font-poppins '>{activeTeam.name} Members</div>
        <div
          onClick={toggleAddMember}
          className={
            creatingLoading
              ? "btn-primary flex w-fit text-xl  mt-4 p-2 rounded-md cursor-pointer duration-700 font-poppins hover:bg-tertiary hover:text-primary"
              : "btn-secondary flex w-fit text-xl  mt-4 p-2 rounded-md cursor-pointer duration-700 font-poppins"
          }
        >
          Add{" "}
          <i className='text-3xl ml-2 my-auto'>
            <CiCirclePlus />
          </i>
        </div>
        {addMember && <AddMemberModal key={addMember.toString()} closeAddMember={toggleAddMember} />}
        {membersActiveTeam.length ? <MembersTable /> : ""}
      </div>
    </Modal>
  );
};
