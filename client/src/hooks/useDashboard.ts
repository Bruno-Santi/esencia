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
  onSetAssessment,
} from "../store/dashboard/dashboardSlice";

import { UserTeams } from "../store/dashboard/interfaces";
import { useModal, useNavigateTo } from ".";
import { useState } from "react";
import api, { baseURL } from "../helpers/apiToken";
import { getTeamData } from "../helpers/getTeamData";

import { getRandomColor, toastSuccess, toastWarning } from "../helpers";
import { toast } from "react-toastify";
import axios from "axios";
import { finalRandomizedQuestions, generateRandomQuestions } from "../members/data/questions";
import { Toast } from "react-toastify/dist/components";

export const useDashboard = () => {
  const { handleNavigate } = useNavigateTo();
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
    assessment,
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
    handleNavigate("/dashboard");
    toast.promise(startGettingDataFunc(id, sprint, triggered), {
      pending: "Buscando nueva información 🕐",
      success: "Información recibida correctamente! 🎉",
      error: "Hubo un problema al recibir la información. 😢",
    });
  };
  const startGettingDataFunc = async (id, sprint, triggered) => {
    try {
      console.log(sprint);
      console.log(activeTeam);
      console.log(id);
      await startGettingAssessment(id);
      const members = await startGettingMembers(id);
      console.log(members.members.length);

      const surveyData = await getTeamData(id, members.members.length);
      await startGettingReports(id, sprint);
      console.log(surveyData);

      if (surveyData === "No existe data de este equipo") toast.warning("No existe data de este equipo 😢");
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
              metricsForToday: surveyData.pie_chart || {},
              linesMetrics: surveyData.lines_graph || {},
              dataAmount: surveyData.data_amount || [],
              shortRecomendation: surveyData.short_recommendation || {},
              topics: surveyData.topics || [],
              cards: surveyData.cards || [],
              task: surveyData.task || [],
            })
          );
        }
        dispatch(
          onSaveMetricsForToday({
            metricsForToday: surveyData.pie_chart || {},
            linesMetrics: surveyData.lines_graph || {},
            dataAmount: surveyData.data_amount || [],
            shortRecomendation: surveyData.short_recommendation || {},
            topics: surveyData.topics || [],
            cards: surveyData.cards || [],
            task: surveyData.task || [],
          })
        );
      }

      const dataToSave = {
        metricsForToday: surveyData.pie_chart || {},
        linesMetrics: surveyData.lines_graph || {},
        dataAmount: surveyData.data_amount || [],
        shortRecomendation: surveyData.short_recommendation || "",
        topics: surveyData.topics || [],
        cards: surveyData.cards || [],
        task: surveyData.task || [],
      };

      localStorage.setItem("surveyData", JSON.stringify(dataToSave));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(onSetDataLoading(false));
    }
  };

  const startGettingAssessment = async (teamID) => {
    try {
      const resp = await api.get(`/api/agileassessment/${teamID}`);
      dispatch(onSetAssessment(resp));

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const startCleaningActiveTeam = () => {
    dispatch(cleanActiveTeam());
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
    await startSettingTeams();
    await starGettingData(String(id), sprint);
    await startGettingAssessment(id);
    await startGettingReports(String(id), sprint);
  };
  const startGettingReports = async (team_id, sprint) => {
    setLoadingReports(true);
    try {
      const { data } = await api.get(`/api/sprintreport/${team_id}/`);
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

      await startGettingMembers(teamId);
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
      return error;
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

      if (members?.length === 0) {
        toastWarning(`The team ${teamName} doesn't have any member.`);
        setSurveyLoading(false);
      } else {
        console.log("holis");

        const response = await api.post(`/api/survey/day-survey/`, data);
        console.log(response);

        setSurveyLoading(false);
        return toastSuccess(`Encuesta de pulso enviada a: ${teamName}`);
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
      toast.success(`${memberName} eliminado correctamente.`);
      await startGettingMembers(teamId);
      console.log(resp);
    } catch (error) {
      console.log(error);
      toast.warning("Hubo un problema al eliminar al miembro.");
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
    startCleaningActiveTeam,
    assessment,
  };
};
