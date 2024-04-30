import React from "react";

export const WhyUs = () => {
  return (
    <section className='lg:flex lg:flex-row md:flex sm:space-y-4 md:flex-row sm:flex-col lg:justify-center md:justify-between lg:w-5/6 md:w-screen lg:items-center lg:m-auto sm:mt-6 md:mt-16 lg:mt-24'>
      <div className='bg-white shadow-lg shadow-primary/10 lg:min-h-[570px] md:h-[750px] lg:p-12 md:p-8 sm:p-6 rounded-md font-inter sm:flex-col sm:justify-center sm:m-auto sm:items-center md:w-6/6  lg:w-2/6 sm:w-5/6 space-y-6 lg:ml-12 md:ml-20 '>
        <h1 className='sm:text-lg lg:text-2xl md:text-lg font-bold lg:w-6/6 max-h-[120px]  md:w-3/3'>
          Descubre el poder de Esencia: <br></br>{" "}
          <span className='font-normal lg:text-xl sm:text-base  md:text-base font-poppins'> Mejora la productividad y la colaboración de tu equipo.</span>{" "}
        </h1>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal font-poppins'>
          - <span className='font-bold text-primary'>Optimiza</span> la gestión diaria del equipo y reduce el tiempo dedicado a tareas administrativas.
        </p>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - <span className='font-bold text-primary'>Impulsa</span> la productividad y la eficiencia operativa mediante la automatización de procesos Scrum.
        </p>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - <span className='font-bold text-primary'>Ofrece</span> una visión holística del desempeño del equipo, facilitando la identificación de áreas de
          mejora y oportunidades de crecimiento.
        </p>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - <span className='font-bold text-primary'>Proporciona</span> insights accionables y recomendaciones basadas en datos para tomar decisiones informadas
          y estratégicas.{" "}
        </p>
      </div>
      <div className='bg-white shadow-lg shadow-primary/10 p-12 md:min-h-[750px] lg:h-[570px]lg:p-12 md:p-8 sm:p-6 lg:h-[570px] rounded-md font-inter sm:flex-col sm:justify-center sm:m-auto sm:items-center md:w-5/6  lg:w-2/6 sm:w-5/6 space-y-6 lg:ml-12 md:ml-20 '>
        <h1 className='sm:text-lg lg:text-2xl md:text-xl font-bold lg:w-6/6 lg:min-h-[120px] md:w-3/3'>
          Domina la agilidad: <br></br>
          <span className='font-normal lg:text-lg md:text-base font-poppins sm:text-base'>
            Nos basamos en las mejores prácticas de la industria para crear una herramienta transformadora.
          </span>{" "}
        </h1>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - Guiado por los principios ágiles, <span className='font-bold text-primary md:text-base'>Esencia</span> es una herramienta esencial para líderes
          comprometidos con el éxito y agilidad real de sus equipos.{" "}
        </p>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - Diseñada para <span className='font-bold text-primary'>Product Owners</span>, <span className='font-bold text-primary'>Scrum Masters</span> y{" "}
          <span className='font-bold text-primary'>líderes de equipo</span> que buscan maximizar el potencial y alcanzar resultados excepcionales.{" "}
        </p>
        <p className='lg:w-5/6 md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - Proporciona una plataforma integral para monitorear y mejorar el rendimiento del equipo, fomentando la colaboración, la transparencia y la
          innovación.{" "}
        </p>
      </div>
      <div className='bg-white shadow-lg shadow-primary/10 sm:p-6 p-12 rounded-md lg:h-[570px] md:min-h-[750px] lg:p-12 md:p-8  font-inter sm:flex-col sm:justify-center sm:m-auto sm:items-center md:w-6/6  lg:w-2/6 sm:w-5/6 space-y-6 lg:ml-12 md:ml-20 '>
        <h1 className='sm:text-lg lg:text-2xl md:text-xl font-bold lg:w-5/6 md:w-3/3 lg:max-h-[120px] md:max-h-[120px]'>¿Para quién está pensada?</h1>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - Para <span className='font-bold text-primary'>Product Managers</span>, ofrece una solución integral para la planificación, ejecución y entrega de
          productos, maximizando el valor para el cliente.{" "}
        </p>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - Para <span className='font-bold text-primary'>Product Owners</span>, simplifica la gestión del backlog y la priorización de tareas, asegurando que
          se cumplan los objetivos del negocio.{" "}
        </p>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - Para <span className='font-bold text-primary'>Scrum Masters</span>, descrube un set de herramientas para facilitar la implementación y mejora
          continua de prácticas ágiles, promoviendo un entorno de trabajo colaborativo y centrado en el resultado.{" "}
        </p>
        <p className='lg:w-full md:w-5/6 lg:text-base md:text-base sm:text-normal'>
          - Para <span className='font-bold text-primary text-base'>Developers</span>, proporciona herramientas intuitivas y visuales para gestionar tareas,
          colaborar con el equipo y alcanzar los objetivos del sprint de manera eficiente.{" "}
        </p>
      </div>
    </section>
  );
};
