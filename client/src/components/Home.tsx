import React, { useState } from "react";
import { illustration1 } from "../assets";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { useNavigateTo } from "../hooks";
import { TextField } from "@mui/material";
import { Button } from "@mui/base";
import { IoIosSend } from "react-icons/io";
import api from "../helpers/apiToken";
import { toastSuccess, toastWarning } from "../helpers";

export const Home = () => {
  const { handleNavigate } = useNavigateTo();
  const { user } = useAuthSlice();
  const [email, setEmail] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const [emailError, setEmailError] = useState("");
  // const handleRedirect = () => {
  //   if (!user) handleNavigate("/auth/register");
  //   handleNavigate("/dashboard");
  // };

  const enviarCorreo = async () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "" || !pattern.test(email)) {
      setEmailError("Por favor ingresa un correo válido.");
      return;
    }
    setEmailError("");
    setLoadingSend(true);
    try {
      const resp = await api.post(`/api/email`, { subjectEmail: email });
      console.log(resp);

      toastSuccess("Email enviado correctamente. En breve nos pondremos en contacto.");
      setEmail("");
      setLoadingSend(false);
    } catch (error) {
      console.log(error);
      toastWarning(error.message);
      setLoadingSend(false);
    }
  };
  return (
    <section className='lg:flex  lg:flex-row md:flex md:flex-row sm:flex-col lg:justify-between md:justify-between min-w-screen sm:mt-6 md:mt-16  lg:mt-24'>
      <div className='font-inter sm:flex-col sm:justify-center sm:m-auto sm:items-center md:w-2/3 lg:w-2/3 sm:w-5/6 space-y-6 lg:ml-40 md:ml-40 '>
        <h1 className=' sm:text-2xl  lg:text-3xl md:text-2xl font-bold lg:w-2/3 md:w-3/3'>Liderazgo ágil, impulsado por la inteligencia artificial.</h1>
        <p className='lg:w-3/6 md:w-5/6 lg:text-lg md:text-lg sm:text-normal'>
          Nuestra plataforma ofrece las herramientas necesarias para guiar a tu equipo hacia su máximo potencial.
        </p>
        <button
          onClick={() => handleNavigate("/faqs")}
          className='p-2 duration-300 hover:bg-secondary bg-primary rounded-3xl lg:text-lg md:text-lg sm:text-normal text-tertiary'
        >
          Conocer más.
        </button>
        <br></br>
        <div className='flex flex-col'>
          <div className='mb-6 relative'>
            <label htmlFor='default-input' className='block mb-6 font-poppins bg-secondary text-tertiary p-1 rounded-md w-fit'>
              En este momento nos encontramos en etapa Beta; <br></br> Si te interesa participar de nuestro programa beta deja tu email aquí:
            </label>
            <div className='relative'>
              <input
                type='text'
                id='default-input'
                placeholder='Tu correo aquí'
                value={email}
                disabled={loadingSend}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-1/3 p-2.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <span
                onClick={loadingSend ? null : enviarCorreo}
                className={`absolute top-2 left-72 cursor-pointer hover:text-primary duration-300 ${loadingSend ? "text-gray-500" : "text-secondary"}`}
              >
                <IoIosSend className='w-6 h-6' />
              </span>
            </div>
          </div>
          {emailError && <span className='font-poppins text-red-500 text-sm'>{emailError}</span>}
        </div>
      </div>

      <div className='lg:mr-40 md:mr-40 sm:justify-center sm:items-center sm:flex sm:mt-6 '>
        <img src={illustration1} className='lg:w-5/6 md:w-5/6 sm:w-5/6  items-center' />{" "}
      </div>
    </section>
  );
};
