import React from "react";
import { illustration1 } from "../assets";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { useNavigateTo } from "../hooks";

export const Home = () => {
  const { handleNavigate } = useNavigateTo();
  const { user } = useAuthSlice();
  const handleRedirect = () => {
    if (!user) handleNavigate("/auth/register");
    handleNavigate("/dashboard");
  };
  return (
    <section className='lg:flex  lg:flex-row md:flex md:flex-row sm:flex-col lg:justify-between md:justify-between min-w-screen sm:mt-6 md:mt-16  lg:mt-24'>
      <div className='font-inter sm:flex-col sm:justify-center sm:m-auto sm:items-center md:w-2/3 lg:w-2/3 sm:w-5/6 space-y-6 lg:ml-40 md:ml-40 '>
        <h1 className=' sm:text-2xl  lg:text-3xl md:text-2xl font-bold lg:w-2/3 md:w-3/3'>Liderazgo ágil, impulsado por la inteligencia artificial.</h1>
        <p className='lg:w-3/6 md:w-5/6 lg:text-lg md:text-lg sm:text-normal'>
          Nuestra plataforma ofrece las herramientas necesarias para guiar a tu equipo hacia su máximo potencial.
        </p>
        <button
          onClick={handleRedirect}
          className='p-2 duration-300 hover:bg-secondary bg-primary rounded-3xl lg:text-lg md:text-lg sm:text-normal text-tertiary'
        >
          Comienza ya!
        </button>
      </div>
      <div className='lg:mr-40 md:mr-40 sm:justify-center sm:items-center sm:flex sm:mt-6 '>
        <img src={illustration1} className='lg:w-5/6 md:w-5/6 sm:w-5/6  items-center' />{" "}
      </div>
    </section>
  );
};
