import { IoMdClose } from "react-icons/io";
import { Modal } from "../../layaout";
import React from "react";
import { TeamForm } from ".";
import { useDashboard } from "../../hooks/useDashboard";

export const ModalTeam: React.FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const { startToggleModal } = useDashboard();
  return (
    <Modal>
      <div
        className='text-4xl text-primary/60 cursor-pointer absolute right-4 top-4 duration-700 hover:text-secondary '
        onClick={() => {
          closeModal();
          startToggleModal();
        }}
      >
        <IoMdClose />
      </div>
      <div className='flex flex-col'>
        <TeamForm closeModal={closeModal} />
      </div>
    </Modal>
  );
};
