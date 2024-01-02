import { LayoutProps } from "../interface/index";
import { NavBar, SideBar } from "../components";

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='animate__animated animate__fadeIn animate__slower'>
      <NavBar />
      <SideBar />
      <div>{children}</div>
    </div>
  );
};
