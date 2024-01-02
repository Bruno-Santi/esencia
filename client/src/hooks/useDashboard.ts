import { useDispatch, useSelector } from "react-redux";
import {
  onLoadingTeam,
  onSetUserTeams,
  onSetActiveTeam,
  onCreateTeam,
  onSetUser,
  onSetActiveTeamMembers,
  cleanActiveTeam,
  onSaveMetricsForToday,
  onToggleModal,
  onSetDataLoading,
  onSetLongRecommendation,
} from "../store/dashboard/dashboardSlice";
import { UserTeams } from "../store/dashboard/interfaces";
import { useModal } from ".";
import { useState } from "react";
import api, { baseURL } from "../helpers/apiToken";
import { getTeamData } from "../helpers/getTeamData";

import { toastSuccess, toastWarning } from "../helpers";
import { toast } from "react-toastify";
import axios from "axios";

export const useDashboard = () => {
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [creatingLoading, setCreatingLoading] = useState(false);

  const dispatch = useDispatch();
  const { closeModal, isOpen } = useModal();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(({ auth }) => auth);
  const {
    userTeams,
    activeTeam,
    membersActiveTeam,
    metricsForToday,
    linesMetrics,
    shortRecomendation,
    dataAmount,
    isLoading,
    modalOpen,
    dataLoading,
    longRecommendation,
  } = useSelector(({ dashboard }) => dashboard);

  const startSettingUser = () => {
    dispatch(onSetUser(user));
  };

  const startSettingTeams = async () => {
    try {
      const { data } = await api.get(`/users`);
      const { team_list } = data;

      dispatch(onSetUserTeams({ userTeams: team_list }));
      localStorage.setItem("userTeams", JSON.stringify(team_list));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const startToggleModal = () => {
    dispatch(onToggleModal(!modalOpen));
  };
  const buttonGetData = async (id, triggered) => {
    try {
      await starGettingData(id, triggered);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(onSetDataLoading(false));
    }
  };
  const startGettingLongRecommendation = async (teamId) => {
    try {
      const resp = await api.get(`/get_long_recommendation?team_id=${teamId}`);
      console.log(resp.data);

      dispatch(onSetLongRecommendation(resp.data));
    } catch (error) {
      console.log(error);
      toast.warning("Error while getting data");
    }
  };
  const starGettingData = async (id: string, triggered?: boolean) => {
    dispatch(onSetDataLoading(true));
    setTimeout(async () => {
      try {
        const surveyData = await getTeamData(id);
        console.log(surveyData);

        startGettingLongRecommendation(id);
        const datalocal = localStorage.getItem("surveyData");
        if (datalocal) localStorage.removeItem("surveyData");
        if (surveyData.error) {
          dispatch(
            onSaveMetricsForToday({
              metricsForToday: {},
              linesMetrics: {},
              dataAmount: [],
              shortRecomendation: {},
            })
          );
        } else {
          if (surveyData.data.short_recommendation === "there are no recommendations") {
            dispatch(
              onSaveMetricsForToday({
                metricsForToday: surveyData.data.pie_chart || {},
                linesMetrics: surveyData.data.lines_graph || {},
                dataAmount: surveyData.data.data_amounts || [],
                shortRecomendation: surveyData.data.short_recommendation || {},
              })
            );
          }
          dispatch(
            onSaveMetricsForToday({
              metricsForToday: surveyData.data.pie_chart || {},
              linesMetrics: surveyData.data.lines_graph || {},
              dataAmount: surveyData.data.data_amounts || [],
              shortRecomendation: surveyData.data.short_recommendation || {},
            })
          );
        }

        const dataToSave = {
          metricsForToday: surveyData.data.pie_chart || {},
          linesMetrics: surveyData.data.lines_graph || {},
          dataAmount: surveyData.data.data_amounts || [],
          shortRecomendation: surveyData.data.short_recommendation || "",
        };

        if (triggered)
          !surveyData.data.error ? toast.success("Data received successfully") : toast.warning("No data yet");
        localStorage.setItem("surveyData", JSON.stringify(dataToSave));
      } catch (error) {
        console.log(error);
        toastWarning("Error while getting data");
      } finally {
        dispatch(onSetDataLoading(false));
      }
    }, 1500);
  };

  const startSettingActiveTeam = async (id: number) => {
    await startGettingLongRecommendation(id);
    modalOpen && startToggleModal();
    const dataToSave = {
      metricsForToday: [],
      linesMetrics: [],
      dataAmount: [],
    };
    localStorage.setItem("surveyData", JSON.stringify(dataToSave));
    dispatch(cleanActiveTeam());
    dispatch(onLoadingTeam());
    //@ts-expect-error 'efefe'
    starGettingData(id);
    console.log(id);
    closeModal();
    dispatch(
      onSetActiveTeam({
        id: id,
      })
    );
  };

  const startCreatingTeam = async (newTeam: UserTeams) => {
    newTeam.logo =
      newTeam.logo ||
      "https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1701895638/team-logo_2_fq5yev.png";
    const team = { team: newTeam };

    try {
      const resp = await api.post("/teams/", team);
      const createdTeam = resp.data;

      dispatch(onCreateTeam(createdTeam.team));

      const updatedUserTeams = userTeams ? [...userTeams, createdTeam.team] : [createdTeam.team];

      localStorage.setItem("userTeams", JSON.stringify(updatedUserTeams));
      dispatch(onSetUserTeams({ userTeams: updatedUserTeams }));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  const startAddingMember = async (userData, teamId) => {
    console.log(userData, teamId);
    setCreatingLoading(true);
    try {
      const formData = {
        team_id: teamId,
        user: {
          first_name: userData.first_name,
          last_name: userData.last_name || "",
          email: userData.email,
        },
      };
      const response = await api.post(`/teams/members/`, formData);
      if (response.data.user) {
        toast.success(`${formData.user.first_name} added to the team `, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return startGettingMembers(teamId);
      }

      toast.warning(`${formData.user.email} has already been added to the some team`);
      console.log(response.data.user);

      startGettingMembers(teamId);
      setCreatingLoading(false);
    } catch (error) {
      toastWarning("Error while creating members");
      console.error("Error adding member:", error);
      setCreatingLoading(false);
    }
  };
  const startGettingMembers = async (id) => {
    try {
      const { data } = await api.get(`/teams/members/${id}`);

      dispatch(onSetActiveTeamMembers({ members: data.user_list }));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const startCreatingSurvey = async (teamName: string, teamId: string) => {
    setSurveyLoading(true);
    try {
      const users = await startGettingMembers(teamId);

      console.log(users);
      if (!users) {
        toastWarning(`The team ${teamName} doesn't have any member.`);
      } else {
        const response = await api.post(`/survey/send_all_members/${teamId}`);
        console.log(response);
        setSurveyLoading(false);
        return toastSuccess(`Survey sended to the team: ${teamName}`);
      }
    } catch (error) {
      toastWarning(`${error.message}`);
      setSurveyLoading(false);
      console.log(error);
    }
  };

  const startCreatingRetro = async (teamId) => {
    console.log(teamId);

    try {
      const resp = await axios.post(`${baseURL}/retro/${teamId}`);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingMember = async (memberId, teamId, memberName) => {
    try {
      const data = { user_id: memberId, team_id: teamId };

      const resp = await api.delete("/teams/members", { data });
      toast.success(`${memberName} deleted successfully`);
      await startGettingMembers(teamId);
      console.log(resp);
    } catch (error) {
      console.log(error);
      toast.warning("Error deleting member");
    }
  };

  return {
    startSettingActiveTeam,
    starGettingData,
    startGettingMembers,
    startCreatingTeam,
    userTeams,
    startCreatingRetro,
    activeTeam,
    linesMetrics,
    dataAmount,
    user,
    isLoading,
    startSettingUser,
    startAddingMember,
    membersActiveTeam,
    startSettingTeams,
    loading,
    shortRecomendation,
    metricsForToday,
    startCreatingSurvey,
    surveyLoading,
    creatingLoading,
    startToggleModal,
    buttonGetData,
    modalOpen,
    dataLoading,
    closeModal,
    isOpen,
    startGettingLongRecommendation,
    longRecommendation,
    startDeletingMember,
  };
};
