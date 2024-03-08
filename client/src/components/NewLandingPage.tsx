import { NavLanding, Home, About, Features, Testimonials, Pricing } from "./";
import { Footer } from "./Footer";

export const NewLandingPage = () => {
  return (
    <div className='min-w-screen animate__animated animate__fadeIn animate__slower'>
      <NavLanding />

      <Home />
      <Testimonials />
      <Features />
      <About />
      <Pricing />
      <Footer />
    </div>
  );
};
