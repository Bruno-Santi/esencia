import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
} from "../pages";

export const AuthRoutes =
  () => {
    return (
      <Routes>
        <Route
          element={
            <LoginPage />
          }
          path={
            "/login"
          }
        />
        <Route
          element={
            <RegisterPage />
          }
          path={
            "/register"
          }
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
