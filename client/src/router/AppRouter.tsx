import { Navigate, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { LandingPage, NewAssessment } from "../components";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { OnBoardingRoutes } from "../onboarding/routes/OnBoardingRoutes";
import { MembersRoutes } from "../members/routes/";
import { useEffect, useState } from "react";
import { TeamsRoutes } from "../teams/routes/TeamsRoutes";
import { Login } from "../teams/pages/Login";
import ReactGA from "react-ga";
import { NewLandingPage } from "../components/NewLandingPage";
import Profile from "../auth/pages/Profile";
import { Faqs } from "../components/Faqs";
import { FaqsLanding } from "../components/FaqsLanding";
import { useDashboard } from "../hooks/useDashboard";

export const AppRouter = () => {
  const [searchParams1] = useSearchParams();
  const { status, startLogingOut } = useAuthSlice();
  const { user } = useAuthSlice();
  const { activeTeam } = useDashboard();

  const isAdmin = activeTeam?.members?.some((member) => member.id === user.id && member.role === "admin");
  console.log(isAdmin);
  const searchParams = new URLSearchParams(location.search);
  const [tokenParams, setTokenParams] = useState("");
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("authToken");
  const userToken = searchParams.get("token");
  const token = searchParams.get("token");
  const userTokenLocal = localStorage.getItem("userToken");
  useEffect(() => {
    if (status === "authenticated") localStorage.setItem("isAuthenticated", "true");
  }, []);
  const TRACKING_ID = "G-TX9FWF4RZR";
  ReactGA.initialize(TRACKING_ID);
  useEffect(() => {
    console.log(searchParams.get("token"));
    console.log(searchParams1.get("token"));

    setTokenParams(searchParams.get("token"));
    if (tokenParams) localStorage.setItem("userToken", searchParams.get("token"));
  }, [tokenParams]);
  useEffect(() => {
    console.log(userTokenLocal);
    console.log(userToken);

    if (tokenParams) setLoading(false);
    if (authToken) setLoading(false);
  }, [tokenParams]);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) setLoading(false);
  }, []);

  useEffect(() => {
    if (!authToken && !userToken && !userTokenLocal) {
      console.log("holis");

      setLoading(false);
    }
  }, []);
  // useEffect(() => {
  //   if (!authToken && status !== "authenticated") {
  //     startLogingOut();
  //     setLoading(false);
  //   }
  // }, [token, userToken, status]);

  const isAuthenticated1 = localStorage.getItem("isAuthenticated");

  return (
    <div>
      {loading ? (
        <div className='flex flex-col justify-center mx-auto my-72 space-y-2 duration-700' role='status'>
          <svg
            aria-hidden='true'
            className='inline w-24 h-24 text-gray-200 animate-spin mt-20 dark:text-gray-600 fill-green-500'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      ) : (
        <Routes>
          <Route element={<Login />} path={"/teams/login"} />
          {isAuthenticated1 || authToken ? (
            <>
              {/* Rutas para usuarios autenticados */}
              <Route element={<NewLandingPage />} path={"/"} />
              <Route element={<FaqsLanding />} path={"/faqs"} />
              {userToken && <Route element={<MembersRoutes />} path={`/members/*`} />}
              {userTokenLocal && <Route element={<MembersRoutes />} path={`/members/*`} />}
              <Route element={<OnBoardingRoutes />} path={`/onboarding/*`} />
              {!isAdmin && <Route element={<Navigate to='/dashboard' />} path={`/dashboard/retro`} />}
              <Route element={<DashboardRoutes />} path={`/dashboard/*`} />
              <Route element={<Faqs />} path={`/faqs`} />
              {!isAdmin && <Route element={<Navigate to='/dashboard' />} path={`/dashboard/assessment`} />}

              <Route element={<TeamsRoutes />} path={`/teams/*`} />
              <Route element={<Navigate to='/dashboard' />} path={`/teams/login`} />
              <Route path='/profile' element={<Profile />} />
            </>
          ) : (
            <>
              {/* Rutas para usuarios no autenticados */}
              <Route element={<Login />} path={"/teams/login"} />
              {userToken && <Route element={<MembersRoutes />} path={`/members/*`} />}
              {userTokenLocal && <Route element={<MembersRoutes />} path={`/members/*`} />}
              <Route element={<NewAssessment />} path={"/new-assessment"} />
              <Route element={<NewLandingPage />} path={"/"} />
              <Route element={<FaqsLanding />} path={"/faqs"} />
              <Route element={<AuthRoutes />} path={`/auth/*`} />
              <Route element={<Navigate to='/auth/login' />} path={`/dashboard/`} />
              <Route element={<Navigate to='/auth/login' />} path={`/onboarding/`} />
            </>
          )}
        </Routes>
      )}
    </div>
  );
};
