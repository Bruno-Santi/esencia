import React from "react";
import { GoMail } from "react-icons/go";
import { AiOutlineGlobal } from "react-icons/ai";
import { logo } from "../assets";

export const Footer = () => {
  return (
    <footer className='min-w-screen bg-primary h-fit mt-10 p-6 text-tertiary font-inter'>
      <div className='flex w-4/6 m-auto  pb-8'>
        <section className='flex flex-col m-auto items-center space-y-4 mt-14 justify-center'>
          <img src={logo} className='w-20' />
          <p>ESENCIA.APP</p>
        </section>
        <section className='flex justify-around pt-16 space-x-20 mx-auto'>
          <div>
            <span className='font-bold'>Quick Links</span>
            <ul className='space-y-2 mt-2'>
              <li className='cursor-pointer duration-300 hover:text-secondary'>About</li>
              <li className='cursor-pointer duration-300 hover:text-secondary'>Features</li>
              <li className='cursor-pointer duration-300 hover:text-secondary'>Pricing</li>
            </ul>
          </div>
          <div>
            <span className='font-bold'>Company</span>
            <ul className='space-y-2 mt-2'>
              <li className='cursor-pointer duration-300 hover:text-secondary'>Login</li>
              <li className='cursor-pointer duration-300 hover:text-secondary'>Sign Up</li>
              <li className='cursor-pointer duration-300 hover:text-secondary'>FAQ'S</li>
            </ul>
          </div>
          <div>
            <span className='font-bold'>Get in touch</span>
            <ul className='space-y-2 mt-2'>
              <li className='cursor-pointer duration-300 hover:text-secondary flex items-center gap-2'>
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
