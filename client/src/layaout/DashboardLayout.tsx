import { LayoutProps } from "../interface/index";
import { NavBar } from "../components";

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='lg:min-w-screen md:min-w-screen sm:min-w-screen animate__animated animate__fadeIn animate__slower' style={{ position: "relative" }}>
      <NavBar />

      <div className='lg:ml-20 md:ml-16 sm:ml-0'>{children}</div>
    </div>
  );
};
