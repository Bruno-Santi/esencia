import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";
import Profile from "../pages/Profile";
import VerifyEmail from "../pages/VerifyEmail";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path={"/login"} />
      <Route element={<RegisterPage />} path={"/register"} />
      <Route element={<VerifyEmail />} path={"/verify-email"} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
