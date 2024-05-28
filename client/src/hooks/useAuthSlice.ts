import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogOut, onLogin } from "../store/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useNavigateTo } from ".";
import { useEffect, useState } from "react";
import { onLogOutUser, onSetUser } from "../store/dashboard/dashboardSlice";
import api from "../helpers/apiToken";
import { getRandomColor, toastSuccess } from "../helpers";
import axios from "axios";

export const useAuthSlice = () => {
  //@ts-expect-error 'efefe'
  const { loading, errorMessage, status, user } = useSelector((state) => state.auth);
  //@ts-expect-error 'efefe'
  const { userTeams } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const { handleNavigate } = useNavigateTo();
  const [errorLoginMember, setErrorLoginMembers] = useState("");
  useEffect(() => {}, [loading]);
  // const startCheckingUser = async () => {
  //   dispatch(onChecking());

  //   try {
  //     const user = await api.get(`/users`);
  //     console.log(user.data.team_list);

  //   } catch (error) {
  //     console.log(error);

  //     dispatch(onLogOut(""));
  //   }
  // };
  const startLoginMember = async ({ email, password }) => {
    try {
      const resp = await api.post(`/api/members/login`, { email, password });

      localStorage.setItem("authToken", JSON.stringify(resp.data.token));
      dispatch(clearErrorMessage());
      localStorage.setItem("isAuthenticated", true);
      setErrorLoginMembers("");
      dispatch(onSetUser(resp.data.user));
      dispatch(onLogin(resp.data.user));
      handleNavigate("/dashboard");
    } catch (error) {
      setErrorLoginMembers(error.response.data.message);
    }
  };

  const startLoginWithGoogle = async (data) => {
    try {
      console.log(data);
      const { email, displayName, photoURL, uid } = data.user;
      const resp = await api.post(`/api/auth/login`, { email: email, name: displayName, avatar: photoURL, method: "Google", uid: uid });
      console.log(resp);

      console.log(email, displayName, photoURL);
      localStorage.setItem("authToken", JSON.stringify(resp.data.token));
      dispatch(clearErrorMessage());
      localStorage.setItem("isAuthenticated", true);
      setErrorLoginMembers("");
      dispatch(onSetUser(resp.data.user));
      dispatch(onLogin(resp.data.user));
      handleNavigate("/dashboard");
    } catch (error) {
      setErrorLoginMembers(error.response.data.message);
    }
  };
  const startLoginUser = async ({ email, password }: { email: string; password: string }) => {
    console.log({ email, password });

    try {
      const resp = await api.post("/api/auth/login", { email, password });
      console.log({ email, password });
      dispatch(clearErrorMessage());
      localStorage.setItem("authToken", JSON.stringify(resp.data.token));
      console.log("asd");
      console.log(resp);
      const { role } = resp.data.user;
      console.log(role);

      // await startCheckingUser();
      localStorage.setItem("isAuthenticated", true);

      dispatch(onSetUser(resp.data.user));
      console.log(resp.data.user);

      dispatch(onLogin(resp.data.user));

      handleNavigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);

      let errorMessage = error.response?.data?.message || error.message;
      if (
        error.response.data.message === "password must be longer than or equal to 8 characters" ||
        error.response.data.message === "Invalid email or password"
      ) {
        errorMessage = "Credenciales invalidas.";
      }

      dispatch(onLogOut(errorMessage));
    }
  };

  const startRegisteringUser = async ({ name, email, password }) => {
    console.log(user);
    const avtColor = getRandomColor();
    const role = "admin";
    try {
      const resp = await api.post(`/api/auth/register`, { name, email, password, avtColor, role });
      toastSuccess(`Registro exitoso. Redireccionando a login.`);
      handleNavigate("/auth/login");
      dispatch(clearErrorMessage());
      console.log(resp);
    } catch (error) {
      console.log(error.response.data.message);

      dispatch(onLogOut(error.response.data.message));
    }
  };

  const startLogingOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLogged");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userTeams");
    localStorage.removeItem("surveyData");
    localStorage.removeItem("token");
    dispatch(onLogOut(""));
    dispatch(onLogOutUser());
    handleNavigate("/");
  };

  const cleanErrorMessage = () => dispatch(clearErrorMessage());

  return {
    loading,
    errorMessage,
    status,
    startRegisteringUser,
    startLogingOut,
    cleanErrorMessage,
    startLoginUser,
    userTeams,
    user,
    startLoginMember,
    setErrorLoginMembers,
    errorLoginMember,
    startLoginWithGoogle,
  };
};
