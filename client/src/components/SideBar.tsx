import { CiCirclePlus } from "react-icons/ci";
import { Teams } from "../dashboard/components/Teams";
import { useModal } from "../hooks";
import { ModalTeam } from "../dashboard/components/ModalTeam";
import { useDashboard } from "../hooks/useDashboard";

export const SideBar = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { startToggleModal } = useDashboard();
  return (
    <div className='static sm:hidden md:block lg:block'>
      <section className='fixed top-0 left-0 w-16 bg-quaternary h-full '>
        <div className='flex flex-col h-full'>
          <span className='text-tertiary font-poppins  text-md mx-auto mt-4'>Teams</span>
          <div className='w-40 justify-center '>
            <Teams />
          </div>
          <CiCirclePlus
            onClick={() => {
              openModal();
              startToggleModal();
            }}
            className='text-tertiary w-12 h-12 mx-auto fixed left-2 bottom-5 cursor-pointer hover:text-secondary duration-700'
          />
          <div>{isOpen && <ModalTeam closeModal={closeModal} />}</div>
        </div>
      </section>
    </div>
  );
};
