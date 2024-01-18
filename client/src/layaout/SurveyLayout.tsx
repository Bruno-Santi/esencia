import React from "react";
import { LayoutProps } from "../interface/index";
import { logo } from "../assets";

export const SurveyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='w-full lg:min-h-screen md:min-h-screen bg-primary bg-contain sm:min-h-screen'>
      <img
        src={logo}
        className=' w-1/6 md:w-[60px] lg:w-[80px] sm:top-5 sm:left-5 lg:left-12 md:left-12 lg:top-12 md:top-12 absolute m-auto animate-pulse duration-700'
        alt='esencia.ai logo'
      />
      <div className='flex flex-col sm:pt-10'>
        <h4 className='text-tertiary font-normal tracking-tighter flex mt-20 md:text-3xl lg:text-5xl sm:text-2xl font-poppins mx-auto'>
          Bienvenido!
        </h4>
        <p className='text-center font-poppins font-extralight md:text-base lg:text-xl lg:w-2/3 md:w-2/3 sm:w-full justify-center mx-auto mt-4 text-tertiary'>
          Muchas gracias por tomarte unos minutos para contestar esta encuesta,{" "}
          <span className='text-secondary font-normal'>tu feedback es muy valioso para nosotros</span>.
        </p>
      </div>

      {children}
    </div>
  );
};
