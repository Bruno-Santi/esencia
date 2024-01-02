import { Navigate, Route, Routes } from "react-router-dom";
import { Main, Retrospectives } from "../pages";
import { useDashboard } from "../../hooks/useDashboard";
import { useEffect } from "react";
import { FeedBack } from "../components";

export const DashboardRoutes = () => {
  const { startSettingUser, startSettingTeams } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      await startSettingUser();
      await startSettingTeams();
    };

    fetchData();
  }, []);
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Retrospectives />} path='/retro' />
      <Route element={<FeedBack />} path='/feedback' />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
