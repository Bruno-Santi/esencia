import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../components";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { OnBoardingRoutes } from "../onboarding/routes/OnBoardingRoutes";
import { MembersRoutes } from "../members/routes/";
import { useEffect, useState } from "react";

export const AppRouter = () => {
  const { status, startLogingOut } = useAuthSlice();
  const searchParams = new URLSearchParams(location.search);
  const [tokenParams, setTokenParams] = useState("");

  const isAuthenticated = status === "authenticated";
  const token = localStorage.getItem("authToken");
  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    if (!token && !userToken) startLogingOut();
  }, []);

  useEffect(() => {
    if (status === "authenticated") localStorage.setItem("isAuthenticated", "true");
    setTokenParams(searchParams.get("token"));
  }, []);

  useEffect(() => {
    if (tokenParams) localStorage.setItem("userToken", JSON.stringify(tokenParams));
  }, [tokenParams]);

  const firstLogging = localStorage.getItem("firstLoggin");
  const isAuthenticated1 = localStorage.getItem("isAuthenticated");

  console.log("userToken:", userToken);
  return (
    <div>
      <Routes>
        {isAuthenticated1 || token ? (
          <>
            {/* Rutas para usuarios autenticados */}
            <Route element={<LandingPage />} path={"/"} />
            <Route element={<OnBoardingRoutes />} path={`/onboarding/*`} />
            <Route element={<DashboardRoutes />} path={`/dashboard/*`} />

            {firstLogging === "0" ? (
              <Route element={<Navigate to={"/onboarding"} />} path={`/auth/*`} />
            ) : (
              <Route element={<Navigate to={"/dashboard"} />} path={`/auth/*`} />
            )}
          </>
        ) : (
          <>
            {/* Rutas para usuarios no autenticados */}
            {userToken && <Route element={<MembersRoutes />} path={`/members/*`} />}
            <Route element={<LandingPage />} path={"/"} />
            <Route element={<AuthRoutes />} path={`/auth/*`} />
            <Route element={<Navigate to='/auth/login' />} path={`/dashboard/`} />
            <Route element={<Navigate to='/auth/login' />} path={`/onboarding/`} />
          </>
        )}
      </Routes>
    </div>
  );
};
