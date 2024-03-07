import React from "react";
import { illustration1 } from "../assets";

export const Home = () => {
  return (
    <section className=' lg:flex lg:flex-row md:flex md:flex-row sm:flex-col lg:justify-between md:justify-between min-w-full sm:mt-6 md:mt-36  lg:mt-36'>
      <div className='font-inter sm:flex-col sm:justify-center sm:m-auto sm:items-center md:w-2/3 lg:w-2/3 sm:w-5/6 space-y-6 lg:ml-40 md:ml-40 '>
        <h1 className=' sm:text-2xl  lg:text-5xl md:text-3xl font-bold lg:w-2/3 md:w-3/3'>
          Agile Innovation: Discover Surveys, Retros, and Recommendations with AI!
        </h1>
        <p className='lg:w-3/6 md:w-5/6 lg:text-lg md:text-lg sm:text-normal'>
          <span className='font-bold lg:text-lg md:text-lg sm:text-normal'>Make every sprint count.</span> Our Scrum Masters platform offers surveys,
          retrospectives, and AI recommendations. Power up your team now!
        </p>
        <button className='p-2 duration-300 hover:bg-secondary bg-primary rounded-3xl lg:text-lg md:text-lg sm:text-normal text-tertiary'>Get Started</button>
      </div>
      <div className='lg:mr-40 md:mr-40 sm:justify-center sm:items-center sm:flex sm:mt-6 '>
        <img src={illustration1} className='lg:w-5/6 md:w-5/6 sm:w-5/6  items-center' />{" "}
      </div>
    </section>
  );
};
