import React from "react";
import { LayoutProps } from "../interface/index";
import { logo } from "../assets";

export const SurveyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='w-full h-screen bg-primary'>
      <img
        src={logo}
        className=' w-1/6 md:w-[80px] lg:w-[80px]  left-12 top-12 absolute m-auto animate-pulse duration-700'
        alt='esencia.ai logo'
      />
      <div className='flex flex-col'>
        <h4 className='text-tertiary font-normal tracking-tighter flex mt-20 md:text-2xl lg:text-5xl font-poppins mx-auto'>
          Bienvenido!
        </h4>
        <p className='text-center font-poppins font-extralight md:text-base lg:text-xl w-2/3 justify-center mx-auto mt-6 text-tertiary'>
          Muchas gracias por tomarte unos minutos para contestar esta encuesta,{" "}
          <span className='text-secondary font-normal'>tu feedback es muy valioso para nosotros</span>.
        </p>
      </div>

      {children}
    </div>
  );
};
