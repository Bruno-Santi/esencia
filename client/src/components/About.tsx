import { illustration2 } from "../assets";

export const About = () => {
  return (
    <section className=' lg:mt-40 md:mt-40 sm:mt-12 lg:h-[1000px] md:h-[1000px] sm:h-[880px] bg-primary min-w-full   flex relative'>
      <div className='lg:flex-row md:flex-row sm:flex sm:flex-col-reverse sm:mt-12 sm:p-2 items-center lg:justify-between md:justify-between sm:justify-center'>
        <div className='lg:ml-40 md:ml-40 sm:justify-center sm:mb-10 sm:mt-6'>
          <img src={illustration2} className='lg:w-5/6 md:w-5/6 sm:w-5/6 sm:justify-center sm:mx-auto' />
        </div>
        <div className='font-inter text-tertiary md:mr-40 lg:mr-40 lg:w-2/6 md:w-3/6 sm:w-5/6'>
          <h1 className='font-bold lg:text-3xl md:text-2xl sm:text-2xl mb-10 sm:mb-6'>Nosotros</h1>
          <p className='lg:text-lg md:text-lg sm:text-normal'>
            En <span className='font-bold text-secondary'>Esencia</span>, nuestra pasión radica en centrar la agilidad en las personas y sus interacciones.
            Hemos diseñado una experiencia de gestión innovadora que pone a las personas en el centro. Utilizamos la Inteligencia Artificial para fomentar la
            colaboración, agilizar los procesos y cultivar una cultura de mejora constante. fluida y eficiente.
          </p>
          <p className='lg:text-lg md:text-lg sm:text-normal mt-6'>
            Utilizamos la Inteligencia Artificial para fomentar la colaboración, agilizar los procesos y cultivar una cultura de mejora constante.{" "}
          </p>
          <p className='lg:text-lg md:text-lg sm:text-normal mt-6'>Nuestro sueño es transformar el trabajo en equipo en una experiencia fluida y eficiente.</p>
        </div>
      </div>
    </section>
  );
};
