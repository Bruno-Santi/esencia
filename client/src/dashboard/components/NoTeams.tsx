import { PiSmileySadLight } from "react-icons/pi";

import useModal from "../../hooks/useModal";

import { ModalTeam } from "./ModalTeam";

export const NoTeams = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className='flex flex-col justify-center mx-auto text-3xl w-2/4 font-light text-center pt-48 text-primary/70 font-poppins dark:text-tertiary'>
      <div className='mx-auto justify-center flex flex-col mb-8 space-y-4'>
        <div className='mx-auto '>Nada por aquí...</div>
        <div className='mx-auto'>
          <PiSmileySadLight className='text-8xl' />
        </div>
      </div>
      <div className='mx-auto mb-8 dark:text-tertiary'>Parece que aún no has creado un equipo. ¿Qué tal si das ese paso ahora? </div>
      <div className='mx-auto'>
        <button onClick={() => openModal("createTeam")} className='btn-primary p-4 rounded-lg text-2xl  duration-700 hover:text-primary hover:bg-tertiary'>
          Crear un equipo.
        </button>
      </div>
      <div>{isOpen && <ModalTeam closeModal={closeModal} />}</div>
    </div>
  );
};
