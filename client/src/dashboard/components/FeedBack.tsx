import { BackButton } from ".";
import { arrowdown, graph } from "../../assets";
import { useDocumentTitle } from "../../hooks";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";

export const FeedBack = () => {
  useDocumentTitle("Feedback | Esencia.app");
  const { longRecommendation } = useDashboard();
  return (
    <DashboardLayout>
      <BackButton />
      <div className='flex h-screen'>
        <section className='flex flex-col w-2/3 justify-center my-auto place-content-center items-center ml-36 space-y-24 mt-28'>
          <div>
            <h2 className='font-manrope text-2xl mb-6'>Insight Analysis</h2>
            <div className='p-12 text-primary rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins overflow-y-scroll'>
              {longRecommendation?.recommendation.content.item1}
            </div>
          </div>
          <div>
            <h2 className='font-manrope text-2xl mb-6'>What can you do as a leader?</h2>
            <div className='p-12 text-primary rounded-lg bg-gray-200 mb-16 shadow-gray-700 overflow-y-scroll shadow-lg font-poppins '>
              {Object.entries(longRecommendation?.recommendation.content.item2).map(([key, value]) => (
                <div key={key}>
                  <h2 className='font-bold font-poppins'>{key}:</h2>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='flex flex-col w-2/6 justify-center my-auto place-content-center items-center ml-24 space-y-24 mt-40'>
          <div className='h-2/3 p-12 text-center text-primary rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins'>
            <img className='w-12 text-center justify-center m-auto mb-4' src={graph} alt='' />
            <span className='font-bold justify-center'>{longRecommendation?.recommendation.general_satisfaction}%</span>

            <div>General Satisfaction</div>
          </div>
          <div className='h-2/3 p-12 text-primary text-center rounded-lg bg-gray-200 shadow-gray-700 shadow-lg font-poppins'>
            <img className='w-12 text-center justify-center m-auto mb-4' src={arrowdown} alt='' />
            <span className='font-bold justify-center'>
              {Object.values(longRecommendation?.recommendation.quadrant)}%
            </span>
            <div>{Object.keys(longRecommendation?.recommendation.quadrant)}</div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};
