import { IoMdClose, IoMdArrowDropdown } from "react-icons/io";
import { ModalMembers, TeamList, Teams } from "../dashboard/components";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDashboard } from "../hooks/useDashboard";
import { FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { useModal } from "../hooks";

export const NavBarResponsive = () => {
  const { user, activeTeam, startGettingMembers, startToggleModal } = useDashboard();
  const { openModal, closeModal, isOpen } = useModal();
  const [toggleSideBar, setToggleSideBar] = useState(false);

  function dropdown() {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector(".arrow").classList.toggle("-rotate-0");
  }

  function handleToggle() {
    setToggleSideBar(!toggleSideBar);
  }
  return (
    <div className='sm:flex  sm:h-16 sm:w-screen bg-primary font-poppins my-auto items-center'>
      <span class=' text-white text-4xl ml-4 my-auto cursor-pointer' onClick={handleToggle}>
        <i class='text-secondary my-auto m-auto mb-2 '>
          <HiOutlineMenuAlt2 />
        </i>
      </span>
      {activeTeam ? (
        <>
          <span className='text-tertiary font-poppins mr-4 my-auto text-xs'>{activeTeam.name}</span>
          <span
            onClick={() => {
              openModal();
              startGettingMembers(activeTeam.id);
              startToggleModal();
            }}
            className='btn-primary rounded-lg p-1 h-fit text-sm font-poppins duration-700 hover:bg-tertiary hover:text-primary'
          >
            Members
          </span>{" "}
        </>
      ) : (
        <></>
      )}
      {isOpen && <ModalMembers closeModal={closeModal} />}
      <div
        className={
          !toggleSideBar
            ? " fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 animate__animated animate__fadeOutLeft animate__faster "
            : " fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 animate__animated animate__fadeInLeft animate__fast "
        }
      >
        <div class='text-gray-100 text-xl'>
          <div class='p-2.5 mt-1 flex items-center'>
            <i class=''>
              <FaRegCircleUser />
            </i>
            <h1 class='font-bold text-gray-200 text-lg ml-3'>{user?.first_name}</h1>
            <i class='cursor-pointer text-3xl ml-28 lg:hidden' onClick={handleToggle}>
              <IoMdClose />
            </i>
          </div>
          <div class='my-2 bg-gray-600 h-[1px]'></div>
        </div>

        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
          <i class='bi bi-house-door-fill'></i>
          <span class='text-[15px] ml-4 text-gray-200 font-bold'>Create Team</span>
        </div>
        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-secondary hover:text-primary text-white'>
          <span class='text-[15px] ml-4 text-gray-200 font-bold'>My teams</span>
          <i onClick={dropdown} class='text-tertiary text-3xl arrow -rotate-90 '>
            <IoMdArrowDropdown id='arrow' />
          </i>
        </div>
        <div class='text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold' id='submenu'>
          <Teams />
        </div>
        <div class='my-4 bg-gray-600 h-[1px]'></div>

        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
          <i class='bi bi-box-arrow-in-right'></i>
          <span class='text-[15px] ml-4 text-gray-200 font-bold'>Logout</span>
        </div>
      </div>
    </div>
  );
};
