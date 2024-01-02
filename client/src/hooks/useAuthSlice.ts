import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogOut, onLogin } from "../store/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useNavigateTo } from ".";
import { useEffect } from "react";
import { onLogOutUser, onSetUser } from "../store/dashboard/dashboardSlice";
import api from "../helpers/apiToken";
import { toastSuccess } from "../helpers";

export const useAuthSlice = () => {
  //@ts-expect-error 'efefe'
  const { loading, errorMessage, status, user } = useSelector((state) => state.auth);
  //@ts-expect-error 'efefe'
  const { userTeams } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const { handleNavigate } = useNavigateTo();

  useEffect(() => {}, [loading]);
  const startCheckingUser = async () => {
    dispatch(onChecking());

    try {
      const user = await api.get(`/users`);
      console.log(user.data.team_list);
      dispatch(onSetUser(user.data.team_list));
      dispatch(onLogin(user.data.user));
    } catch (error) {
      console.log(error);

      dispatch(onLogOut(""));
    }
  };
  const startLoginUser = async ({ email, password }: { email: string; password: string }) => {
    try {
      const resp = await api.post(`/auth/login`, { user: { email, password } });

      dispatch(clearErrorMessage());
      localStorage.setItem("authToken", JSON.stringify(resp.data.token));

      await startCheckingUser();
      localStorage.setItem("isAuthenticated", true);
      const firstLog = localStorage.getItem("firstLoggin");
      if (!firstLog) localStorage.setItem("firstLoggin", "0");
      firstLog == "1" ? handleNavigate("/dashboard") : handleNavigate("/onboarding");
    } catch (error) {
      console.error(error);

      const errorMessage = error.response?.data?.payload || error.message;

      dispatch(onLogOut(errorMessage));
    }
  };

  const startRegisteringUser = async ({ first_name, email, password }) => {
    console.log(user);

    try {
      const resp = await api.post(`/auth/register`, { user: { first_name, email, password } });
      toastSuccess(`Successfully registered. Redirecting to login. 👍`);
      handleNavigate("/auth/login");
      dispatch(clearErrorMessage());
      console.log(resp);
    } catch (error) {
      const { payload } = error.response.data;
      dispatch(onLogOut(payload));
    }
  };

  const startLogingOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLogged");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userTeams");
    localStorage.removeItem("surveyData");
    dispatch(onLogOut(""));
    dispatch(onLogOutUser());
    handleNavigate("/auth/login");
  };

  const cleanErrorMessage = () => dispatch(clearErrorMessage())

  
  return {
    startCheckingUser,
    loading,
    errorMessage,
    status,
    startRegisteringUser,
    startLogingOut,
    cleanErrorMessage,
    startLoginUser,
    userTeams,
    user,
  };
};
