import { Charts } from "./Charts";
import { LineCharts } from "./LineCharts";
import { useDashboard } from "../../hooks/useDashboard";
import { DataCollectionReport } from "./DataCollectionReport";
import { useNavigateTo } from "../../hooks";

import { IoRefreshCircleOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";

import { useEffect, useRef } from "react";
import { UsePagination } from "../../helpers/UsePagination";
import { BoardReport, TrendingTopics } from ".";
import { toastSuccess } from "../../helpers/toastSuccess";
import { ClipLoader } from "react-spinners";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { TaskTable } from "./TaskTable";
import { IconButton, Tooltip, Zoom } from "@mui/material";

export const DashboardUi = () => {
  const { user } = useAuthSlice();
  const {
    startCreatingSurvey,

    linesMetrics,
    surveyLoading,
    activeTeam,
    metricsForToday,
    shortRecomendation,
    modalOpen,
    buttonGetData,
    dataLoading,
    longRecommendation,
    cards,
    task,
  } = useDashboard();

  const { handleNavigate } = useNavigateTo();
  const containerRef = useRef();
  console.log(task);
  const englishToSpanish = {
    "In Progress": "En Progreso",
    "In Review": "En Revisión",
    Backlog: "Pendientes",
    Finished: "Finalizados",
  };

  const handleNavigateToFeedBack = () => {
    if (Object.entries(longRecommendation).length > 0 === false) return;
    console.log(!Object.entries(longRecommendation));
    handleNavigate("/dashboard/feedback");
  };
  useEffect(() => {
    console.log(dataLoading);
  }, []);
  const handleVote = () => {
    toastSuccess("Thanks for your feedback! 🤗");
  };
  return (
    <section className='lg:-mt-20 md:-mt-2'>
      <div className=' w-full  sm:max-w-screen sm:p-6 md:grid lg:grid lg:px-6 md:px-6 sm:px-0 sm:my-6 lg:ml-2 md:ml-2 sm:ml-0 sm:flex sm:flex-col sm:items-center sm:justify-center lg:py-6 md:py-2 lg:grid-cols-12 md:grid-cols-12 md:grid-rows-3 lg:grid-rows-2 lg:gap-y-0 md:gap-2 md:gap-y-0 '>
        <div
          className='bg-tertiary shadow-lg 
         shadow-primary/50  lg:min-h-[400px] md:h-[320px] sm:h-[350px] sm:w-[360px]  sm:mb-6 md:w-full lg:w-full
         dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800  lg:row-span-1
   lg:col-span-6 md:col-span-6   rounded-md'
        >
          <div className='flex justify-between'>
            <span className='font-poppins text-primary dark:text-tertiary flex mt-4 ml-4 lg:text-2xl md:text-xl sm:text-lg font-bold'>
              Indicador clave de equipo
              <div className=''>
                <Tooltip
                  title='
"Indicador clave de equipo" se refiere a una medida importante utilizada para evaluar el rendimiento y la salud de un equipo. Estas métricas ayudan a los líderes a entender cómo está funcionando el equipo y guían las acciones para mejorar su eficiencia y colaboración.'
                  className='ml-2 mb-4 text-2xl'
                >
                  <IconButton sx={{ marginBottom: 4, fontSize: 28 }}>
                    <CiCircleQuestion className='dark:text-tertiary' />
                  </IconButton>
                </Tooltip>
              </div>
            </span>
          </div>
          <div className='flex items-center -z-10 justify-center h-full'>
            <span className='text-center font-poppins w-full mt-8 my-auto text-primary/50 font-bold text-5xl'>
              <div className='flex justify-center  m-auto  text-center'></div>
              {Object.keys(metricsForToday).length > 0 ? (
                <div>
                  <Charts />
                </div>
              ) : (
                <p className='text-2xl dark:text-tertiary font-normal font-poppins mt-20'>Sin datos, intenta primero con una encuesta de pulso.</p>
              )}
            </span>
          </div>
        </div>
        <div className='bg-quaternary  lg:min-h-[400px] dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800   shadow-lg shadow-primary/50 lg:h-[400px] md:h-[320px] sm:h-[350px] sm:w-[360px]  sm:mb-6 md:w-full lg:w-full w-full lg:row-span-1 lg:col-span-3 md:col-span-4 rounded-md '>
          <div className='flex'>
            <span className='flex font-poppins text-tertiary w-fit my-auto place-items-center md:text-lg lg:text-2xl  sm:text-lg ml-4 mt-4 font-bold'>
              Perspectivas Accionables
              <div className='flex'>
                <Tooltip
                  title={`
      Las Perspectivas Accionables resumen los datos recopilados de las encuestas diarias y ofrecen recomendaciones concretas y útiles. Estas recomendaciones están diseñadas para ayudar al equipo a tomar medidas específicas y efectivas para abordar áreas de mejora identificadas en las encuestas.
    `}
                  className='ml-2 mb-4'
                  arrow
                  TransitionComponent={Zoom}
                >
                  <span style={{ fontSize: "36px" }}>
                    <IconButton sx={{ marginBottom: 0, fontSize: 28 }}>
                      <CiCircleQuestion className='text-tertiary' />
                    </IconButton>
                  </span>
                </Tooltip>
                <div className='mx-auto lg:flex lg:flex-row lg:justify-center lg:items-center mt-2 lg:ml-6 md:mr-2 '>
                  <span
                    onClick={() => buttonGetData(activeTeam._id, activeTeam.sprint, true)}
                    disabled={dataLoading}
                    className={
                      dataLoading
                        ? "btn-secondary"
                        : "btn-primary w-full flex lg:p-2 md:p-1 space-x-2 mb-3 text-lg rounded-lg font-bold hover:text-primary  dark:font-bold hover:bg-tertiary duration-700"
                    }
                  >
                    {dataLoading ? <ClipLoader /> : <span className='lg:text-sm '>Actualizar </span>}
                    <i className='my-auto lg:text-lg md:text-lg sm:text-lg dark:font-bold font-bold '>
                      {" "}
                      <IoRefreshCircleOutline />
                    </i>
                  </span>
                </div>
              </div>
            </span>
          </div>
          <div
            ref={containerRef}
            className='bg-tertiary  dark:bg-gray-900 w-5/6 mt-4  place-items-center align-middle lg:h-4/6 md:h-[13em] mx-auto rounded-lg overflow-y-scroll'
          >
            <div ref={containerRef} className='font-poppin p-3 w-6/6 scroll-p-12 overflow-x-hidden my-auto   bg-tertiary  dark:bg-gray-900 m-auto'>
              {Object.keys(shortRecomendation).length > 0 ? (
                <UsePagination shortRecomendation={shortRecomendation} containerRef={containerRef} />
              ) : (
                <p className='text-xl   inset-0 text-center font-normal font-poppins dark:text-tertiary'>
                  Sin datos, intenta primero con una encuesta de pulso.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-center  md:space-y-2 lg:-mt-0 lg:row-span-1 md:col-start-1 md:mr-24 md:-mt-56 lg:col-span-3 md:col-span-6 lg:h-[400px] lg:space-y-5 items-center sm:mt-0 flex-col -mt-16 mb-20'>
          <div className='flex mb-2'>
            {cards && cards.map((card, index) => <BoardReport key={index} title={englishToSpanish[Object.keys(card)[0]]} value={Object.values(card)[0]} />)}
          </div>
          <div>{task && <TaskTable tasks={task} />}</div>
        </div>

        <div
          className='bg-tertiary shadow-lg
         shadow-primary/50  lg:h-[400px] md:h-[400px] md:-mt-48 sm:h-[350px] sm:w-[360px]  sm:mb-6 md:w-full lg:w-full 
         dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 
      w-full lg:col-span-6 md:col-span-8 lg:row-span-2 md:row-start-2 md:row-span-2  rounded-md '
        >
          <span className='font-poppins text-primary flex mt-4 ml-4 lg:text-2xl md:text-xl dark:text-tertiary font-bold'>
            Reporte Global del Equipo{" "}
            <div className=''>
              <Tooltip
                title='
                  El "Reporte Global del Equipo" resume datos recolectados de encuestas diarias de pulso, ofreciendo insights sobre la satisfacción, colaboración, compromiso y bienestar laboral del equipo. Esto permite a líderes y miembros del equipo tener una visión general del desempeño y áreas de mejora para impulsar el éxito colectivo.'
                className='ml-2 mb-4 text-2xl'
              >
                <IconButton sx={{ marginBottom: 0, fontSize: 28 }}>
                  <CiCircleQuestion className='dark:text-tertiary' />
                </IconButton>
              </Tooltip>
            </div>
          </span>
          <div className='flex items-center m-auto justify-center h-3/6'>
            <span className='text-center mt-28 font-poppins w-full text-primary/50 font-bold text-4xl'>
              {Object.keys(linesMetrics).length > 0 ? (
                <LineCharts />
              ) : (
                <p className='text-2xl dark:text-tertiary font-normal font-poppins'>Sin datos, intenta primero con una encuesta de pulso.</p>
              )}
            </span>
          </div>
        </div>
        <div className='lg:h-[400px] lg:w-[420px] lg:space-y-32 md:space-y-32  sm:h-[350px] sm:w-[360px] md:h-[360px]  lg:col-start-7 lg:row-start-2 lg:col-span-2  md:col-span-4 md:row-start-2 md:row-span-2 sm:my-16 rounded-md justify-center my-auto gap-y-4'>
          <TrendingTopics />

          <DataCollectionReport />
        </div>
        <div
          className='bg-tertiary shadow-lg
         shadow-primary/50  lg:h-[400px] md:h-[320px]  sm:h-[350px] sm:w-[360px]  sm:mb-6 md:w-full lg:w-full 
         dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 
     lg:col-span-3 md:row-start-1 md:col-start-11 md:col-span-2 lg:row-start-2 lg:row-span-2 lg:col-start-10  rounded-md lg:place-content-start lg:self-start lg:items-start lg:justify-start lg:-my-12'
        >
          {" "}
          {user.role ? (
            <span className=''>
              <span className='font-poppins text-primary flex sm:text-lg mt-4 lg:ml-4 md:ml-4 sm:ml-4 lg:text-2xl dark:text-tertiary font-bold'>
                Acciones Disponibles
              </span>
              <div className='md:flex md:flex-col md:justify-center md:items-center md:mt-4'>
                <span
                  disabled={surveyLoading}
                  onClick={() => startCreatingSurvey(activeTeam.name, activeTeam._id)}
                  className={
                    !surveyLoading
                      ? "btn-primary sm:w-2/3 sm:flex md:w-5/6 sm:items-center p-2 sm:justify-center font-poppins dark:hover:border-white dark:hover:border-1 dark:hover:duration-500 md:text-base md:p-1 lg:text-xl rounded-md lg:p-2 duration-700 hover:bg-amber-100 hover:text-primary mt-4"
                      : "btn-secondary font-poppins  md:w-5/6 text-xl rounded-md p-2 duration-700 sm:flex sm:items-center sm:justify-center mt-4"
                  }
                >
                  <span className='sm:flex sm:items-center sm:justify-center'> Encuesta de pulso</span>
                </span>
                <span
                  disabled={surveyLoading}
                  className={
                    !surveyLoading
                      ? "btn-primary sm:w-2/3 sm:flex md:w-5/6 sm:items-center p-2 sm:justify-center font-poppins dark:hover:border-white dark:hover:border-1 dark:hover:duration-500 md:text-base md:p-1 lg:text-xl rounded-md lg:p-2 duration-700 hover:bg-amber-100 hover:text-primary mt-4"
                      : "btn-secondary font-poppins md:w-5/6 text-xl rounded-md p-2 duration-700 sm:flex sm:items-center sm:justify-center mt-4"
                  }
                >
                  <span className='sm:flex sm:items-center sm:justify-center'> Retrospectivas</span>
                </span>
                <span
                  disabled={surveyLoading}
                  className={
                    !surveyLoading
                      ? "btn-primary sm:w-2/3 sm:flex  md:w-5/6 sm:items-center p-2 sm:justify-center font-poppins dark:hover:border-white dark:hover:border-1 dark:hover:duration-500 md:text-base md:p-1 lg:text-xl rounded-md lg:p-2 duration-700 hover:bg-amber-100 hover:text-primary mt-4"
                      : "btn-secondary font-poppins text-xl md:w-5/6 rounded-md p-2 duration-700 sm:flex sm:items-center sm:justify-center mt-4"
                  }
                >
                  <span className='sm:flex sm:items-center sm:justify-center'>Miembros</span>
                </span>
                <span
                  disabled={surveyLoading}
                  className={
                    !surveyLoading
                      ? "btn-primary sm:w-2/3 sm:flex md:w-5/6 sm:items-center p-2 sm:justify-center font-poppins dark:hover:border-white dark:hover:border-1 dark:hover:duration-500 md:text-base md:p-1 lg:text-xl rounded-md lg:p-2 duration-700 hover:bg-amber-100 hover:text-primary mt-4"
                      : "btn-secondary font-poppins text-xl  md:w-5/6 rounded-md p-2 duration-700 sm:flex sm:items-center sm:justify-center mt-4"
                  }
                >
                  <span className='sm:flex sm:items-center sm:justify-center'> Eliminar equipo</span>
                </span>
              </div>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
