import { LayoutProps } from "../interface/index";
import { NavLanding } from "../components";
import { Footer } from "../components/Footer";

export const LandingLayaout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='antialiased lg:min-h-screen md:min-h-screen sm:min-h-screen animate__animated animate__fadeIn animate__slower dark:bg-primary dark:animate__animated dark:animate__fadeIn dark:animate__slower '>
      <NavLanding />

      <div className=''>{children}</div>
      <Footer />
    </div>
  );
};
