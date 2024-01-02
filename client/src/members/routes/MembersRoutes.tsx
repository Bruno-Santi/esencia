import { Route, Routes } from "react-router-dom";
import { AdditionalComments, Retro } from "../pages";

import SurveyWrapper from "../helpers/SurveyWrapper";
import { FinishedSurvey } from "../pages/FinishedSurvey";

export const MembersRoutes = () => {
  return (
    <Routes>
      <Route path='/survey' element={<SurveyWrapper />} />
      <Route element={<AdditionalComments />} path='/comments' />
      <Route path={`/retro`} element={<Retro />} />
      <Route path={"/finished"} element={<FinishedSurvey />} />
    </Routes>
  );
};
