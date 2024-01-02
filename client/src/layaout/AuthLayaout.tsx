import { Divider } from "../components";
import { LayoutProps } from "../interface/index";
import { logo, authbg } from "../assets";
export const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className='w-full h-screen lg:bg-primary '>
      <div className=' flex lg:flex-row animate__animated animate__fadeIn animate__slower animate__delay-0.8s'>
        <div className='lg:w-1/2 lg:block hidden flex items-center justify-center h-screen'>
          {" "}
          <section className='w-5/6 flex flex-col lg:block hidden text-center m-auto mt-44  '>
            {" "}
            <h1 className='text-tertiary font-manrope font-bold pt-20 text-4xl'>
              Discover a new way to empower your <span className='text-secondary'>agile teams</span>
            </h1>
            <div className='w-5/6 m-auto space-y-6 pt-8'>
              <p className='text-tertiary font-light text-xl'>
                <span className='importantWord'>Esencia</span> is the innovative SaaS platform designed to take your
                Agile Leadership to the next level.
              </p>
              <p className='text-tertiary font-light text-xl'>
                Break the barrier of process-focused tools and discover an <br></br>
                <span className='importantWord'>AI-powered </span>
                solution that enhances your leadership to improve culture, emotions, and interactions within your teams.
              </p>
            </div>
          </section>
        </div>
        <div className='w-full lg:w-2/3 h-screen flex justify-center lg:relative'>
          <div className='fixed top-1/2 transform -translate-y-1/2 lg:right-64 sm:w-5/6 md:w-2/6 lg:w-fit px-32 pb-10 bg-primary/60 h-fit  z-50 rounded-xl'>
            <img src={logo} alt='esencia logo' className='animate-pulse w-24 mt-14 m-auto' />
            <div className='flex m-auto justify-center'>{children}</div>
          </div>
          <img src={authbg} alt='' className='object-cover w-full h-full opacity-80' />
        </div>
      </div>
    </section>
  );
};
