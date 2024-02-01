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
import { finalRandomizedQuestions } from "../members/data/questions";

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
    topics,
    dataLoading,
    longRecommendation,
  } = useSelector(({ dashboard }) => dashboard);

  const startSettingTeams = async () => {
    try {
      const { data } = await api.get(`/api/team/${user.id}`);
      console.log(data);
      dispatch(onSetUserTeams({ userTeams: data }));
      localStorage.setItem("userTeams", JSON.stringify(data.teams));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const startToggleModal = () => {
    dispatch(onToggleModal(!modalOpen));
  };
  const buttonGetData = async (id, sprint, triggered) => {
    console.log(id, sprint, triggered);

    try {
      await starGettingData(id, sprint, triggered);
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
  const starGettingData = async (id: string, sprint = 0, triggered?: boolean) => {
    dispatch(onSetDataLoading(true));
    console.log(id, sprint);
    toast.promise(startGettingDataFunc(id, sprint, triggered), {
      pending: "Seeking for new data... 🕐",
      success: "Data received successfully! 🎉",
      error: "Error while getting data 😢",
    });
  };
  const startGettingDataFunc = async (id, sprint, triggered) => {
    try {
      console.log(sprint);

      const surveyData = await getTeamData(id, sprint);
      console.log(surveyData);
      if (surveyData.longRecommendation !== "There is no enough data") dispatch(onSetLongRecommendation(surveyData.longRecommendation));
      if (surveyData === "No existe data de este equipo") toast.warning("There's no data for this team 😢");
      const datalocal = localStorage.getItem("surveyData");
      if (datalocal) localStorage.removeItem("surveyData");
      if (surveyData.error) {
        dispatch(
          onSaveMetricsForToday({
            metricsForToday: {},
            linesMetrics: {},
            dataAmount: [],
            shortRecomendation: {},
            topics: [],
          })
        );
      } else {
        if (surveyData.short_recommendation === "there are no recommendations") {
          dispatch(
            onSaveMetricsForToday({
              metricsForToday: surveyData.data.pie_chart || {},
              linesMetrics: surveyData.data.lines_graph || {},
              dataAmount: surveyData.data.data_amount || [],
              shortRecomendation: surveyData.data.short_recommendation?.content || {},
              topics: surveyData.data.topics || [],
            })
          );
        }
        dispatch(
          onSaveMetricsForToday({
            metricsForToday: surveyData.data.pie_chart || {},
            linesMetrics: surveyData.data.lines_graph || {},
            dataAmount: surveyData.data.data_amount || [],
            shortRecomendation: surveyData.data.short_recommendation?.content || {},
            topics: surveyData.data.topics || [],
          })
        );
      }

      const dataToSave = {
        metricsForToday: surveyData.pie_chart || {},
        linesMetrics: surveyData.lines_graph || {},
        dataAmount: surveyData.data_amount || [],
        shortRecomendation: surveyData.short_recommendation?.content || "",
        topics: surveyData.topics || [],
      };

      localStorage.setItem("surveyData", JSON.stringify(dataToSave));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(onSetDataLoading(false));
    }
  };
  const startSettingActiveTeam = async (id: number) => {
    modalOpen && startToggleModal();
    const dataToSave = {
      metricsForToday: [],
      linesMetrics: [],
      dataAmount: [],
      topics: [],
    };
    localStorage.setItem("surveyData", JSON.stringify(dataToSave));
    dispatch(cleanActiveTeam());
    dispatch(onLoadingTeam());
    //@ts-expect-error 'efefe'

    closeModal();
    dispatch(
      onSetActiveTeam({
        id: id,
      })
    );
    const sprint = userTeams.find((team) => team._id === id).sprint;
    await starGettingData(id, sprint);
    // await startGettingLongRecommendation(id, sprint); a
    console.log(id, activeTeam.sprint);
  };

  const startCreatingTeam = async (newTeam: UserTeams, scrumId) => {
    console.log(newTeam, scrumId);

    newTeam.logo = newTeam.logo || "https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1701895638/team-logo_2_fq5yev.png";

    const { name, logo } = newTeam;
    try {
      const resp = await api.post(`/api/team/${scrumId}`, { name, logo });

      dispatch(onCreateTeam(resp.data));

      const updatedUserTeams = userTeams ? [...userTeams, resp.data] : [...resp.data];

      localStorage.setItem("userTeams", JSON.stringify(updatedUserTeams));
      dispatch(onSetUserTeams({ userTeams: updatedUserTeams }));
      closeModal();
    } catch (error) {
      toastWarning(error.response.data.message);
    }
  };
  const startAddingMember = async (userData, teamId) => {
    console.log(userData, teamId);
    setCreatingLoading(true);
    try {
      const formData = {
        teamId: teamId,

        name: userData.first_name,

        email: userData.email,
      };
      console.log(formData);

      const response = await api.post(`/api/members/`, formData);
      if (response.data.created) {
        toast.success(`${formData.name} added to the team `, {
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

      toast.warning(`${formData.email} has already been added to the some team`);

      startGettingMembers(teamId);
      setCreatingLoading(false);
    } catch (error) {
      console.log(error);

      toastWarning("Error while creating members");
      console.error("Error adding member:", error);
      setCreatingLoading(false);
    }
  };
  const startGettingMembers = async (id) => {
    console.log(id);

    try {
      const { data } = await api.get(`/api/members/${id}`);

      dispatch(onSetActiveTeamMembers({ members: data.members }));

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const startCreatingSurvey = async (teamName: string, teamId: string) => {
    setSurveyLoading(true);
    console.log(finalRandomizedQuestions);

    const questions = finalRandomizedQuestions;
    const questionValues = Object.values(questions);
    const data = {
      team_id: teamId,
      questions: questionValues,
    };
    try {
      console.log(teamId);

      const users = await startGettingMembers(teamId);
      console.log({ data });

      if (!users) {
        toastWarning(`The team ${teamName} doesn't have any member.`);
      } else {
        const response = await api.post(`/api/survey/day-survey/`, data);
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

      const resp = await api.delete(`/api/members/${memberId}`);
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
    topics,
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
