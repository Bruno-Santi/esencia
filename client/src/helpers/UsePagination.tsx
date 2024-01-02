import { useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

export const UsePagination = ({ shortRecomendation, containerRef }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 1;

  const datosPagina = Object.entries(shortRecomendation).slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const paginasTotales = Math.ceil(Object.keys(shortRecomendation).length / itemsPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (shortRecomendation === "there are no recommendations")
    return (
      <p className='font-poppins mx-auto my-auto flex'>Complete more than 1 survey to get short recommendation's</p>
    );
  return (
    <div className='flex flex-col my-auto justify-center place-content-center items-center'>
      {datosPagina.map(([title, content]) => (
        <div key={title}>
          <h2 className='font-bold font-manrope text-lg'>{title}:</h2>
          <p className='font-poppins'>{content}</p>
        </div>
      ))}
      <div className='flex mx-auto justify-center mt-2'>
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className={
            paginaActual !== 1 ? "btn-primary p-2 text-center rounded-md" : "btn-secondary p-2 text-center rounded-md"
          }
        >
          <RxDoubleArrowLeft />
        </button>

        <button
          className={
            paginaActual !== paginasTotales
              ? "btn-primary p-2 text-center rounded-md"
              : "btn-secondary p-2 text-center rounded-md"
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
