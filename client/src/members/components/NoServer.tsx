import React from "react";
import { RetroLayout } from "../../layaout/RetroLayout";
import { TbPlugConnectedX } from "react-icons/tb";

export const NoServer = () => {
  return (
    <RetroLayout>
      <div className='flex flex-col items-center justify-center h-screen space-y-6 pb-40'>
        <div className='text-secondary text-6xl'>
          <TbPlugConnectedX />
        </div>
        <div className='text-tertiary text-4xl '>Sin retro</div>
      </div>
    </RetroLayout>
  );
};
