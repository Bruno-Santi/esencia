import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Survey } from "../pages";
import { SurveyAlreadyExist } from "../pages/SurveyAlreadyExist";

const SurveyWrapper = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const [params, setParams] = useState({ token: "", team_id: "", user_id: "" });

  if (searchParams.get("token") !== null) localStorage.setItem("userToken", searchParams.get("token"));

  useEffect(() => {
    const token = searchParams.get("token");
    const team_id = searchParams.get("team_id");
    const user_id = searchParams.get("user_id");
    const scrum_id = searchParams.get("scrum_id");

    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("team_id", JSON.stringify(team_id));
    localStorage.setItem("user_id", JSON.stringify(user_id));
    localStorage.setItem("scrum_id", JSON.stringify(scrum_id));

    setParams({ token, team_id, user_id });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // `http://localhost:3000
        // `https://esencia-api.onrender.com`
        const response = await axios.get(`http://localhost:3000/api/survey/${params.team_id}/${params.user_id}`, {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        });
        console.log(response);

        if (response.data.survey === "found") {
          navigate("/members/survey-exist");
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };

    if (params.team_id && params.user_id && params.token) {
      fetchData();
    }
  }, [params.team_id, params.user_id, params.token, history]);

  if (params.team_id && params.token) {
    return <Survey token={params.token} team_id={params.team_id} user_id={params.user_id} />;
  } else {
    return null;
  }
};

export default SurveyWrapper;
