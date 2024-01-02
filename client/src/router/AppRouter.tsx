import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../components";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { OnBoardingRoutes } from "../onboarding/routes/OnBoardingRoutes";
import { MembersRoutes } from "../members/routes/";
import { useEffect, useState } from "react";

export const AppRouter = () => {
  const { status } = useAuthSlice();
  const searchParams = new URLSearchParams(location.search);
  const [tokenParams, setTokenParams] = useState("");

  const isAuthenticated = status === "authenticated";
  const { startCheckingUser } = useAuthSlice();
  useEffect(() => {
    setTokenParams(searchParams.get("token"));
    startCheckingUser();
    if (status === "authenticated") localStorage.setItem("isAuthenticated", "true");
  }, []);

  useEffect(() => {
    if (tokenParams) localStorage.setItem("authToken", tokenParams);
  }, [tokenParams]);
  const firstLogging = localStorage.getItem("firstLoggin");
  const isAuthenticated1 = localStorage.getItem("isAuthenticated");

  return (
    <div>
      <Routes>
        {isAuthenticated1 || tokenParams ? (
          <>
            {/* Rutas para usuarios autenticados */}
            <Route element={<LandingPage />} path={"/"} />
            <Route element={<OnBoardingRoutes />} path={`/onboarding/*`} />
            <Route element={<DashboardRoutes />} path={`/dashboard/*`} />
            <Route element={<MembersRoutes />} path={`/members/*`} />
            {firstLogging === "0" ? (
              <Route element={<Navigate to={"/onboarding"} />} path={`/auth/*`} />
            ) : (
              <Route element={<Navigate to={"/dashboard"} />} path={`/auth/*`} />
            )}
          </>
        ) : (
          <>
            {/* Rutas para usuarios no autenticados */}
            <Route element={<LandingPage />} path={"/"} />
            <Route element={<AuthRoutes />} path={`/auth/*`} />
            <Route element={<Navigate to='/' />} path={`/dashboard/*`} />
            <Route element={<Navigate to='/' />} path={`/onboarding/*`} />
          </>
        )}
      </Routes>
    </div>
  );
};
