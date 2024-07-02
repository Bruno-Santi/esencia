import React, { useEffect, useState } from "react";
import { IconButton, ListItem, ListItemText, Box } from "@mui/material";
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

  const paginasTotales = Math.ceil(topics.length / itemsPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Box>
      {datosPagina.map((item, index) => (
        <ListItem key={index} divider>
          <ListItemText primary={item} />
        </ListItem>
      ))}
      {datosPagina.length === 0 && (
        <ListItem>
          <ListItemText primary='Completa al menos una encuesta para obtener datos.' />
        </ListItem>
      )}
      <Box display='flex' justifyContent='center' mt={2}>
        <IconButton onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          <RxDoubleArrowLeft />
        </IconButton>
        <IconButton onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === paginasTotales}>
          <RxDoubleArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
};
