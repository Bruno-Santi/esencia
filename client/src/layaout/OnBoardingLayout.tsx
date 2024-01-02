import React from "react";
import { LayoutProps } from "../interface";
import { HeaderOnBoarding } from "../components";

export const OnBoardingLayout: React.FC<
  LayoutProps
> = ({
  children,
}) => {
  return (
    <section className="bg-primary h-screen w-screen">
      <HeaderOnBoarding />
      <div className="m-auto">
        {children}
      </div>
    </section>
  );
};
