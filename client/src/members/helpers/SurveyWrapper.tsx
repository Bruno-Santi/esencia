import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Survey } from "../pages";
import api from "../../helpers/apiToken";
import { useState, useEffect } from "react";

const SurveyWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useState({ token: "", team_id: "", user_id: "" });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log("hola");

    const token = searchParams.get("token");
    const team_id = searchParams.get("team_id");
    const user_id = searchParams.get("user_id");
    setParams({ token, team_id, user_id });
  }, []);

  if (params && params.team_id && params.token) {
    return <Survey token={params.token} team_id={params.team_id} user_id={params.user_id} />;
  } else return null;
};
export default SurveyWrapper;
