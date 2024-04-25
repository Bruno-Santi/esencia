import { useEffect, useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

export const UsePagination = ({ shortRecommendation, containerRef }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 1; // Define cuántos elementos quieres mostrar por página
  console.log(shortRecommendation);

  useEffect(() => {
    console.log(shortRecommendation);
  }, []);
  if (shortRecommendation === "There is not enough data.")
    return (
      <>
        <p className='lg:text-xl md:text-lg  text-primary/50  inset-0 text-center font-normal font-poppins dark:text-tertiary'>
          Sin datos, intenta primero con una encuesta de pulso.
        </p>
      </>
    );
  const paginasTotales = Math.ceil((shortRecommendation.length - 1) / itemsPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const inicio = (paginaActual - 1) * itemsPorPagina + 1;
  const fin = inicio + itemsPorPagina;
  const datosPagina = shortRecommendation?.slice(inicio, fin);

  return (
    <div className='flex flex-col my-auto justify-center place-content-center items-center dark:bg-gray-900 dark:text-tertiary'>
      {datosPagina?.map((recomendacion, index) => (
        <div key={index} className='my-4'>
          <h2 className='font-bold font-manrope text-lg text-secondary dark:text-green-600'>{recomendacion.title}</h2>
          <p className='font-poppins text-sm'>{recomendacion.content}</p>
        </div>
      ))}
      <div className='flex mx-auto justify-end space-x-2 mt-2'>
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className={paginaActual !== 1 ? "text-primary dark:text-green-600 animate-pulse duration-500 text-xl p-2 text-center rounded-md" : "hidden"}
        >
          <RxDoubleArrowLeft />
        </button>

        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === paginasTotales}
          className={
            paginaActual !== paginasTotales ? "text-primary dark:text-green-600 animate-pulse duration-500 text-xl p-2 text-center rounded-md" : "hidden"
          }
        >
          <RxDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};
