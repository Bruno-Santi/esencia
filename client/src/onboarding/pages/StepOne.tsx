import { video } from "../../assets";
import { useDocumentTitle, useNavigateTo } from "../../hooks";

import { OnBoardingLayout } from "../../layaout";

export const StepOne = () => {
  useDocumentTitle("Onboard | Esencia.app");
  const { handleNavigate } = useNavigateTo();

  return (
    <OnBoardingLayout>
      <div className='flex flex-col animate__animated animate__fadeIn animate__slower'>
        <span className='w-4/6 font-light text-center font-manrope sm:text-2xl md:text-2xl lg:text-4xl text-tertiary mx-auto'>
          Watch this short video to understand the magic of <span className='font-bold text-secondary'>Esencia.ai</span>
          :
        </span>
        <div className='m-auto flex md:mt-10 mt-20 sm:mt-10 bg-gray-400 lg:w-3/6 md:w-3/6 sm:w-5/6 h-60 rounded-xl'>
          <img src={video} className='m-auto ' alt='esencia onboarding video' />
        </div>
        <button
          onClick={() => handleNavigate("/onboarding/steptwo")}
          className='btn-primary p-2 w-[200px] mx-auto sm:mt-10 md:mt-10 lg:mt-20 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary'
        >
          Continue
        </button>
      </div>
    </OnBoardingLayout>
  );
};
