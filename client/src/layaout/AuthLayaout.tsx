import { Divider } from "../components";
import { LayoutProps } from "../interface/index";
import { logo, authbg } from "../assets";
export const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className='w-full h-screen md:bg-primary lg:bg-primary '>
      <div className=' flex lg:flex-row  animate__animated animate__fadeIn animate__slower animate__delay-0.8s'>
        <div className='lg:w-1/3  lg:block md:block   flex items-center justify-center h-screen'>
          {" "}
          <section className='lg:w-4/6 sm:hidden flex flex-col lg:block md:flex md:justify-center md:w-2/3 md:items-center   text-center m-auto lg:mt-56 md:mt-36  '>
            {" "}
            <h1 className='text-tertiary font-manrope font-bold pt-20 md:text-3xl lg:text-4xl'>
              Descubre una nueva forma de potenciar tus <span className='text-secondary'>equipos ágiles</span>
            </h1>
            <div className='w-5/6 m-auto space-y-6 pt-6'>
              <p className='text-tertiary font-light text-xl'>
                <span className='importantWord'>Esencia</span> es la innovadora plataforma SaaS diseñada para llevar tu liderazgo ágil al siguiente nivel.
              </p>
              <p className='text-tertiary font-light text-xl'>
                Rompe la barrera de las herramientas centradas en procesos y descubre una solución impulsada por{" "}
                <span className='importantWord'>inteligencia artificial</span> que mejora tu liderazgo para mejorar la cultura, emociones e interacciones dentro
                de tus equipos. <br></br>
              </p>
            </div>
          </section>
        </div>
        <div className='w-full lg:w-2/3  h-screen flex justify-center lg:items-center  lg:relative'>
          <div className='fixed top-1/2 transform -translate-y-1/2 lg:right-140 sm:w-5/6 md:w-1/3 lg:w-fit px-32 pb-10 bg-primary/60 h-fit  z-50 rounded-xl'>
            <img src={logo} alt='esencia logo' className='animate-pulse md:w-16 w-24 mt-14 m-auto' />
            <div className='flex m-auto justify-center '>{children}</div>
          </div>
          <img src={authbg} alt='' className='object-cover w-full h-full opacity-80' />
        </div>
      </div>
    </section>
  );
};
