import { Navigate, Route, Routes } from "react-router-dom";
import { Main, NewReports, Retrospectives, Assessment } from "../pages";
import { useDashboard } from "../../hooks/useDashboard";
import { useEffect } from "react";
import { FeedBack } from "../components";

export const DashboardRoutes = () => {
  const { startSettingTeams } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      await startSettingTeams();
    };

    fetchData();
  }, []);
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Retrospectives />} path='/retro' />
      <Route element={<NewReports />} path='/reports' />
      <Route element={<Assessment />} path='/assessment' />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
