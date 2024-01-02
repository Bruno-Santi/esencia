import { FaRegUserCircle } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { useDashboard } from "../hooks/useDashboard";
import { useModal } from "../hooks";
import { ModalMembers } from "../dashboard/components/ModalMembers";
import { NavBarResponsive } from "./NavBarResponsive";

export const NavBar = () => {
  const { startLogingOut } = useAuthSlice();
  const { activeTeam, user, startGettingMembers, startToggleModal } = useDashboard();
  const { isOpen, closeModal, openModal } = useModal();
  return (
    <>
      <div className='lg:hidden md:hidden sm:block'>
        <NavBarResponsive />
      </div>
      <nav className='sm:hidden md:block lg:block flex w-full  sticky bg-primary h-16  justify-around '>
        <div className='w-full flex justify-between items-center'>
          <div className='flex mt-2 ml-24'>
            <FaRegUserCircle className='text-tertiary h-12 w-12 -mx-2 mr-1' />
            <span className='text-tertiary my-auto  ml-2 font-poppins text-lg'>
              {user?.first_name} {user?.last_name}
            </span>
          </div>
          {activeTeam && (
            <div className=''>
              <span className='text-tertiary font-poppins mr-4 my-auto text-lg'>{activeTeam.name}</span>
              <span
                onClick={() => {
                  openModal("activeTeam");
                  startGettingMembers(activeTeam.id);
                  startToggleModal();
                }}
                className='btn-primary rounded-lg p-2 text-lg font-poppins duration-700 hover:bg-tertiary hover:text-primary'
              >
                Members
              </span>
            </div>
          )}
          <div
            onClick={() => startLogingOut()}
            className='flex btn-secondary p-2 rounded-lg font-poppins mr-4 w-fit hover:bg-secondary hover:text-tertiary duration-700'
          >
            <button className='text-md '>Log Out</button>
            <RxExit className='font-thin ml-2  my-auto h-4 w-4' />
          </div>
        </div>
        {isOpen && <ModalMembers closeModal={closeModal} />}
      </nav>
    </>
  );
};
