import { useEffect } from "react";
import { BackButton } from ".";
import { arrowdown, graph } from "../../assets";
import { useDocumentTitle } from "../../hooks";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { UsePagination } from "../../helpers/UsePagination";
import { toastSuccess } from "../../helpers";
import { FaSmile, FaUsers, FaTools, FaHome } from "react-icons/fa";
import { MdOutlineSelfImprovement } from "react-icons/md";
import { Cuadrants } from "./Cuadrants";
import { useNavigate } from "react-router-dom";

export const FeedBack = () => {
  useDocumentTitle("Feedback | Esencia.app");
  const navigate = useNavigate();
  const { longRecommendation } = useDashboard();
  const handleVote = () => {
    toastSuccess("Thanks for your feedback! 🤗");
  };
  useEffect(() => {
    console.log(longRecommendation);
  }, [longRecommendation]);
  if (longRecommendation === null || !longRecommendation) return navigate("/dashboard");
  return Object.keys(longRecommendation).length === 0 ? (
    navigate("/dashboard")
  ) : (
    <DashboardLayout>
      {/* <BackButton /> */}
      <div className='flex min-h-screen pb-6'>
        <section className='flex flex-col w-2/3 justify-center my-auto place-content-center items-center ml-12 space-y-24 mt-10'>
          <div>
            <h2 className='font-manrope text-2xl mb-6 dark:text-tertiary'>What can you do as a leader?</h2>
            <div className='lg:p-12 md:p-10 text-primary rounded-lg dark:bg-gray-900 bg-gray-200 mb-16 shadow-gray-700 shadow-lg font-poppins '>
              <UsePagination shortRecomendation={longRecommendation?.content.item2} containerRef={null} />

              <div className='   bottom-0 ml-4 mt-2'>
                <span className='w-full place-items-center my-auto text-primary dark:text-tertiary text-sm'>
                  Did you find this insight accurate?{" "}
                  <a className='text-lg cursor-pointer' onClick={handleVote}>
                    👍
                  </a>{" "}
                  <a onClick={handleVote} className='text-lg cursor-pointer'>
                    👎
                  </a>
                </span>
              </div>
            </div>
            <div className='dark:bg-gray-900'>
              <h2 className='font-manrope text-2xl mb-6 dark:text-tertiary'>Insight Analysis</h2>
              <div className='p-12 text-primary rounded-lg bg-gray-200 dark:bg-gray-900 dark:text-tertiary shadow-gray-700 shadow-lg font-poppins '>
                {longRecommendation?.content.item1}
              </div>
            </div>
          </div>
        </section>
        <section className='flex flex-wrap w-1/3 h-5/6 justify-center text-center my-auto place-content-center items-center ml-36 mt-24'>
          {/* Cuadrantes */}
          <Cuadrants icon={<FaSmile />} label='General Satisfaction' value={longRecommendation?.General_Satisfaction} color='bg-[#8136c2]' />
          <Cuadrants icon={<MdOutlineSelfImprovement />} label='Self Satisfaction' value={longRecommendation?.["Self Satisfaction"]} color='bg-[#FF6384]' />
          <Cuadrants icon={<FaUsers />} label='Team Collaboration' value={longRecommendation?.["Team Collaboration"]} color='bg-[#36A2EB]' />
          <Cuadrants icon={<FaTools />} label='Work Engagement' value={longRecommendation?.["Work Engagement"]} color='bg-[#ebb734]' />
          <Cuadrants icon={<FaHome />} label='Workspace Well-Being' value={longRecommendation?.["Workspace Well-Being"]} color='bg-[#5a2f80]' />
        </section>
      </div>
    </DashboardLayout>
  );
};
