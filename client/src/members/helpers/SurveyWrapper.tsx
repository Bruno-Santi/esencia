import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Survey } from "../pages";
import api from "../../helpers/apiToken";
import { useState, useEffect } from "react";

const SurveyWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useState({ token: "", team_id: "" });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const team_id = searchParams.get("team_id");
    setParams({ token, team_id });
  }, []);

  if (params && params.team_id && params.token) {
    return <Survey team_id={params.token} token={params.team_id} />;
  } else return null;
};
export default SurveyWrapper;
