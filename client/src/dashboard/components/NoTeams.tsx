import { PiSmileySadLight } from "react-icons/pi";

import useModal from "../../hooks/useModal";

import { ModalTeam } from "./ModalTeam";

export const NoTeams = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className='flex flex-col justify-center mx-auto text-3xl w-2/4 font-light text-center pt-48 text-primary/70 font-poppins'>
      <div className='mx-auto justify-center flex flex-col mb-8 space-y-4'>
        <div className='mx-auto '>Nothing here...</div>
        <div className='mx-auto'>
          <PiSmileySadLight className='text-8xl' />
        </div>
      </div>
      <div className='mx-auto mb-8'>
        It seems that you haven't created a team yet! What if you take that step
        now and set the foundation for collaborative success?
      </div>
      <div className='mx-auto'>
        <button
          onClick={() => openModal("createTeam")}
          className='btn-primary p-4 rounded-lg text-2xl  duration-700 hover:text-primary hover:bg-tertiary'
        >
          Create a team
        </button>
      </div>
      <div>{isOpen && <ModalTeam closeModal={closeModal} />}</div>
    </div>
  );
};
