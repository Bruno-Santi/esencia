import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layaout/DashboardLayout";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";
import { useDashboard } from "../../hooks/useDashboard";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
// Define los datos del gráfico

// Componente del gráfico
export const Assessment = () => {
  const isDarkTheme = localStorage.getItem("theme") === "dark";
  const { assessment } = useDashboard();
  console.log(assessment.data);
  const assessmentData = {
    labels: ["Resultados", "Metodologia", "Cultura"],
    datasets: [
      {
        label: ["Indice de Agilidad"],
        data: [assessment.data.agileindex[0].Resultados, assessment.data.agileindex[0].Metodologia, assessment.data.agileindex[0].Cultura],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };
  useEffect(() => {}, [isDarkTheme]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const chartOptions = {
    scales: {
      r: {
        min: 0, // Valor mínimo del eje radial
        max: 100, // Valor máximo del eje radial
        angleLines: {
          color: "rgba(0, 0, 0, 0.1)", // Color de las líneas radiales
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Color de las líneas de la cuadrícula
        },
        pointLabels: {
          color: "#301616",
          fontSize: 14,
        },
        ticks: {
          color: "rgba(0, 0, 0, 1)", // Color de los ticks
          fontSize: 12,
        },
      },
    },
  };
  return (
    <DashboardLayout>
      <div className='flex flex-col font-poppins justify-center items-center mt-10 mx-40'>
        {/* <h1 className='dark:text-tertiary text-xl'>Indice Agil</h1> */}
        <div className='flex w-3/6 mt-10 justify-center space-x-56'>
          <Radar data={assessmentData} options={chartOptions} />

          <div className='flex flex-col min-w-full space-y-12'>
            <Accordion expanded={showAnalysis} sx={{ mt: 2 }}>
              <AccordionSummary onClick={() => setShowAnalysis(!showAnalysis)} expandIcon={<ExpandMoreIcon />}>
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
            <Accordion className='w-full'>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <p className='font-poppins'>Recomendaciones</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p className='font-poppins'>{assessment.data.recommendations}</p>
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
