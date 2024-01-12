import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Retro, Survey } from "../pages";

const RetroWrapper = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [params, setParams] = useState({ token: "", team_id: "", user_id: "", scrum_id: "" });

  useEffect(() => {
    const token = searchParams.get("token");
    const team_id = searchParams.get("team_id");
    const user_id = searchParams.get("user_id");
    const scrum_id = searchParams.get("scrum_id");

    localStorage.setItem("token", token);
    localStorage.setItem("team_id", team_id);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("scrum_id", scrum_id);
    console.log("team_id: " + team_id);

    setParams({ token, team_id, user_id, scrum_id });
  }, []);

  // Obtener valores del localStorage
  const storedToken = localStorage.getItem("token");
  const storedTeamId = localStorage.getItem("team_id");
  const storedUserId = localStorage.getItem("user_id");
  const storedScrumId = localStorage.getItem("scrum_id");
  console.log(storedUserId, storedTeamId);

  if (storedTeamId && storedToken) {
    return <Retro token={storedToken} team_id={storedTeamId} user_id={storedUserId} scrum_id={storedScrumId} />;
  } else {
    return null;
  }
};

export default RetroWrapper;
