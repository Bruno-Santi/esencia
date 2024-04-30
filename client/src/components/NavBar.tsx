import { useContext, useEffect, useRef, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { MenuItem, Menu, IconButton, Avatar } from "@mui/material";
import { SideBar, SideBarContext, SideBarItem } from "../dashboard/components/ui/SideBar";
import { MdOutlineStickyNote2 } from "react-icons/md";

import { useAuthSlice } from "../hooks/useAuthSlice";
import { useDashboard } from "../hooks/useDashboard";
import { useModal, useNavigateTo } from "../hooks";
import { ModalMembers } from "../dashboard/components/ModalMembers";
import { NavBarResponsive } from "./NavBarResponsive";
import { IoPersonOutline, IoMoonOutline, IoClipboardOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLanguage } from "react-icons/md";
import { deepPurple } from "@mui/material/colors";
// import { SideBar } from "./SideBar";
import { GrGroup } from "react-icons/gr";
import { PiDeviceTabletSpeakerBold } from "react-icons/pi";
import { MdOutlineInsertChart } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { toastWarning } from "../helpers/toastWarning";
import { useBoards } from "../teams/hooks/useBoards";
import { logo } from "../assets";
import { TbReportSearch } from "react-icons/tb";

export const NavBar = () => {
  const { longRecommendation } = useDashboard();
  const { handleNavigate } = useNavigateTo();
  const [anchorEl, setAnchorEl] = useState(null);
  const { startLogingOut } = useAuthSlice();
  const { activeTeam, user, startGettingMembers, startToggleModal } = useDashboard();
  const { isOpen, closeModal, openModal } = useModal();
  const { startCleaningBoards } = useBoards();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    console.log(user);

    if (localTheme) {
      setTheme(localTheme);
      if (localTheme === "dark") document.querySelector("html").classList.toggle("dark", true);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, [user]);

  const sideBarRef = useRef(null);
  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.querySelector("html").classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      <div className='lg:hidden md:hidden sm:block sm:z-50'>
        <NavBarResponsive />
      </div>
      <nav className='sm:hidden md:block lg:block flex w-full  relative bg-primary h-20 py-6 justify-around dark:border-b-2 dark:border-gray-600'>
        <div className='absolute top-20 min-h-full  '>
          {" "}
          {/* <SideBar /> */}
          <SideBar className='min-h-screen' ref={sideBarRef}>
            <SideBarItem icon={<GrGroup />} text='Teams' />
            <span onClick={() => handleNavigate("/dashboard")}>
              <SideBarItem icon={<MdOutlineDashboard />} text='Dashboard' />
            </span>
            <span onClick={() => handleNavigate("/teams/boards")}>
              <SideBarItem icon={<PiDeviceTabletSpeakerBold />} text='Tableros' />
            </span>
            <span
              onClick={() => {
                handleNavigate("/dashboard/retro");
              }}
            >
              <SideBarItem icon={<MdOutlineStickyNote2 />} text='Retrospectivas' />
            </span>
            <span onClick={() => handleNavigate("/dashboard/reports")}>
              <SideBarItem icon={<TbReportSearch />} text='Reportes' />
            </span>
            <span>
              <SideBarItem icon={<MdOutlineInsertChart />} text='Assessment' />
            </span>
            <hr />
            <span onClick={() => handleNavigate("/profile")}>
              {" "}
              <SideBarItem icon={<IoSettingsOutline />} text='Ajustes' />
            </span>

            <SideBarItem icon={<CiCircleQuestion />} text="Faq's" />
            <span
              onClick={() => {
                startLogingOut();
                handleClose();
                startCleaningBoards();
              }}
            >
              <SideBarItem icon={<IoLogOutOutline className=' text-secondary dark:text-red-700' />} text='Salir' />
            </span>
          </SideBar>
          <SideBarContext.Provider />
        </div>
        <nav className='lg:flex lg:m-auto md:m-auto lg:relative lg:bottom-3  md:bottom-3 md:relative lg:items-center lg:justify-center md:flex md:items-center m-auto md:justify-center lg:align-middle '>
          <div className=' justify-center items-center ml-4'>
            <img src={logo} onClick={() => handleNavigate("/dashboard")} className='h-14 w-18 cursor-pointer' />
          </div>
          <div className='w-full flex justify-center items-center md:right-8'>
            {activeTeam && (
              <div className='md:right-10 md:relative'>
                <span className='text-tertiary font-poppins mr-4 my-auto text-lg ml-24'>{activeTeam.name}</span>
                <span
                  onClick={() => {
                    openModal();
                    startGettingMembers(activeTeam._id);
                    startToggleModal();
                  }}
                  className='btn-primary rounded-lg p-2 text-lg font-poppins duration-700 hover:bg-tertiary hover:text-primary'
                >
                  Miembros
                </span>
              </div>
            )}

            <div className='flex mt-4  ml-24 border-quaternary  border-2 p-1 rounded-md right-6 -bottom-0 absolute bg-gradient-to-r from-indigo-950 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 '>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${user.avtColor}`}>
                <span className='text-white text-lg text-center'>{user?.name && user.name[0].toUpperCase()}</span>
              </div>
              <div className={`flex flex-col`}>
                <span className='text-tertiary my-auto ml-2 font-poppins text-[16px]'>{user?.name}</span>
                <span className='text-tertiary my-auto ml-2 font-poppins text-[16px]'>{user?.email}</span>
              </div>

              <IconButton className={`text-${anchorEl ? "tertiary" : "secondary"} m-auto text-4xl ml-2 cursor-pointer duration-500`} onClick={handleClick}>
                <IoIosArrowDropdown className='text-tertiary' />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    right: "20px",
                    width: "360px",
                    backgroundColor: `${theme === "dark" ? "#1A1423" : "rgba(255, 255, 255, 1)"}`,
                    marginTop: "10px",
                  },
                }}
                className='bg-black/20'
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.10)",
                    },
                  }}
                >
                  <IoPersonOutline className='mr-2 text-primary dark:text-tertiary' />
                  <span className=' w-full p-2 font-poppins dark:text-tertiary' onClick={() => handleNavigate("/profile")}>
                    Perfil
                  </span>
                </MenuItem>

                <MenuItem
                  onClick={handleChangeTheme}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.10)",
                    },
                  }}
                >
                  <IoMoonOutline className='mr-2 text-primary dark:text-tertiary' />
                  <span className='  p-2 font-poppins dark:text-tertiary'>Tema:</span>
                  {theme === "light" ? (
                    <span className=' dark:text-tertiary' onClick={handleChangeTheme}>
                      Claro
                    </span>
                  ) : (
                    <span onClick={handleChangeTheme} className=' dark:text-tertiary'>
                      Oscuro
                    </span>
                  )}
                </MenuItem>

                <MenuItem
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.10)",
                    },
                  }}
                >
                  <IoLogOutOutline className='mr-2 text-secondary dark:text-red-700' />
                  <span
                    onClick={() => {
                      startLogingOut();
                      handleClose();
                      startCleaningBoards();
                    }}
                    className='p-2 font-poppins text-secondary dark:text-red-700 duration-700 hover:text-primary cursor-pointer'
                  >
                    Salir
                  </span>
                </MenuItem>
              </Menu>
            </div>
          </div>

          {isOpen && <ModalMembers closeModal={closeModal} />}
          <div className={user?.email.length > 20 ? `pr-24 absolute right-72 bottom-6` : `pr-14 absolute right-72 bottom-6`}> </div>
        </nav>
      </nav>
    </>
  );
};
