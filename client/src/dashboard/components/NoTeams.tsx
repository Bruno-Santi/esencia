import { PiSmileySadLight } from "react-icons/pi";
import useModal from "../../hooks/useModal";
import { ModalTeam } from "./ModalTeam";
import { useDashboard } from "../../hooks/useDashboard";
import { useEffect, useState } from "react";
import { fi } from "date-fns/locale";
import { DashboardUi } from "./DashboardUi";

export const NoTeams = () => {
  const { userTeams, activeTeam } = useDashboard();
  const { isOpen, openModal, closeModal } = useModal();
  const [isOpenModal, setIsOpenModal] = useState(true);
  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const firstLogging = localStorage.getItem("firstLoggin");
  console.log(firstLogging);
  console.log(activeTeam);

  return (
    <div className='flex flex-col justify-center mx-auto text-3xl w-2/4 font-light text-center pt-48 text-primary/70 font-poppins dark:text-tertiary'>
      {firstLogging != 1 && <ModalTeam closeModal={toggleModal} />}

      <div className='mx-auto justify-center flex flex-col mb-8 space-y-6'>
        <div className='mx-auto space-y-6'>
          {userTeams ? (
            <p>Selecciona un equipo</p>
          ) : (
            <>
              <p>Parece que aún no tienes equipos. Empieza con uno.</p>{" "}
              <button onClick={toggleModal} className='btn-primary p-4 rounded-lg text-2xl  duration-700 hover:text-primary hover:bg-tertiary'>
                Empezar.
              </button>
            </>
          )}
        </div>
        {/* <div>{isOpenModal && <ModalTeam closeModal={toggleModal} />}</div> */}
      </div>
    </div>
  );
};
