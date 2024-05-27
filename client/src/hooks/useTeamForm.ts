import React, { useState } from "react";
import api from "../helpers/apiToken";
import { useAuthSlice } from "./useAuthSlice";
import { toastSuccess, toastWarning } from "../helpers";
import { useDashboard } from "./useDashboard";
import { TbRuler2 } from "react-icons/tb";
import { useNavigateTo } from "./useNavigateTo";
import { onSetActiveTeam, onSetAssessment } from "../store/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";

export const useTeamForm = () => {
  const dispatch = useDispatch();
  const [teamCreated, setTeamCreated] = useState(false);
  const [teamCreatedData, setTeamCreatedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const { handleNavigate } = useNavigateTo();
  const { user } = useAuthSlice();
  const { startSettingTeams } = useDashboard();
  const createTeam = async (
    name,
    logo = "https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1701895638/team-logo_2_fq5yev.png",
    handleNext
  ) => {
    setLoading(true);
    if (!name) {
      setLoading(false);
      return toastWarning("Debe ingresar un nombre de equipo.");
    }
    try {
      setLoading(false);
      if (!name.trim().length) return toastWarning("Debe ingresar un nombre de equipo.");
      const newTeamData = { name, logo };

      const data = await api.post(`/api/team/${user.id}`, newTeamData);
      console.log(data);

      await startSettingTeams();
      toastSuccess(`Equipo ${name} creado con éxito.`);
      setTeamCreated(true);
      setTeamCreatedData(data);
      handleNext();
      localStorage.setItem("firstLogging", "1");
      return {
        created: "ok",
      };
    } catch (error) {
      setTeamCreated(false);
      setLoading(false);
      return toastWarning(`El equipo ${name} ya existe.`);
    }
  };
  const startCreatingAssessment = async (data) => {
    setGeneratingReport(true);
    console.log(data);

    try {
      const resp = await api.post(`/api/agileassessment/${data.teamID}`, data);
      dispatch(onSetAssessment(resp));
      console.log(data);

      console.log(resp);

      setGeneratingReport(false);
      setReportGenerated(true);
      startSettingTeams();
      onSetActiveTeam(data.teamId);
      localStorage.setItem("firstLogging", JSON.stringify(1));
      handleNavigate("/dashboard/assessment");
    } catch (error) {
      setGeneratingReport(false);
      setReportGenerated(false);
      console.log(error);
    }
  };
  return {
    createTeam,
    loading,
    teamCreated,
    teamCreatedData,
    startCreatingAssessment,
    reportGenerated,
    generatingReport,
  };
};
