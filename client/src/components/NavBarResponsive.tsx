import { IoMdClose, IoMdArrowDropdown } from "react-icons/io";
import { ModalMembers, TeamList, Teams } from "../dashboard/components";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDashboard } from "../hooks/useDashboard";
import { FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { useModal, useNavigateTo } from "../hooks";
import { useAuthSlice } from "../hooks/useAuthSlice";

export const NavBarResponsive = () => {
  const { user, activeTeam, startGettingMembers, startToggleModal } = useDashboard();
  const { openModal, closeModal, isOpen } = useModal();
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const { handleNavigate } = useNavigateTo();
  function dropdown() {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector(".arrow").classList.toggle("-rotate-0");
  }

  function handleToggle() {
    setToggleSideBar(!toggleSideBar);
  }
  return (
    <div className='sm:flex  sm:h-16 sm:w-screen bg-primary font-poppins my-auto items-center z-10'>
      <span class=' text-white text-4xl ml-4 my-auto cursor-pointer' onClick={handleToggle}>
        <i class='text-secondary my-auto m-auto mb-2 '>
          <HiOutlineMenuAlt2 />
        </i>
      </span>
      {activeTeam ? (
        <div className='flex-row items-center w-full justify-center text-center'>
          <span className='text-tertiary font-poppins mr-4 my-auto text-sm '>{activeTeam.name}</span>
          <span
            onClick={() => {
              openModal();
              startGettingMembers(activeTeam._id);
              startToggleModal();
            }}
            className='btn-primary rounded-lg p-1 h-fit text-sm font-poppins duration-700 hover:bg-tertiary hover:text-primary'
          >
            Miembros
          </span>{" "}
        </div>
      ) : (
        <></>
      )}
      {isOpen && <ModalMembers closeModal={closeModal} />}
      <div
        className={
          !toggleSideBar
            ? "z-50 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 animate__animated animate__fadeOutLeft animate__faster "
            : "z-50 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 animate__animated animate__fadeInLeft animate__fast "
        }
      >
        <div class='text-gray-100 text-xl'>
          <div class='p-2.5 mt-1 flex items-center'>
            <div className={`${user.avtColor} rounded-full h-8 w-8 flex items-center justify-center`}>
              <span className='text-tertiary'>{user.name[0]}</span>
            </div>
            <span className='ml-2'>{user.name}</span>
            <h1 class='font-bold text-gray-200 text-lg ml-3'>{user?.first_name}</h1>
            <i class='cursor-pointer text-3xl ml-28 lg:hidden' onClick={handleToggle}>
              <IoMdClose />
            </i>
          </div>
          <div class='my-2 bg-gray-600 h-[1px]'></div>
        </div>
        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
          <i class='bi bi-box-arrow-in-right'></i>
          <span class='text-[15px] ml-4 text-gray-200 font-bold' onClick={() => handleNavigate("/dashboard")}>
            Dashboard
          </span>
        </div>
        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
          <i class='bi bi-box-arrow-in-right'></i>
          <span class='text-[15px] ml-4 text-gray-200 font-bold'>Retrospectivas</span>
        </div>
        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
          <i class='bi bi-box-arrow-in-right'></i>
          <span class='text-[15px] ml-4 text-gray-200 font-bold' onClick={() => handleNavigate("/teams/boards")}>
            Tableros
          </span>
        </div>
        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
          <i class='bi bi-house-door-fill'></i>
          <span class='text-[15px] ml-4 text-gray-200 font-bold'>Crear equipo</span>
        </div>
        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-secondary hover:text-primary text-white'>
          <span class='text-[15px] ml-4 text-gray-200 font-bold'>Mis equipos</span>
          <i onClick={dropdown} class='text-tertiary text-3xl arrow -rotate-90 '>
            <IoMdArrowDropdown id='arrow' />
          </i>
        </div>
        <div
          className='text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold hidden' // Añade la clase 'hidden'
          id='submenu'
        >
          <Teams />
        </div>
        <div class='my-4 bg-gray-600 h-[1px]'></div>
        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
          <i class='bi bi-box-arrow-in-right'></i>
          <span class='text-[15px] ml-4 text-gray-200 font-bold text-tertiary' onClick={() => handleNavigate("/profile")}>
            Perfíl
          </span>
        </div>
        <div class='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
          <i class='bi bi-box-arrow-in-right'></i>
          <span class='text-[15px] ml-4 text-gray-200 font-bold text-secondary'>Salir</span>
        </div>
      </div>
    </div>
  );
};
