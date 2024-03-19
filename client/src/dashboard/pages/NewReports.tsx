import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { Cuadrants } from "../components/Cuadrants";
import { FaHome, FaSmile, FaTools, FaUsers } from "react-icons/fa";
import { MdOutlineSelfImprovement } from "react-icons/md";
import { AccordionDetails, Divider, Grid } from "@mui/material";
import { BoardReport, RetroResume } from "../components";
import { LineChart } from "@mui/x-charts";
import { LineCharts } from "../components/LineCharts";
import { useDashboard } from "../../hooks/useDashboard";
import { ReportAccordion } from "../../components/ReportAccordion";
import { LineChartReport } from "../../components/LineChartReport";
import { TaskTable } from "../components/TaskTable";

export const NewReports = () => {
  const { longRecommendation, loadingReports, activeReport } = useDashboard();
  console.log(longRecommendation);
  console.log(activeReport);
  // Variables para almacenar los valores de las tarjetas
  const [backlogValue, setBacklogValue] = useState(0);
  const [inProgressValue, setInProgressValue] = useState(0);
  const [inReviewValue, setInReviewValue] = useState(0);
  const [finishedValue, setFinishedValue] = useState(0);
  const [analysisLines, setAnalysisLines] = useState("");
  // useEffect(() => {
  //   assignValues();
  // }, [longRecommendation]);
  useEffect(() => {
    console.log(activeReport);
    assignValues();
  }, [activeReport]);

  const assignValues = () => {
    if (longRecommendation) {
      const analysisLines = activeReport[0]?.analysis.split("\n");
      setAnalysisLines(analysisLines);
      const inProgressCard = activeReport[0]?.cards.find((card) => card["In Progress"] !== undefined);
      const inProgressValue = inProgressCard ? inProgressCard["In Progress"] : 0;
      console.log("In Progress:", inProgressValue);
      setInProgressValue(inProgressValue);

      const inReviewCard = activeReport[0]?.cards.find((card) => card["In Review"] !== undefined);
      const inReviewValue = inReviewCard ? inReviewCard["In Review"] : 0;
      console.log("In Review:", inReviewValue);
      setInReviewValue(inReviewValue);

      const finishedCard = activeReport[0]?.cards.find((card) => card["Finished"] !== undefined);
      const finishedValue = finishedCard ? finishedCard["Finished"] : 0;
      console.log("Finished:", finishedValue);
      setFinishedValue(finishedValue);

      const backlogCard = activeReport[0]?.cards.find((card) => card["Backlog"] !== undefined);
      const backlogValue = backlogCard ? backlogCard["Backlog"] : 0;
      console.log("Backlog:", backlogValue);
      setBacklogValue(backlogValue);
    }
  };

  return (
    <DashboardLayout>
      {activeReport.length === 0 ? (
        <div className='flex-col items-center flex justify-center mt-4'>
          {" "}
          <ReportAccordion reports={longRecommendation} />{" "}
          <div className='mt-64'>
            <h1 className='font-poppins text-4xl text-primary/60'>Select a report</h1>
          </div>
          <button>Actualizar datos</button>
        </div>
      ) : (
        <>
          <div className='font-poppins flex justify-center mt-4 items-center '>
            <ReportAccordion reports={longRecommendation} />
            <button className='ml-6 btn-primary p-2 rounded-md'>Actualizar datos</button>
          </div>
          <Grid
            container
            spacing={0}
            justifyContent='left'
            alignItems='center'
            ml={{ xs: 0, lg: 0 }}
            className='mb-20 gap-4 items-center lg:space-x-10 md:space-x-10 pt-6'
          >
            <Grid item xs={12} lg={5}>
              <div className='flex space-x-0 lg:ml-10 md:ml-10 gap-6  font-poppins text-primary '>
                <BoardReport title='Objetivos planificados' value={backlogValue} />
                <BoardReport title='Objetivos en proceso' value={inProgressValue} />
                <BoardReport title='Objetivos en revisión' value={inReviewValue} />
                <BoardReport title='Objetivos completados' value={finishedValue} />
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className='flex ml-64  text-center sm:flex sm:flex-col md:flex-row lg:flex-row '>
                <Cuadrants
                  icon={<FaSmile />}
                  label='General Satisfaction'
                  value={Math.round(activeReport[0]?.differences["general_satisfaction_diff"] * 100)}
                  color='bg-[#8136c2]'
                />
                <Cuadrants
                  icon={<MdOutlineSelfImprovement />}
                  label='Self Satisfaction'
                  value={Math.round(activeReport[0]?.differences["self_satisfaction_diff"] * 100)}
                  color='bg-[#FF6384]'
                />
                <Cuadrants
                  icon={<FaUsers />}
                  label='Team Collaboration'
                  value={Math.round(activeReport[0]?.differences["team_collaboration_diff"] * 100)}
                  color='bg-[#36A2EB]'
                />
                <Cuadrants
                  icon={<FaTools />}
                  label='Work Engagement'
                  value={Math.round(activeReport[0]?.differences["work_engagement_diff"] * 100)}
                  color='bg-[#ebb734]'
                />
                <Cuadrants
                  icon={<FaHome />}
                  label='Workspace Well-Being'
                  value={Math.round(activeReport[0]?.differences["workspace_wellbeing_diff"] * 100)}
                  color='bg-[#5a2f80]'
                />
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TaskTable tasks={activeReport[0]?.task} />
            </Grid>
            <Grid item xs={12} lg={7} className='lg:pl-36 md:pl-36 pr-6'>
              <div className=''>
                {" "}
                {/* Aumenta la altura para permitir dos líneas */}
                <LineChartReport data={activeReport[0]?.lines_graph} height='20em' />
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
                    <ul className='text-sm space-y-4 py-4 px-2'>
                      {activeReport[0]?.answers.map((answer) => {
                        return (
                          <div>
                            <li className='text-secondary font-bold'>
                              <span className='text-primary font-bold'>•</span> {answer._id}{" "}
                              <span className='text-primary font-normal'> / {Math.round(answer.average_value * 100)}%</span>{" "}
                            </li>
                          </div>
                        );
                      })}{" "}
                    </ul>
                  </div>
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
            <Grid item xs={12} lg={6}>
              <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 text-primary h-[250px] font-poppins p-2 overflow-hidden relative'>
                <div className=' h-full '>
                  <div className='p-2 text-lg'>Recomendaciones.</div>
                  <Divider className='py-2 ' />

                  <div className='mt-6 px-4  pb-4 overflow-y-scroll absolute top-14 left-0 right-0 bottom-0'>{activeReport[0].recommendation}</div>
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
                      {activeReport[0].retro.length ? (
                        activeReport[0].retro.map((retro) => {
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
