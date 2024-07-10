import React, { useEffect, useState } from "react";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";
import { useDashboard } from "../../hooks/useDashboard";
import { Cuadrants } from "../components/Cuadrants";
import { DiScrum } from "react-icons/di";
import { useDocumentTitle } from "../../hooks";
import { ModalTeam } from "../components";
import { DashboardLayout } from "../../layaout/DashboardLayout";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const Assessment = () => {
  useDocumentTitle("Assessment | Esencia.app");

  const isDarkTheme = localStorage.getItem("theme") === "dark";
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  const { assessment, activeTeam } = useDashboard();
  console.log(assessment);

  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(true);

  useEffect(() => {}, [isDarkTheme]);

  if (!activeTeam) {
    return (
      <DashboardLayout>
        <div className='flex h-screen justify-center text-3xl font-poppins items-center pb-32 dark:text-tertiary text-primary/60'>Selecciona un equipo</div>
      </DashboardLayout>
    );
  }

  if (!assessment || !Object.keys(assessment).length) {
    return (
      <DashboardLayout>
        <div className='flex h-screen justify-center text-2xl flex-col font-poppins items-center pb-32 dark:text-tertiary text-primary/60'>
          <span>No has generado assessment para este equipo. </span>
          <span className='p-2 rounded-md text-tertiary mt-6 bg-secondary cursor-pointer' onClick={toggleModal}>
            Generar assessment.
          </span>
          {modalOpen && <ModalTeam closeModal={toggleModal} generateAssessment={true} />}
        </div>
      </DashboardLayout>
    );
  }

  const formatText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const [number, ...rest] = line.split(". ");
      return (
        <p key={index} className='font-poppins'>
          <span className='text-secondary'>{number}.</span> {rest.join(". ")}
        </p>
      );
    });
  };

  const newText = assessment ? formatText(assessment.data.recommendations) : null;
  const assessmentData = assessment
    ? {
        labels: ["Resultados", "Metodologia", "Cultura"],
        datasets: [
          {
            label: "Indice de Agilidad",
            data: [
              Math.round(assessment.data?.agileindex[0].Resultados),
              Math.round(assessment.data.agileindex[0].Metodologia),
              Math.round(assessment.data.agileindex[0].Cultura),
            ],
            backgroundColor: "#04a43c80",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
        ],
      }
    : null;

  const chartOptions = {
    scales: {
      r: {
        min: 0,
        max: 100,
        angleLines: { color: "rgba(0, 0, 0, 0.1)" },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        pointLabels: { color: "#301616", fontSize: 14 },
        ticks: { color: "rgba(0, 0, 0, 1)", fontSize: 12 },
      },
    },
  };

  return (
    <DashboardLayout>
      <div className='flex flex-col font-poppins justify-center items-center mt-10 mx-40'>
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
                  <p className='font-poppins'>{assessment.data.analysis}</p>
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* <Accordion expanded={showRecommendations} sx={{ mt: 2 }} className='dark:bg-black dark:text-tertiary'>
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
                <Typography>{newText}</Typography>
              </AccordionDetails>
            </Accordion> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
