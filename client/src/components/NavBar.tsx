import { useAuthSlice } from "../hooks/useAuthSlice";
import { useDashboard } from "../hooks/useDashboard";
import { useModal } from "../hooks";
import { ModalMembers } from "../dashboard/components/ModalMembers";
import { NavBarResponsive } from "./NavBarResponsive";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
import avatar from "../assets/avatarnav2.png";
import { ThemeChange } from "./ThemeChange";
export const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const { startLogingOut } = useAuthSlice();
  const { activeTeam, user, startGettingMembers, startToggleModal } = useDashboard();
  const { isOpen, closeModal, openModal } = useModal();
  return (
    <>
      <div className='lg:hidden md:hidden sm:block'>
        <NavBarResponsive />
      </div>
      <nav className='sm:hidden md:block lg:block flex w-full  sticky bg-primary h-20 py-6 justify-around dark:border-b-2 dark:border-gray-600'>
        <div className='w-full flex justify-center items-center'>
          {activeTeam && (
            <div className=''>
              <span className='text-tertiary font-poppins mr-4 my-auto text-lg'>{activeTeam.name}</span>
              <span
                onClick={() => {
                  openModal();
                  startGettingMembers(activeTeam._id);

                  startToggleModal();
                }}
                className='btn-primary rounded-lg p-2 text-lg font-poppins duration-700 hover:bg-tertiary hover:text-primary'
              >
                Members
              </span>
            </div>
          )}

          <div className='flex mt-2 ml-24 border-quaternary  border-2 p-1 rounded-md right-4 bottom-3 absolute bg-gradient-to-r from-indigo-950 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 '>
            <img src={avatar} alt='avatar' className='h-12 w-12 rounded-full border-white border-2' />
            {/* <FaRegUserCircle className='text-tertiary h-12 w-12 mr-1' /> */}
            <div className='flex flex-col'>
              <span className='text-tertiary my-auto ml-2 font-poppins text-[16px]'>{user?.name}</span>
              <span className='text-tertiary my-auto ml-2 font-poppins text-[16px]'>{user?.email}</span>
            </div>

            <a
              className={`text-${isDropdownOpen ? "tertiary" : "secondary"} m-auto text-4xl ml-2 cursor-pointer duration-500  -rotate-${
                isDropdownOpen ? "90" : "0"
              }`}
              onClick={toggleDropdown}
            >
              <IoIosArrowDropdown />
            </a>
          </div>

          {isDropdownOpen && (
            <div className='absolute z-40 top-20 right-4 bg-white border border-tertiary p-2 rounded-md dark:bg-black dark:border-none'>
              <div
                onClick={() => {
                  startLogingOut();
                  closeDropdown();
                }}
                className='btn-primary p-2  rounded-lg font-poppins w-fit hover:bg-tertiary hover:text-primary duration-700 cursor-pointer'
              >
                <span className='text-md '>Log Out</span>
              </div>
            </div>
          )}
        </div>
        {isOpen && <ModalMembers closeModal={closeModal} />}
        <div className='absolute right-72 bottom-6'>
          {" "}
          <ThemeChange />
        </div>
      </nav>
    </>
  );
};
