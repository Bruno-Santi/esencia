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

export const NavLanding = () => {
  const { startLogingOut } = useAuthSlice();
  const { user } = useDashboard();
  const { handleNavigate } = useNavigateTo();

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

  return (
    <div>
      <nav className='min-w-full bg-primary text-lg h-[90px] text-tertiary font-poppins flex items-center justify-between'>
        <div className='ml-20 object-contain flex items-center'>
          <img src={logo} className='w-16 h-16' alt='Logo' />
          <span className='ml-4 select-none'>ESENCIA.APP</span>
        </div>
        <div className='ml-20 space-x-10 md:block lg:block sm:hidden'>
          <span className='duration-300 hover:text-secondary cursor-pointer'>Nosotros</span>
          <span className='duration-300 hover:text-secondary cursor-pointer'>Features</span>
          <span className='duration-300 hover:text-secondary cursor-pointer'>Precios</span>
        </div>
        <div className='space-x-5 mr-20  md:block lg:block sm:hidden'>
          {!user ? (
            <>
              <span onClick={() => handleNavigate("/auth/login")} className='duration-300 hover:text-secondary cursor-pointer'>
                Ingresa
              </span>
              <span onClick={() => handleNavigate("/auth/register")} className='duration-300 hover:text-secondary md:w-[10px] font-bold cursor-pointer'>
                Comienza la prueba gratuita
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
      </nav>
    </div>
  );
};
