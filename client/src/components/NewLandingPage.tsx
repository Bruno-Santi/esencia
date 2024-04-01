import { useRef } from "react";
import { NavLanding, Home, About, Features, Testimonials, Pricing } from "./";
import { Footer } from "./Footer";
import { IoHomeOutline } from "react-icons/io5";

export const NewLandingPage = () => {
  const homeRef = useRef(null);
  const testimonialsRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToRef = (ref) => {
    if (!ref) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='lg:min-w-screen md:min-w-screen sm:min-w-screen animate__animated animate__fadeIn animate__slower' style={{ position: "relative" }}>
      <NavLanding />
      <div>
        <Home />
      </div>
      <div onClick={() => scrollToRef(testimonialsRef)} ref={testimonialsRef}>
        <Testimonials />
      </div>
      <div ref={featuresRef} id='features'>
        <Features />
      </div>
      <div ref={aboutRef} id='about'>
        <About />
      </div>
      <div ref={pricingRef} id='pricing' className='pt-2'>
        <Pricing />
      </div>
      <Footer />

      <span
        className='  px-4 py-2  cursor-pointer rounded-full bg-secondary duration-300 group hover:bg-tertiary'
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={() => scrollToRef()}
      >
        <IoHomeOutline className='w-8 h-12 text-teal-50 group-hover:text-primary duration-300' />
      </span>
    </div>
  );
};
