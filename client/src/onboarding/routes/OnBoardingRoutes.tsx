import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {
  Welcome,
  StepOne,
  StepTwo,
} from "../pages";

export const OnBoardingRoutes =
  () => {
    return (
      <Routes>
        <Route
          element={
            <Welcome />
          }
          path="/"
        />
        <Route
          element={
            <StepOne />
          }
          path="/stepone"
        />
        <Route
          element={
            <StepTwo />
          }
          path="/steptwo"
        />
        <Route
          path="/*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    );
  };
