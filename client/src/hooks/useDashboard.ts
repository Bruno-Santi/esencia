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
  onSetActiveReport,
} from "../store/dashboard/dashboardSlice";

import { UserTeams } from "../store/dashboard/interfaces";
import { useModal } from ".";
import { useState } from "react";
import api, { baseURL } from "../helpers/apiToken";
import { getTeamData } from "../helpers/getTeamData";

import { getRandomColor, toastSuccess, toastWarning } from "../helpers";
import { toast } from "react-toastify";
import axios from "axios";
import { finalRandomizedQuestions, generateRandomQuestions } from "../members/data/questions";

export const useDashboard = () => {
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
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
    activeReport,
    cards,
    task,
  } = useSelector(({ dashboard }) => dashboard);

  const startSettingTeams = async () => {
    console.log(user);

    try {
      if (user.role) {
        const { data } = await api.get(`/api/team/${user.id}`);
        console.log(data);
        dispatch(onSetUserTeams({ userTeams: data }));
        localStorage.setItem("userTeams", JSON.stringify(data.teams));
      } else {
        const { data } = await api.get(`/api/members/teams/${user.id}`);
        console.log(data);

        dispatch(onSetUserTeams({ userTeams: data }));
        localStorage.setItem("userTeams", JSON.stringify(data.teams));
      }

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
      console.log(activeTeam);
      console.log(id);

      const members = await startGettingMembers(id);
      console.log(members.members.length);

      const surveyData = await getTeamData(id, members.members.length);
      await startGettingReports(id, sprint);
      console.log(surveyData);

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
            cards: [],
            task: [],
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
              cards: surveyData.data.cards || [],
              task: surveyData.data.task || [],
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
            cards: surveyData.data.cards || [],
            task: surveyData.data.task || [],
          })
        );
      }

      const dataToSave = {
        metricsForToday: surveyData.pie_chart || {},
        linesMetrics: surveyData.lines_graph || {},
        dataAmount: surveyData.data_amount || [],
        shortRecomendation: surveyData.short_recommendation?.content || "",
        topics: surveyData.topics || [],
        cards: surveyData.data.cards || [],
        task: surveyData.data.task || [],
      };

      localStorage.setItem("surveyData", JSON.stringify(dataToSave));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(onSetDataLoading(false));
    }
  };
  const startSettingActiveTeam = async (id: number) => {
    dispatch(cleanActiveTeam());
    console.log(id);

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
    await starGettingData(String(id), sprint);
    await startGettingReports(String(id), sprint);
    console.log(id, String(activeTeam.sprint));
  };
  const startGettingReports = async (team_id, sprint) => {
    setLoadingReports(true);
    try {
      const { data } = await api.get(`/api/data/get_reports/${team_id}/${sprint}`);
      console.log(data);

      setLoadingReports(false);
      dispatch(onSetLongRecommendation(data));
    } catch (error) {
      setLoadingReports(false);
      console.log(error);
    }
  };

  const setActiveReport = (id) => {
    console.log(id);

    dispatch(onSetActiveReport(id));
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
    const avtColor = getRandomColor();
    try {
      const formData = {
        teamId: teamId,

        name: userData.first_name,

        email: userData.email,
        avtColor: avtColor,
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

    const questions = generateRandomQuestions();
    const questionValues = Object.values(questions);
    const data = {
      team_id: teamId,
      questions: questionValues,
    };
    try {
      const { members } = await startGettingMembers(teamId);
      console.log(members);

      if (members.length === 0) {
        toastWarning(`The team ${teamName} doesn't have any member.`);
        setSurveyLoading(false);
      } else {
        console.log("holis");

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
  const startInvitingMember = async (memberId, memberName) => {
    console.log(activeTeam._id);
    try {
      const resp = await api.post(`/api/members/invite/${memberId}`, { teamId: activeTeam._id });
      toastSuccess(`El miembro ${memberName} ha sido invitado a la plataforma`);
      startGettingMembers(activeTeam._id);
    } catch (error) {
      console.log(error);
      toastWarning(`Hubo un error al invitar al miembro`);
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
    startInvitingMember,
    longRecommendation,
    startDeletingMember,
    startGettingReports,
    loadingReports,
    setActiveReport,
    activeReport,
    cards,
    task,
  };
};
