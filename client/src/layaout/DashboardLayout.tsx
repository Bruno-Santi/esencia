import { LayoutProps } from "../interface/index";
import { NavBar, SideBar } from "../components";

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen animate__animated animate__fadeIn animate__slower dark:bg-primary dark:animate__animated dark:animate__fadeIn dark:animate__slower'>
      <NavBar />

      <div>{children}</div>
    </div>
  );
};
