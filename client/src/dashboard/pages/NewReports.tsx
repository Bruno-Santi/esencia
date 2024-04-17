import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { Cuadrants } from "../components/Cuadrants";
import { FaHome, FaSmile, FaTools, FaUsers } from "react-icons/fa";
import { MdOutlineSelfImprovement } from "react-icons/md";
import { AccordionDetails, CircularProgress, Divider, Grid } from "@mui/material";
import { BoardReport, RetroResume } from "../components";
import { LineChart } from "@mui/x-charts";
import { LineCharts } from "../components/LineCharts";
import { useDashboard } from "../../hooks/useDashboard";
import { ReportAccordion } from "../../components/ReportAccordion";
import { LineChartReport } from "../../components/LineChartReport";
import { TaskTable } from "../components/TaskTable";
import { useDocumentTitle } from "../../hooks";

import moment from "moment";

export const NewReports = () => {
  useDocumentTitle("Reportes | Esencia.app");
  const { longRecommendation, loadingReports, activeReport, startGettingReports, activeTeam } = useDashboard();
  console.log(longRecommendation);

  const [backlogValue, setBacklogValue] = useState(0);
  const [inProgressValue, setInProgressValue] = useState(0);
  const [inReviewValue, setInReviewValue] = useState(0);
  const [finishedValue, setFinishedValue] = useState(0);
  const [analysisLines, setAnalysisLines] = useState("");
  const [selectedTab, setSelectedTab] = useState("worst");

  const formatDate = (date) => {
    console.log(date);

    const newDate = moment(date);
    newDate.add(1, "days"); // Agregar 1 día a la fecha
    const formattedDate = newDate.format("DD/MM/YYYY");
    console.log(formattedDate);

    return formattedDate;
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  // useEffect(() => {
  //   assignValues();
  // }, [longRecommendation]);
  useEffect(() => {
    assignValues();
  }, [activeReport]);
  const formatSurveyAnswers = (surveyAnswers) => {
    const formattedAnswers = Object.entries(surveyAnswers).map(([question, value]) => {
      const numericValue = typeof value === "number" ? value : parseFloat(value);

      const type = numericValue <= 0.5 ? "worst" : "best";

      return {
        _id: question,
        average_value: numericValue,
        type: type,
      };
    });

    return formattedAnswers;
  };
  let formattedSurveyAnswers;
  if (activeReport.length) formattedSurveyAnswers = formatSurveyAnswers(activeReport[0]?.survey_answers);

  const handleGetReports = async (e) => {
    e.preventDefault();
    await startGettingReports(activeTeam._id, activeTeam.sprint);
  };
  const recommendations = activeReport[0]?.recommendations;

  const formattedRecommendations = recommendations?.split(/\d+\./).filter((item) => item.trim() !== "");

  const formattedRetrospective = activeReport[0]?.retrospective.map((retro) => {
    const parts = retro.split(", ");

    const question = parts[0].replace("?", "");
    const response = parts[1];

    const thumb_up = parseInt(parts[2].split(": ")[1]);
    const thumb_down = parseInt(parts[3].split(": ")[1]);

    return {
      content: question,
      note: response,
      thumb_up: thumb_up,
      thumb_down: thumb_down,
    };
  });
  console.log(formattedRetrospective);

  const assignValues = () => {
    if (longRecommendation) {
      const analysisLines = activeReport[0]?.analysis.split("\n");
      setAnalysisLines(analysisLines);
      const tasks = activeReport[0]?.tasks; // Obtener el objeto tasks directamente

      const inProgressValue = tasks ? tasks["In Progress"] || 0 : 0;
      console.log("In Progress:", inProgressValue);
      setInProgressValue(inProgressValue);

      const inReviewValue = tasks ? tasks["In Review"] || 0 : 0;
      console.log("In Review:", inReviewValue);
      setInReviewValue(inReviewValue);

      const finishedValue = tasks ? tasks["Finished"] || 0 : 0;
      console.log("Finished:", finishedValue);
      setFinishedValue(finishedValue);

      const backlogValue = tasks ? tasks["Backlog"] || 0 : 0;
      console.log("Backlog:", backlogValue);
      setBacklogValue(backlogValue);
    }
  };
  console.log(activeReport.length);

  return (
    <DashboardLayout>
      {!activeReport.length ? (
        <div className='flex-col items-center flex justify-center mt-4'>
          {" "}
          <ReportAccordion reports={longRecommendation} />{" "}
          <div className='mt-64'>
            <h1 className='font-poppins text-4xl text-primary/60'>Selecciona un reporte</h1>
          </div>
        </div>
      ) : (
        <>
          <div className='font-poppins flex justify-center mt-4 items-center '>
            <ReportAccordion reports={longRecommendation} />

            <button className={`btn-primary p-2 rounded-md ml-2`} disabled={loadingReports} onClick={(e) => handleGetReports(e)}>
              {loadingReports ? (
                <span className='w-4 h-4 flex items-center justify-center'>
                  {" "}
                  <CircularProgress color='success' style={{ width: "1em", height: "1em" }} />
                </span>
              ) : (
                "Actualizar datos"
              )}
            </button>
          </div>
          <div className='flex items-center justify-center font-poppins mt-6 mr-32 '>
            {!activeReport[0].startDate.length ? "" : `${formatDate(activeReport[0].startDate)} - ${formatDate(activeReport[0].endDate)}`}
          </div>
          <Grid
            container
            spacing={0}
            justifyContent='left'
            alignItems='center'
            ml={{ xs: 0, lg: 0 }}
            className='mb-20 gap-y-2 items-center lg:space-x-6 md:space-x-6 lg:mt-6'
          >
            <Grid item xs={12} lg={3}>
              <div className='flex space-x-0 lg:ml-10 md:ml-10 gap-2 mb-20 font-poppins text-primary '>
                <BoardReport title='Planificados' value={backlogValue} />
                <BoardReport title='En proceso' value={inProgressValue} />
                <BoardReport title='En revisión' value={inReviewValue} />
                <BoardReport title='Completados' value={finishedValue} />
              </div>
            </Grid>
            <Grid item xs={12} lg={8}>
              <div className='flex ml-48  text-center sm:flex sm:flex-col md:flex-row lg:flex-row '>
                {/* <Cuadrants
                  icon={<FaSmile />}
                  label='Satisfacción General'
                  value={Math.round(activeReport[0]?.differences[0] * 100)}
                  color='bg-[#8136c2]'
                />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */}
                <Cuadrants
                  icon={<MdOutlineSelfImprovement />}
                  label='Satisfacción Personal'
                  value={Math.round(activeReport[0]?.cuadrants_difference[0] * 100)}
                  color='bg-[#FF6384]'
                />
                <Cuadrants
                  icon={<FaUsers />}
                  label='Colaboracion en Equipo'
                  value={Math.round(activeReport[0]?.cuadrants_difference[1] * 100)}
                  color='bg-[#36A2EB]'
                />
                <Cuadrants
                  icon={<FaTools />}
                  label='Compromiso Laboral'
                  value={Math.round(activeReport[0]?.cuadrants_difference[2] * 100)}
                  color='bg-[#ebb734]'
                />
                <Cuadrants
                  icon={<FaHome />}
                  label='Bienestar en el espacio de trabajo'
                  value={Math.round(activeReport[0]?.cuadrants_difference[3] * 100)}
                  color='bg-[#5a2f80]'
                />
              </div>
            </Grid>
            <Grid item xs={12} lg={3}>
              <span className=''>
                {" "}
                <TaskTable tasks={activeReport[0]?.GoalStatus} />
              </span>
            </Grid>
            <Grid item xs={12} lg={8} className='lg:pl-36 md:pl-36 pr-6'>
              <div className=''>
                {" "}
                <LineChartReport data={activeReport[0].line_graphs} height='20em' />
              </div>
            </Grid>

            <Grid item xs={12} lg={6}>
              <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 text-primary h-[250px] font-poppins p-2 overflow-hidden relative'>
                <div className=' h-full '>
                  <div className='p-2 text-lg'>Recomendaciones.</div>
                  <Divider className='py-2 ' />
                  <div className='mt-6 px-4 pb-4 overflow-y-scroll absolute top-14 left-0 right-0 bottom-0'>
                    <ul>
                      {formattedRecommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation.trim()}</li>
                      ))}
                    </ul>
                  </div>{" "}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={5}>
              <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 text-primary h-[250px] font-poppins p-2 overflow-hidden relative'>
                <div className=' h-full '>
                  <div className='p-2 text-lg'>Análisis de conocimiento.</div>
                  <Divider className='py-2 ' />

                  <div className='mt-6 px-4  pb-4 overflow-y-scroll absolute top-14 left-0 right-0 bottom-0'>{activeReport[0].analysis}</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={6} className=''>
              <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 text-primary font-poppins p-2 h-[250px] overflow-hidden relative'>
                <div className=' h-full'>
                  <div className='flex flex-col'>
                    <span className='p-2 text-lg'>Preguntas realizadas en este sprint.</span>
                    <span className='italic text-sm font-light px-2 font-poppins'>Pregunta / Resultado</span>
                  </div>

                  <Divider className='py-2' />
                  <div className='mt-8 px-2 overflow-y-scroll absolute top-14 left-0 right-0 bottom-0'>
                    {!Object.keys(activeReport[0].survey_answers).length <= 0 ? (
                      <div>
                        <div className='mt-2'>
                          <button
                            className={`px-4 py-2 rounded-l ${selectedTab === "worst" ? "bg-secondary text-white" : "bg-gray-200"}`}
                            onClick={() => handleTabChange("worst")}
                          >
                            Peores
                          </button>
                          <button
                            className={`px-4 py-2 rounded-r ${selectedTab === "best" ? "bg-secondary text-white" : "bg-gray-200"}`}
                            onClick={() => handleTabChange("best")}
                          >
                            Mejores
                          </button>
                        </div>
                        <ul className='text-sm space-y-4 py-4 px-2'>
                          {selectedTab === "worst" &&
                            (formattedSurveyAnswers
                              .filter((answer) => answer.type === "worst")
                              .map((answer) => (
                                <div key={answer._id}>
                                  <li className='text-secondary font-bold'>
                                    <span className='text-primary font-bold'>•</span> {answer._id}{" "}
                                    <span>
                                      /<span className='text-red-600 font-bold'>{Math.round(answer.average_value * 100)}%🔻</span>{" "}
                                    </span>{" "}
                                  </li>
                                </div>
                              )) || <div>Sin datos</div>)}

                          {selectedTab === "best" &&
                            (formattedSurveyAnswers
                              .filter((answer) => answer.type === "best")
                              .map((answer) => (
                                <div key={answer._id}>
                                  <li className='text-secondary font-bold'>
                                    <span className='text-primary font-bold'>•</span> {answer._id}{" "}
                                    <span className='text-green-600 text-bold'>
                                      {" "}
                                      / <span className='text-red-600 font-bold'>{Math.round(answer.average_value * 100)}%🔺</span>
                                    </span>{" "}
                                  </li>
                                </div>
                              )) || <div>Sin datos</div>)}
                        </ul>
                      </div>
                    ) : (
                      <div>Sin datos</div>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={5}>
              <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 text-primary font-poppins p-2 h-[250px] overflow-hidden relative'>
                <div className=' h-full'>
                  <div className='flex flex-col'>
                    <span className='p-2 text-lg'>Resumen de retro.</span>
                    <span className='italic text-sm font-light px-2 font-poppins'>Pregunta / Idea / Votos</span>
                  </div>
                  <Divider className='py-2' />
                  <div className='mt-8 px-2 overflow-y-scroll absolute top-14 left-0 right-0 bottom-0'>
                    <ul className='text-sm space-y-4 py-4 px-2'>
                      {formattedRetrospective.length ? (
                        formattedRetrospective.map((retro) => {
                          return <RetroResume question={retro.content} response={retro.note} vote_up={retro.thumb_up} vote_down={retro.thumb_down} />;
                        })
                      ) : (
                        <span>Sin datos</span>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>{" "}
        </>
      )}
    </DashboardLayout>
  );
};
