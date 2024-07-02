import React, { useEffect, useRef, useState } from "react";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Button, IconButton, Tooltip, Typography, Container, Grid, Paper, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Charts } from "./Charts";
import { LineCharts } from "./LineCharts";
import { useDashboard } from "../../hooks/useDashboard";
import { DataCollectionReport } from "./DataCollectionReport";
import { useNavigateTo, useModal } from "../../hooks";
import { BoardReport, ModalMembers, TrendingTopics } from ".";
import { toastSuccess } from "../../helpers/toastSuccess";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { TaskTable } from "./TaskTable";
import { UsePagination } from "../../helpers/UsePagination";
import api from "../../helpers/apiToken";

export const DashboardUi = () => {
  const { user } = useAuthSlice();
  const { isOpen, closeModal, openModal } = useModal();
  const {
    startCreatingSurvey,
    linesMetrics,
    surveyLoading,
    activeTeam,
    metricsForToday,
    shortRecomendation,
    startSettingTeams,
    modalOpen,
    buttonGetData,
    dataLoading,
    longRecommendation,
    cards,
    task,
    startCleaningActiveTeam,
    userTeams,
    startGettingMembers,
    startToggleModal,
  } = useDashboard();
  const handleCancelTeam = () => {
    toast.warning(`Action cancelled`);
  };

  const isAdmin = activeTeam?.members?.some((member) => member.id === user.id && member.role === "admin");
  console.log(isAdmin);

  const handleAcceptTeam = async (teamId) => {
    try {
      const response = await api.delete(`/api/team/${teamId}`);
      if (response) {
        toast.success(`Equipo eliminado 👌`);
        await startCleaningActiveTeam();
        await startSettingTeams();
      }
    } catch (error) {
      toast.error(`Error while deleting board`);
    }
  };

  const startDeletingTeam = (teamId) => {
    toast.info(
      <div className='flex flex-col'>
        <Typography variant='body1' className='font-poppins mb-2'>
          ¿Estás seguro de eliminar este equipo?
        </Typography>
        <div className='flex space-x-2'>
          <Button variant='outlined' color='secondary' onClick={handleCancelTeam} className='w-2/3'>
            ❌
          </Button>
          <Button variant='contained' color='primary' onClick={() => handleAcceptTeam(teamId)} className='w-2/3'>
            ✅
          </Button>
        </div>
      </div>
    );
  };

  const { handleNavigate } = useNavigateTo();
  const containerRef = useRef();

  const englishToSpanish = {
    Backlog: "Pendientes",
    "In Progress": "En Progreso",
    "In Review": "En Revisión",
    Finished: "Finalizados",
  };

  const handleNavigateToFeedBack = () => {
    if (Object.entries(longRecommendation).length > 0 === false) return;
    handleNavigate("/dashboard/feedback");
  };

  useEffect(() => {
    console.log(dataLoading);
  }, []);

  const handleVote = () => {
    toastSuccess("Thanks for your feedback! 🤗");
  };

  return (
    <Container maxWidth='false' className='mt-4'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataCollectionReport />
        </Grid>
        {isAdmin && (
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography variant='h7' sx={{ color: "#3cba5e" }} className='font-bold'>
                  Acciones Disponibles
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} className='mt-4'>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        backgroundColor: "#3cba5e",
                        "&:hover": {
                          backgroundColor: "#31a851", // Color que quieres para el hover
                        },
                      }}
                      onClick={() => buttonGetData(activeTeam._id, activeTeam.sprint, true)}
                      disabled={dataLoading}
                    >
                      {dataLoading ? "Loading..." : "Actualizar datos"}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        backgroundColor: "#3cba5e",
                        "&:hover": {
                          backgroundColor: "#31a851", // Color que quieres para el hover
                        },
                      }}
                      onClick={() => startCreatingSurvey(activeTeam.name, activeTeam._id)}
                      disabled={surveyLoading}
                    >
                      Encuesta de pulso
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        backgroundColor: "#3cba5e",
                        "&:hover": {
                          backgroundColor: "#31a851", // Color que quieres para el hover
                        },
                      }}
                      onClick={() => handleNavigate("/dashboard/retro")}
                      disabled={surveyLoading}
                    >
                      Retrospectivas
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        backgroundColor: "#3cba5e",
                        "&:hover": {
                          backgroundColor: "#31a851", // Color que quieres para el hover
                        },
                      }}
                      onClick={() => {
                        openModal();
                        startGettingMembers(activeTeam._id);
                        startToggleModal();
                      }}
                      disabled={surveyLoading}
                    >
                      Miembros
                    </Button>
                    {isOpen && <ModalMembers closeModal={closeModal} />}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        backgroundColor: "#f47200",
                        "&:hover": {
                          backgroundColor: "#ce6509", // Color que quieres para el hover
                        },
                      }}
                      onClick={() => startDeletingTeam(activeTeam._id)}
                      disabled={surveyLoading}
                    >
                      Eliminar equipo
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className='p-4 h-full'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography variant='h6' sx={{ color: "#3cba5e" }} className='font-bold'>
                Indicador clave de equipo
              </Typography>
              <Tooltip
                title='
                "Indicador clave de equipo" se refiere a una medida importante utilizada para evaluar el rendimiento y la salud de un equipo. Estas métricas ayudan a los líderes a entender cómo está funcionando el equipo y guían las acciones para mejorar su eficiencia y colaboración.'
                arrow
              >
                <IconButton sx={{ color: "#3cba5e" }}>
                  <CiCircleQuestion />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
              {Object.keys(metricsForToday).length > 0 ? (
                <Charts />
              ) : (
                <Typography variant='body1' color='textSecondary'>
                  Sin datos, intenta primero con una encuesta de pulso.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} className='p-4 h-full'>
            <Typography variant='h6' sx={{ color: "#3cba5e" }} className='font-bold'>
              Reporte Global del Equipo
            </Typography>
            <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
              {Object.keys(linesMetrics).length > 0 ? (
                <LineCharts />
              ) : (
                <Typography variant='body1' color='textSecondary'>
                  Sin datos, intenta primero con una encuesta de pulso.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} className='p-4 h-full'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography variant='h6' sx={{ color: "#3cba5e" }} className='font-bold'>
                Recomendaciones Generales
              </Typography>
              <Tooltip
                title='
                Las Recomendaciones Generales resumen los datos recopilados de las encuestas diarias y ofrecen recomendaciones concretas y útiles. Estas recomendaciones están diseñadas para ayudar al equipo a tomar medidas específicas y efectivas para abordar áreas de mejora identificadas en las encuestas.'
                arrow
              >
                <IconButton sx={{ color: "#3cba5e" }}>
                  <CiCircleQuestion />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
              {shortRecomendation !== "There is not enought data." ? (
                <UsePagination shortRecommendation={shortRecomendation} containerRef={containerRef} />
              ) : (
                <Typography variant='body1' color='textSecondary'>
                  Sin datos, intenta primero con una encuesta de pulso.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} className='p-4 h-full'>
            <Typography variant='h6' sx={{ color: "#3cba5e" }} className='font-bold'>
              Tareas
            </Typography>
            {task && <TaskTable tasks={task} />}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} className='p-4 h-full'>
            <Typography variant='h6' sx={{ color: "#3cba5e" }} className='font-bold'>
              Temas de Tendencia
              <Tooltip
                title='Las Tendencias resumen los temas destacados en los comentarios durante las retrospectivas, proporcionando una visión general de los aspectos más discutidos por el equipo. Estos datos ayudan a identificar áreas clave de enfoque para mejorar la colaboración y el desempeño del equipo.'
                arrow
              >
                <IconButton sx={{ color: "#3cba5e" }}>
                  <CiCircleQuestion />
                </IconButton>
              </Tooltip>
            </Typography>

            <TrendingTopics />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
