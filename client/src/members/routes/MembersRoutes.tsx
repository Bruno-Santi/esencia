import { Route, Routes } from "react-router-dom";
import { AdditionalComments, Retro, Survey } from "../pages";
import SurveyWrapper from "../helpers/SurveyWrapper";
import { FinishedSurvey } from "../pages/FinishedSurvey";
import RetroWrapper from "../helpers/RetroWrapper";
import ErrorBoundary from "../components/ErrorBoundary";

export const MembersRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path='/survey' element={<SurveyWrapper />} />
        <Route element={<AdditionalComments />} path='/comments' />
        <Route path='/retro' element={<RetroWrapper />} />
        <Route path='/retro/finished' element={<FinishedSurvey />} />
        <Route path='/finished' element={<FinishedSurvey />} />
      </Routes>
    </ErrorBoundary>
  );
};
