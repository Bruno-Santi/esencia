import { useEffect, useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

export const UsePagination = ({ shortRecomendation, containerRef }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 1;

  const datosPagina = Object.entries(shortRecomendation).slice((paginaActual - 1) * itemsPorPagina, paginaActual * itemsPorPagina);
  useEffect(() => {
    console.log(shortRecomendation);
  }, []);

  const paginasTotales = Math.ceil(Object.keys(shortRecomendation).length / itemsPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (shortRecomendation === "there are no recommendations")
    return <p className='font-poppins mx-auto my-auto flex'>Complete more than 1 survey to get short recommendation's</p>;
  return (
    <div className='flex flex-col my-auto  justify-center  place-content-center items-center dark:bg-gray-900 dark:text-tertiary'>
      {datosPagina.map(([title, content]) => (
        <div key={title}>
          <h2 className='font-bold font-manrope lg:text-lg md:text-normal w-full text-secondary dark:text-green-600'>{title}:</h2>
          <p className='font-poppins md:text-sm'>{content}</p>
        </div>
      ))}
      <div className='flex mx-auto justify-end   space-x-2 mt-2'>
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className={paginaActual !== 1 ? "text-primary dark:text-green-600 animate-pulse duration-500 text-xl p-2 text-center rounded-md" : "hidden"}
        >
          <RxDoubleArrowLeft />
        </button>

        <button
          className={
            paginaActual !== paginasTotales
              ? "text-primary dark:text-green-600 animate-pulse duration-500 text-xl dark:font-bold p-2 text-center rounded-md"
              : "hidden"
          }
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === paginasTotales}
        >
          <RxDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};
