import { useRef } from "react";
import { NavLanding, Home, About, Features, Testimonials, Pricing, WhyUs, Assessment } from "./";
import { Footer } from "./Footer";
import { IoHomeOutline } from "react-icons/io5";
import { LandingLayaout } from "../layaout/LandingLayaout";

export const NewLandingPage = () => {
  const homeRef = useRef(null);
  const testimonialsRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const pricingRef = useRef(null);
  const assessmentRef = useRef(null);
  const scrollToRef = (ref) => {
    console.log(ref);

    if (!ref) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.log(ref.current);

      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LandingLayaout>
      <div>
        <Home />
      </div>
      <div>
        <WhyUs />
        <div className='flex flex-col mt-6 items-center font-poppins'>
          <h1 className=' sm:text-2xl flex items-center justify-center m-auto mt-6 lg:text-2xl md:text-2xl font-bold lg:w-full md:w-3/3'>
            Mira este breve video para entender la magia de <br></br>
          </h1>
          <p className='font-bold text-secondary text-2xl'> Esencia.app:</p>
        </div>
        <div className='m-auto  flex md:mt-10 mt-20 sm:mt-10 items-center justify-center  lg:w-3/6 md:w-3/6 sm:w-5/6 h-2/3 rounded-xl'>
          <iframe
            width='800'
            height='450'
            src='https://www.youtube.com/embed/QWx0c2iI2Xs'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
            className='py-1'
          ></iframe>
        </div>
      </div>
      <div ref={testimonialsRef} id='testimonials'>
        <Testimonials />
      </div>
      <div ref={assessmentRef} id='assessment'>
        <Assessment />
      </div>
      <div ref={featuresRef} id='features'>
        <Features />
      </div>
      <div ref={aboutRef} id='about'>
        <About />
      </div>
      {/* <div ref={pricingRef} id='pricing' className='pt-2'>
        <Pricing />
      </div> */}

      <span
        className='  px-4 py-2  cursor-pointer rounded-full bg-secondary duration-300 group hover:bg-tertiary'
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={() => scrollToRef()}
      >
        <IoHomeOutline className='w-8 h-12 text-teal-50 group-hover:text-primary duration-300' />
      </span>
    </LandingLayaout>
  );
};
