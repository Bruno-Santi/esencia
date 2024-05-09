import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layaout/DashboardLayout";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";
import { useDashboard } from "../../hooks/useDashboard";
import { Cuadrants } from "../components/Cuadrants";
import { DiScrum } from "react-icons/di";
import { useDocumentTitle } from "../../hooks";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
// Define los datos del gráfico

// Componente del gráfico
export const Assessment = () => {
  useDocumentTitle("Assessment | Esencia.app");
  const isDarkTheme = localStorage.getItem("theme") === "dark";
  const { assessment } = useDashboard();

  function formatText(text) {
    // Dividir el texto en un array de líneas
    const lines = text.split("\n");
    // Mapear cada línea para dividirla en número y texto
    const formattedLines = lines.map((line, index) => {
      const parts = line.split(". ");
      const number = parts[0];
      const restOfText = parts.slice(1).join(". "); // Unir el resto del texto con puntos
      return (
        <p key={index} className='font-poppins'>
          <span className='text-secondary'>{number}.</span> {restOfText}
        </p>
      );
    });
    // Retornar el array de líneas formateadas
    return formattedLines;
  }
  let newText;
  if (assessment) {
    newText = formatText(assessment.data.recommendations);
  }
  const formattedText = formatText(assessment.data.recommendations);
  console.log(formattedText);
  console.log(assessment);
  let assessmentData;
  if (assessment) {
    assessmentData = {
      labels: ["Resultados", "Metodologia", "Cultura"],
      datasets: [
        {
          label: ["Indice de Agilidad"], // Elimina esta línea si no la necesitas
          data: [
            Math.round(assessment.data?.agileindex[0].Resultados),
            Math.round(assessment.data.agileindex[0].Metodologia),
            Math.round(assessment.data.agileindex[0].Cultura),
          ],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
        },
      ],
    };
  }
  useEffect(() => {}, [assessment]);
  useEffect(() => {}, [isDarkTheme]);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const chartOptions = {
    scales: {
      r: {
        min: 0,
        max: 100,
        angleLines: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        pointLabels: {
          color: "#301616",
          fontSize: 14,
        },
        ticks: {
          color: "rgba(0, 0, 0, 1)",
          fontSize: 12,
        },
      },
    },
  };
  if (!Object.keys(assessment.data).length) {
    return (
      <DashboardLayout>
        <p className='flex text-3xl justify-center items-center text-primary/60 mt-72'>Selecciona un equipo</p>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      {/* {!Object.keys(assessment.data).length && <p>Selecciona un equipo</p>} */}
      <div className='flex flex-col font-poppins justify-center items-center mt-10 mx-40'>
        {/* <h1 className='dark:text-tertiary text-xl'>Indice Agil</h1> */}
        <div className='w-fit bg-secondary rounded-md shadow-lg shadow-primary/60 text-tertiary'>
          <Cuadrants icon={<DiScrum />} label={"Indice de Agilidad"} value={assessment.data.agileindex[0].AgileIndex} color={"#00000"} />
        </div>
        <div className='flex w-3/6 mt-10 justify-center space-x-56'>
          <Radar data={assessmentData} options={chartOptions} />

          <div className='flex flex-col min-w-full space-y-12'>
            <Accordion expanded={showAnalysis} sx={{ mt: 2 }} className='dark:bg-black dark:text-tertiary'>
              <AccordionSummary
                onClick={() => setShowAnalysis(!showAnalysis)}
                className='dark:text-tertiary'
                expandIcon={<ExpandMoreIcon className='dark:text-tertiary' />}
              >
                <Typography>
                  <p className='font-poppins'>Análisis</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {" "}
                  <p className='font-poppins'>{assessment.data.analysis}</p>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={showRecommendations} sx={{ mt: 2 }} className='dark:bg-black dark:text-tertiary'>
              <AccordionSummary
                onClick={() => setShowRecommendations(!showRecommendations)}
                className='dark:text-tertiary'
                expandIcon={<ExpandMoreIcon className='dark:text-tertiary' />}
              >
                <Typography>
                  <p className='font-poppins'>Recomendaciones</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p className='font-poppins'>{newText}</p>
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* <button className='mt-10 p-2 bg-secondary rounded-md w-2/3 m-auto text-tertiary hover:bg-primary duration-300'>Generar nuevo Assessment</button> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
