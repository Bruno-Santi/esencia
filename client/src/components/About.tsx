import { illustration2 } from "../assets";

export const About = () => {
  return (
    <section className=' mt-40 lg:h-[1000px] md:h-[1000px] sm:h-[860px] bg-primary min-w-full   flex relative'>
      <div className='lg:flex-row md:flex-row sm:flex sm:flex-col-reverse sm:mt-10 items-center lg:justify-between md:justify-between sm:justify-center'>
        <div className='lg:ml-40 md:ml-40 sm:justify-center sm:mb-10 sm:mt-6'>
          <img src={illustration2} className='lg:w-5/6 md:w-5/6 sm:w-5/6 sm:justify-center sm:mx-auto' />
        </div>
        <div className='font-inter text-tertiary md:mr-40 lg:mr-40 lg:w-2/6 md:w-2/6 sm:w-5/6'>
          <h1 className='font-bold lg:text-5xl md:text-5xl sm:text-2xl mb-10 sm:mb-6'>About Us</h1>
          <p className='lg:text-lg md:text-lg sm:text-normal'>
            At <span className='text-secondary font-bold'>Esencia</span>, we're passionate about transforming teamwork into an effortless and efficient
            experience. Our innovative application is meticulously designed for teams, presenting a holistic suite of tools to elevate collaboration, streamline
            processes, and cultivate a culture of continuous improvement.
          </p>
          <p className='lg:text-lg md:text-lg sm:text-normal mt-6'>
            Let's take a deeper dive into the foundational features that set Essence apart as the ultimate platform for teams committed to achieving excellence.
          </p>
        </div>
      </div>
    </section>
  );
};
