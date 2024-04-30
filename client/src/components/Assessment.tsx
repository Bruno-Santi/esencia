import React from "react";
import { useNavigateTo } from "../hooks";

export const Assessment = () => {
  const { handleNavigate } = useNavigateTo();
  return (
    <section className='flex flex-col space-y-2 font-inter text-primary lg:mt-20 md:mt-20 sm:mt-10 lg:ml-40 md:ml-20 sm:ml-8 sm:mb-6'>
      <h1 className='lg:text-left font-bold md:text-left sm:text-left lg:text-3xl md:text-2xl  sm:text-3xl   '>
        Agile Assessment <br></br>
        <span className='text-lg font-normal font-poppins sm:text-base '>Descubre el estado de agilidad de tu equipo con nuestro Agile Assessment.</span>
      </h1>
      <span className='text-lg font-poppins w-3/6 lg:w-3/6 sm:w-full sm:text-base'>
        En Esencia, comprendemos la importancia de la agilidad en el éxito de los equipos. Nuestro Agile Assessment es una herramienta poderosa que te permite
        evaluar el nivel de agilidad de tu equipo y obtener recomendaciones personalizadas para mejorar.
      </span>
      <section className='lg:flex lg:flex-row md:flex md:flex-row sm:flex-col lg:justify-center  lg:items-center lg:ml-0 md:justify-between lg:w-5/6 lg:items-center lg:m-auto sm:mt-6 md:mt-16 lg:mt-24'>
        <div className='bg-white lg:flex  lg:mt-6  lg:space-x-6 lg:flex-row lg:items-start shadow-lg shadow-primary/10 lg:h-[570px] p-12 rounded-md font-inter sm:flex-col sm:justify-center sm:m-auto sm:items-center md:w-2/3  lg:w-5/6 sm:w-5/6 space-y-6 lg:ml-8 md:ml-40 '>
          <div className='space-y-6'>
            <h1 className='sm:text-2xl lg:text-xl md:text-2xl font-bold lg:w-6/6 h-[20px] md:w-3/3'>Beneficios:</h1>
            <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal font-poppins'>
              <span className='font-bold text-primary'>Mejora</span> la productividad y la colaboración de tu equipo.
            </p>
            <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal'>
              <span className='font-bold text-primary'>Identifica</span> áreas de mejora y fortalezas en tu enfoque ágil.
            </p>
            <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal'>
              <span className='font-bold text-primary'>Recibe</span> recomendaciones personalizadas para impulsar la efectividad de tu equipo.
            </p>
            <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal'>
              <span className='font-bold text-primary'>Accede</span> a recursos y guías para implementar prácticas ágiles efectivas.{" "}
            </p>
          </div>
          <div className='space-y-6'>
            <h1 className='sm:text-2xl lg:text-xl md:text-2xl font-bold lg:w-6/6 max-h-[120px] md:w-3/3'>¿Qué evaluamos en el Assessment?:</h1>
            <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal font-poppins'>
              ¿El equipo es capaz de generar resultados de valor para el cliente?
            </p>
            <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal'>¿El equipo utiliza as mejores prácticas de la agilidad?</p>
            <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal'>
              ¿El equipo tiene el mindset y cultura necesario para adaptarse a los desafíos del entorno?{" "}
            </p>
            <br></br>{" "}
            <div className='flex flex-col items-center justify-center relative right-36 -bottom-2 text-center'>
              <span className='font-bold font-poppins'>¡Comienza ahora mismo y lleva a tu equipo al siguiente nivel de agilidad! </span> <br></br>
              <span
                onClick={() => {
                  handleNavigate("/auth/login");
                }}
                className='bg-secondary p-2 text-tertiary rounded-md hover:bg-primary duration-300 cursor-pointer mb-2'
              >
                Comienza tu Assessment.
              </span>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-lg shadow-primary/10 p-12  lg:h-[570px] rounded-md font-inter sm:flex-col sm:justify-center sm:m-auto sm:items-center md:w-2/3  lg:w-4/6 sm:w-5/6 space-y-6 lg:ml-12 md:ml-40 '>
          <h1 className='sm:text-2xl lg:text-2xl md:text-2xl font-bold lg:w-6/6 lg:min-h-[0px] md:w-3/3'>
            Como funciona: <br></br>
          </h1>
          <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal'>
            <span className='font-bold text-primary'>Registra tu equipo:</span> Crea tu usuario y equipo para comenzar el camino hacia conocer la agilidad de tu
            equipo.
          </p>
          <p className='lg:w-full md:w-5/6 lg:text-base md:text-lg sm:text-normal'>
            <span className='font-bold text-primary'>Complete el Assessment:</span> Responde a una serie de preguntas diseñadas para evaluar diferentes aspectos
            de la agilidad en tu equipo.
          </p>
          <p className='lg:w-5/6 md:w-5/6 lg:text-base md:text-lg sm:text-normal'>
            <span className='font-bold text-primary'>Recibe tu Reporte de Agilidad:</span> Recibirás un informe detallado que resume los resultados de tu
            evaluación, destacando las áreas de mejora y las fortalezas de tu equipo.
          </p>
          <p className='lg:w-5/6 md:w-5/6 lg:text-base md:text-lg sm:text-normal'>
            <span className='font-bold text-primary'>Revisa Recomendaciones Personalizadas:</span> Basado en tus respuestas, recibirás recomendaciones
            específicas para mejorar la agilidad de tu equipo, junto con recursos útiles para implementar cambios efectivos.
          </p>
        </div>
      </section>
    </section>
  );
};
