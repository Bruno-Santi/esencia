import { Route, Routes } from "react-router-dom";
import { ActiveBoard, Boards, Home, Reports, Roadmap } from "../pages/";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { Login } from "../pages/Login";

export const TeamsRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        path='/*'
        element={
          <DashboardLayout>
            <div className='pt-6'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/boards' element={<Boards />} />
                <Route path='/roadmap' element={<Roadmap />} />
              </Routes>
            </div>
          </DashboardLayout>
        }
      />
    </Routes>
  );
};

export default TeamsRoutes;
