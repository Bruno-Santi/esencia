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
    console.log(user_id);
    console.log(scrum_id);

    setParams({ token, team_id, user_id, scrum_id });
  }, []);

  // Obtener valores del localStorage

  if (params.team_id && params.token) {
    return <Retro token={params.token} team_id={params.team_id} user_id={params.user_id} scrum_id={params.scrum_id} />;
  } else {
    return null;
  }
};

export default RetroWrapper;
