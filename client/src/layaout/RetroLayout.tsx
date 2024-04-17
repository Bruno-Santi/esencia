import React from "react";
import { LayoutProps } from "../interface/index";
import { logo } from "../assets";

export const RetroLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='w-full h-fit bg-primary'>
      <img src={logo} className=' w-1/6 md:w-[80px] lg:w-[80px]  left-12 top-4 absolute m-auto animate-pulse duration-700' alt='esencia.app logo' />
      <div className='flex flex-col'>
        <h4 className='text-tertiary font-normal tracking-tighter flex mt-6 md:text-2xl lg:text-5xl font-poppins mx-auto'>¡Bienvenido!</h4>
        <p className='text-center font-poppins font-extralight md:text-base lg:text-xl w-2/3 justify-center mx-auto mt-6 text-tertiary'>
          Fuiste invitado a participar en una <span className='text-secondary font-normal'>Esencia</span> retro.
        </p>
      </div>

      {children}
    </div>
  );
};
