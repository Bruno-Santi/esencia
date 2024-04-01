import React from "react";
import { GoMail } from "react-icons/go";
import { AiOutlineGlobal } from "react-icons/ai";
import { logo } from "../assets";
import { useNavigateTo } from "../hooks";

export const Footer = () => {
  const handleEmailClick = () => {
    window.open("mailto:contacto@esencia.com");
  };
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { handleNavigate } = useNavigateTo();
  return (
    <footer className='min-w-screen bg-primary h-fit mt-10 p-6 text-tertiary font-inter'>
      <div className='md:flex-row lg:flex-row sm:flex sm:flex-col-reverse w-4/6 m-auto  pb-8'>
        <section className='lg:flex lg:flex-col sm:space-x-2  md:flex md:flex-col sm:flex sm:items-center sm:justify-center m-auto items-center space-y-4 mt-14 justify-center'>
          <img src={logo} className='lg:w-20 md:w-20 sm:w-12 sm:my-auto' />
          <p className='sm:text-normal sm:my-auto sm:text-sm sm:pb-2'>ESENCIA.APP</p>
        </section>
        <section className='flex lg:justify-around md:justify-around sm:w-2/3 sm:ml-12 lg:w-2/3 sm:justify-center md:pt-16 lg:pt-16 lg:text-[16px] sm:text-xs sm:space-x-8 lg:space-x-20 md:space-x-20  mx-auto'>
          <div className=''>
            <span className='font-bold'>Links</span>
            <ul className='space-y-3 lg:mt-4 md:mt-4 sm:space-y-4 sm:mt-6'>
              <li className='cursor-pointer duration-300 hover:text-secondary' onClick={() => scrollToSection("features")}>
                Features
              </li>
              <li className='cursor-pointer duration-300 hover:text-secondary' onClick={() => scrollToSection("about")}>
                Nosotros
              </li>

              <li className='cursor-pointer duration-300 hover:text-secondary' onClick={() => scrollToSection("pricing")}>
                Precios
              </li>
            </ul>
          </div>
          <div className=''>
            <span className='font-bold'>Compañía </span>
            <ul className='space-y-3 lg:mt-4 md:mt-4 sm:space-y-4 sm:mt-6'>
              <li
                onClick={() => {
                  handleNavigate("/auth/login");
                }}
                className='cursor-pointer duration-300 hover:text-secondary'
              >
                Ingresa
              </li>
              <li
                onClick={() => {
                  handleNavigate("/auth/register");
                }}
                className='cursor-pointer duration-300 hover:text-secondary'
              >
                Registrate
              </li>
              <li className='cursor-pointer duration-300 hover:text-secondary'>FAQ'S</li>
            </ul>
          </div>
          <div>
            <span className='font-bold'>Contáctenos</span>
            <ul className='space-y-3 lg:mt-4 md:mt-4 sm:space-y-4 sm:mt-6'>
              <li className='cursor-pointer duration-300 hover:text-secondary flex items-center gap-2' onClick={handleEmailClick}>
                <GoMail />
                contacto@esencia.com
              </li>
              <li className='cursor-pointer duration-300 hover:text-secondary flex items-center gap-2'>
                <AiOutlineGlobal />
                esencia.app
              </li>
              <li className='cursor-pointer duration-300 hover:text-secondary'></li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
};
