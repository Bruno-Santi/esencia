import { logo } from "../assets";
import { slide as Menu } from "react-burger-menu";
import { useNavigateTo } from "../hooks";
import { useDashboard } from "../hooks/useDashboard";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import { Button, Popper, ClickAwayListener } from "@mui/base";
import * as React from "react";
import { Grow, MenuList } from "@mui/material";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { Divider } from "./Divider";
import { useNavigate } from "react-router-dom";

export const NavLanding = () => {
  const { startLogingOut } = useAuthSlice();
  const { user } = useDashboard();
  const { handleNavigate } = useNavigateTo();
  const [navBar, setNavBar] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();

  const handleMenuClick = (sectionId: string) => {
    // Verifica si la ruta actual es diferente de "/"
    if (window.location.pathname !== "/") {
      // Navega a "/" y luego hace scroll hasta la sección correspondiente después de un segundo
      navigate("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    } else {
      // Si ya estamos en la página principal, simplemente hace scroll hasta la sección correspondiente
      scrollToSection(sectionId);
    }
  };
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleNavBar = () => setNavBar(!navBar);
  return (
    <div>
      <nav className='min-w-full  bg-primary text-lg h-[90px] text-tertiary font-poppins flex items-center justify-between'>
        <div className='lg:ml-8 md:ml-20 sm:ml-8 object-contain flex lg:items-center'>
          <img src={logo} className='lg:w-16 lg:h-16 md:h-12 md:w-12 sm:w-12' alt='Logo' />
          <div className='flex flex-col -space-y-2'>
            <span className='ml-4 select-none lg:flex lg:items-center md:flex md:items-center md:text-[16px]  sm:hidden'>ESENCIA.APP</span>
            <span className='italic ml-4 text-sm text-secondary select-none'>Beta</span>
          </div>
          <div onClick={handleNavBar} className='text-tertiary absolute right-6 md:hidden lg:hidden sm:block sm:cursor-pointer'>
            {!navBar ? <IoMenu className='w-10 h-10' /> : <IoCloseOutline className='w-12 h-12 right-4 text-green-500' />}
          </div>
        </div>
        <div
          className={`space-x-10  md:flex md:text-[16px] md:items-center md:justify-center md:ml-48 sm:hidden lg:flex lg:items-center lg:justify-center ${
            user ? "lg:ml-16 md:mr-48" : "lg:ml-48 md:mr-10"
          } `}
        >
          <span className='relative duration-300 hover:text-secondary cursor-pointer' onClick={() => handleMenuClick("assessment")}>
            Assessment
            <span className='absolute -top-2 right-0 text-yellow-500 text-xs font-bold'>¡Nuevo!</span>
          </span>
          <span className='duration-300 hover:text-secondary cursor-pointer' onClick={() => handleMenuClick("features")}>
            Features
          </span>

          <span className='duration-300 hover:text-secondary cursor-pointer' onClick={() => handleMenuClick("about")}>
            Nosotros
          </span>
          {/* <span className='duration-300 hover:text-secondary cursor-pointer' onClick={() => scrollToSection("pricing")}>
            Precios
          </span> */}
          <span className='duration-300 hover:text-secondary cursor-pointer' onClick={() => handleNavigate("/faqs")}>
            Faq's
          </span>
        </div>
        <div className='space-x-5 mr-16  md:block lg:block sm:hidden'>
          {!user ? (
            <>
              <span onClick={() => handleNavigate("/auth/login")} className='duration-300 md:text-[16px]  hover:text-secondary cursor-pointer'>
                Ingresa
              </span>
              <span
                onClick={() => handleNavigate("/auth/register")}
                className='duration-300 md:text-[16px]  hover:text-secondary md:w-[10px] font-bold cursor-pointer'
              >
                {/* Comienza la prueba gratuita */}
                Registrate
              </span>
            </>
          ) : (
            <>
              <Button
                ref={anchorRef}
                id='composition-button'
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
              >
                <div className={`${user.avtColor} rounded-full w-12 h-12 flex items-center justify-center`}>
                  <span className='text-tertiary'>{user.name[0]}</span>
                </div>
              </Button>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement='bottom-start' transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id='composition-menu' aria-labelledby='composition-button'>
                          <MenuItem
                            onClick={(e) => {
                              handleClose(e);
                              handleNavigate("/dashboard");
                            }}
                          >
                            Dashboard
                          </MenuItem>

                          <MenuItem
                            onClick={(e) => {
                              handleClose(e);
                              startLogingOut();
                            }}
                          >
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </div>
        <section
          className={`lg:hidden md:hidden sm:${navBar ? "block" : "hidden"} sm:min-w-full sm:top-20 sm:flex sm:items-center sm:z-auto sm:absolute bg-primary`}
        >
          <ul className='text-tertiary space-y-4 font-inter ml-8 mt-6 mb-6 w-full'>
            <li
              className='cursor-pointer duration-300 hover:text-green-400'
              onClick={() => {
                scrollToSection("features");
                handleNavBar();
              }}
            >
              Features
            </li>
            <li
              className='cursor-pointer duration-300 hover:text-green-400'
              onClick={() => {
                scrollToSection("about");
                handleNavBar();
              }}
            >
              Nosotros
            </li>
            {/* <li
              className='cursor-pointer duration-300 hover:text-green-400'
              onClick={() => {
                scrollToSection("pricing");
                handleNavBar();
              }}
            >
              Precios
            </li> */}
            {user ? (
              <>
                <hr className='w-1/3 text-green-400 border-green-400'></hr>

                <li className='cursor-pointer duration-300 hover:text-green-400'>Dashboard</li>
                <li onClick={startLogingOut} className=' text-red-400 cursor-pointer duration-300 hover:text-tertiary'>
                  Salir
                </li>
              </>
            ) : (
              <>
                <hr className='w-1/3 text-green-400 border-green-400'></hr>
                <li onClick={() => handleNavigate("/auth/login")} className='cursor-pointer duration-300 hover:text-green-400'>
                  Ingresar
                </li>
                <li onClick={() => handleNavigate("/auth/register")} className='cursor-pointer duration-300 hover:text-green-400 font-bold'>
                  Comenzar prueba gratuita
                </li>
              </>
            )}
          </ul>
        </section>
      </nav>
    </div>
  );
};
