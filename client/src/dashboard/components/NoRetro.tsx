import { RiLightbulbLine } from "react-icons/ri";

export const NoRetro = () => {
  return (
    <div className='flex h-full flex-col m-auto text-center justify-center '>
      <div>
        <h1 className='text-6xl w-3/6 mx-auto my-auto text-primary/60'>NO SPRINT SELECTED, SELECT OR CREATE ONE</h1>
        <RiLightbulbLine className='text-[100px] mx-auto text-primary/60' />
      </div>
    </div>
  );
};
