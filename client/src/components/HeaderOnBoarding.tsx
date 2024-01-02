import { Divider } from ".";
import { logo } from "../assets";

export const HeaderOnBoarding = () => {
  return (
    <div className='flex flex-col pt-10 mb-10'>
      <img
        className=' w-1/6 md:w-[100px] lg:w-[129px] m-auto animate-pulse duration-700'
        src={logo}
        alt={"Esencia.ai Logo"}
      />
      <span className='text-tertiary/40 text-lg lg:text-2xl font-poppins font-bold italic m-auto pt-6 mb-10'>
        By Agile Leaders for Agile Leaders
      </span>
      <Divider />
    </div>
  );
};
