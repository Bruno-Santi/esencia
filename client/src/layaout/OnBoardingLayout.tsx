import React from "react";
import { LayoutProps } from "../interface";
import { HeaderOnBoarding } from "../components";

export const OnBoardingLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className='bg-primary min-h-screen w-screen pb-6'>
      <HeaderOnBoarding />
      <div className='m-auto'>{children}</div>
    </section>
  );
};
