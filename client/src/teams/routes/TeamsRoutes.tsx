import { Route, Routes } from "react-router-dom";
import { Boards, Home, Reports } from "../pages/";

import { DashboardLayout } from "../../layaout/DashboardLayout";

export const TeamsRoutes = () => {
  return (
    <DashboardLayout>
      <div className='pt-6'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/boards' element={<Boards />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};

export default TeamsRoutes;
