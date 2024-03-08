import React from "react";
import { feature1 } from "../assets";
import { FeatureList } from "./FeatureList";
import { features, featuresES } from "../helpers/features";

export const Features = () => {
  return (
    <section className='min-w-full font-inter text-primary lg:mt-20 md:mt-20 sm:mt-10'>
      <div className='flex flex-col'>
        <h1 className='lg:text-left font-bold md:text-left sm:text-left lg:text-5xl md:text-4xl sm:ml-8 sm:text-3xl lg:ml-40 md:ml-40 sm:mb-6'>Features</h1>
        {featuresES.map((feature) => {
          return (
            <div className=''>
              <FeatureList key={feature.id} feature={feature} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
