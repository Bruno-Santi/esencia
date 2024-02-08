import { useEffect, useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

export const UsePaginationTopics = ({ topics, containerRef }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;

  const inicioIndex = (paginaActual - 1) * itemsPorPagina;
  const finIndex = paginaActual * itemsPorPagina;
  const datosPagina = topics.slice(inicioIndex, finIndex);
  useEffect(() => {
    console.log(topics);
    console.log(datosPagina);
  }, [datosPagina]);

  const paginasTotales = Math.ceil(datosPagina.length / itemsPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className='flex flex-col my-auto justify-center place-content-center  text-left dark:bg-gray-900 dark:text-tertiary'>
      {datosPagina.map((item, index) => (
        <div key={index} className='p-3 duration-500 hover:bg-gray-400 dark:hover:bg-gray-300/50 group list-none border-b-2 border-gray-600/20'>
          <div className='flex justify-between'>
            <span className='font-poppins text-left'>{item}</span>
          </div>
        </div>
      ))}
      {datosPagina.length === 0 && <p className='font-poppins mx-auto my-auto flex'>Complete more than 1 survey to get short recommendations</p>}
      <div className='flex mx-auto justify-center mt-2'>
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className={paginaActual !== 1 ? "text-primary dark:text-green-600 animate-pulse text-xl font-bold duration-500 p-2 text-center rounded-md" : "hidden"}
        >
          <RxDoubleArrowLeft />
        </button>

        <button
          className={
            paginaActual !== paginasTotales
              ? "text-primary dark:text-green-600 font-bold p-2 text-xl animate-pulse duration-500 text-center rounded-md"
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
