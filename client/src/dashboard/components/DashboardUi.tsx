import { Charts } from "./Charts";
import { LineCharts } from "./LineCharts";
import { useDashboard } from "../../hooks/useDashboard";
import { DataCollectionReport } from "./DataCollectionReport";
import { useNavigateTo } from "../../hooks";

import { IoRefreshCircleOutline } from "react-icons/io5";

import { useEffect, useRef } from "react";
import { UsePagination } from "../../helpers/UsePagination";
import { TrendingTopics } from ".";
import { toastSuccess } from "../../helpers/toastSuccess";
import { ClipLoader } from "react-spinners";

export const DashboardUi = () => {
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
  } = useDashboard();

  const { handleNavigate } = useNavigateTo();
  const containerRef = useRef();

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
    <>
      <div className=' w-full md:grid lg:grid px-6 ml-4 sm:flex sm:flex-col  lg:py-6 md:py-2 grid-cols-12 grid-rows-2 gap-6'>
        <div
          className='bg-tertiary shadow-lg
         shadow-primary/50  h-[400px] 
         dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 
      w-full lg:col-span-6 md:col-span-8   rounded-md'
        >
          <div className='flex justify-between'>
            <span className='font-poppins text-primary dark:text-tertiary flex mt-4 ml-4 text-2xl font-bold'>Key team indicator</span>
          </div>
          <div className='flex items-center -z-10 justify-center h-full'>
            <span className='text-center font-poppins w-full mt-8 my-auto text-primary/50 font-bold text-5xl'>
              <div className='flex justify-center  m-auto  text-center'></div>
              {Object.keys(metricsForToday).length > 0 ? (
                <div>
                  <Charts />
                </div>
              ) : (
                <p className='text-2xl dark:text-tertiary font-normal font-poppins mt-20'>NO DATA YET, TRY MAKING ACTIONS</p>
              )}
            </span>
          </div>
        </div>

        <div className='bg-quaternary  dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800   shadow-lg shadow-primary/50 h-[400px] w-full lg:col-span-4 md:col-span-4 rounded-md '>
          <div className='flex  '>
            <span className='font-poppins text-tertiary w-fit my-auto place-items-center text-2xl ml-4 mt-4 font-bold'>Actionable Insights</span>
            {Object.keys(shortRecomendation).length > 0 && (
              <div className='   bottom-0 ml-4 mt-2'>
                <span className='w-full place-items-center my-auto text-tertiary text-sm'>
                  Did you find this insight accurate?{" "}
                  <a className='text-lg cursor-pointer' onClick={handleVote}>
                    👍
                  </a>{" "}
                  <a onClick={handleVote} className='text-lg cursor-pointer'>
                    👎
                  </a>
                </span>
              </div>
            )}
          </div>
          <div
            ref={containerRef}
            className='bg-tertiary  dark:bg-gray-900 w-5/6 mt-4 place-items-center align-middle lg:h-4/6 md:h-[15em] mx-auto rounded-lg overflow-y-scroll'
          >
            <div ref={containerRef} className='font-poppin p-3 w-6/6 scroll-p-12 overflow-x-hidden my-auto   bg-tertiary  dark:bg-gray-900 m-auto'>
              {Object.keys(shortRecomendation).length > 0 ? (
                <UsePagination shortRecomendation={shortRecomendation} containerRef={containerRef} />
              ) : (
                <p className='text-xl   inset-0 text-center font-normal font-poppins dark:text-tertiary'>NO DATA YET, TRY MAKING A SURVEY FIRST</p>
              )}
            </div>
          </div>
          <div className='mx-auto flex justify-center mt-2'>
            <button
              onClick={() => buttonGetData(activeTeam._id, activeTeam.sprint, true)}
              disabled={dataLoading}
              className={
                dataLoading
                  ? "btn-secondary"
                  : "btn-primary flex p-2 text-lg rounded-lg font-bold hover:text-primary dark:font-bold hover:bg-tertiary duration-700"
              }
            >
              {dataLoading ? <ClipLoader /> : `Refresh Data`}
              <i className='my-auto text-xl dark:font-bold font-bold ml-2'>
                {" "}
                <IoRefreshCircleOutline />
              </i>
            </button>
          </div>
        </div>

        <div
          className='bg-tertiary shadow-lg
         shadow-primary/50  lg:h-fit md:h-[360px]
         dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800
      w-full col-span-3 md:col-span-2 md:row-span-2 lg:row-span-1 rounded-md'
        >
          <div className='flex flex-col space-y-8 p-2 m-auto md:col-span-3 '>
            <span className='font-poppins text-primary flex mt-4 ml-4 text-2xl dark:text-tertiary font-bold'>Avaible Actions</span>
            <button
              disabled={surveyLoading}
              onClick={() => startCreatingSurvey(activeTeam.name, activeTeam._id)}
              className={
                !surveyLoading
                  ? "btn-primary font-poppins dark:hover:border-white dark:hover:border-1 dark:hover:duration-500 md:text-base md:p-1 lg:text-xl rounded-md lg:p-2 duration-700 hover:bg-amber-100 hover:text-primary"
                  : "btn-secondary font-poppins text-xl rounded-md p-2 duration-700 "
              }
            >
              Pulse Survey
            </button>
            <button
              onClick={() => handleNavigate("/dashboard/retro")}
              className='btn-primary font-poppins md:text-base md:p-1 lg:text-xl rounded-md
              lg:p-2 duration-700 hover:bg-amber-100
               hover:text-primary'
            >
              Retrospectives
            </button>
          </div>
          <DataCollectionReport />
        </div>

        <div
          className=' h-[400px] 
      w-full lg:col-span-4 md:col-span-2 mt-2 row-span-2 rounded-md justify-center m-auto place-content-center'
        >
          <TrendingTopics />
        </div>

        <div
          className='bg-tertiary shadow-lg
         shadow-primary/50  h-[360px]
         dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 
      w-full lg:col-span-8 md:col-span-8 row-span-2  rounded-md '
        >
          <span className='font-poppins text-primary flex mt-4 ml-4 text-2xl dark:text-tertiary font-bold'>Team global report</span>
          <div className='flex items-center m-auto justify-center h-3/6'>
            <span className='text-center mt-28 font-poppins w-full text-primary/50 font-bold text-4xl'>
              {Object.keys(linesMetrics).length > 0 ? (
                <LineCharts />
              ) : (
                <p className='text-2xl dark:text-tertiary font-normal font-poppins'>NO DATA YET, TRY MAKING ACTIONS</p>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
