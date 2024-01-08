import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Survey } from "../pages";

const SurveyWrapper = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [params, setParams] = useState({ token: "", team_id: "", user_id: "" });
  if (searchParams.get("token") !== null) localStorage.setItem("userToken", searchParams.get("token"));
  useEffect(() => {
    const token = searchParams.get("token");
    const team_id = searchParams.get("team_id");
    const user_id = searchParams.get("user_id");

    setParams({ token, team_id, user_id });
  }, []);

  if (params.team_id && params.token) {
    return <Survey token={params.token} team_id={params.team_id} user_id={params.user_id} />;
  } else {
    return null;
  }
};

export default SurveyWrapper;
