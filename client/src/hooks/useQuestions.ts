import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../helpers/apiToken";

export const useQuestions = (token, team_id, user_id) => {
  const navigate = useNavigate();
  const [isSendend, setIsSendend] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const [rangeValues, setRangeValues] = useState([
    {
      id: "question1",
      value: 5,
    },
    {
      id: "question2",
      value: 5,
    },
    {
      id: "question3",
      value: 5,
    },
    {
      id: "question4",
      value: 5,
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRangeValues((prevValues) => [
      ...prevValues.map((item) => (item.id === name ? { ...item, value: parseInt(value, 10) } : item)),
    ]);
    setChangesMade(true);
  };

  const handleNavigateToComment = () => {
    const requestBody = rangeValues.reduce((acc, item, index) => {
      const questionKey = `question${index + 1}`;
      return {
        ...acc,
        [questionKey]: item.value,
      };
    }, {});

    const dailySurvey = {
      team_id: team_id,
      user_id: user_id,
      sprint: 2,
      comment: "",
      ...requestBody,
    };

    navigate(`/members/comments?token=${token}&team_id=${team_id}`, {
      state: { dailySurvey }, // Aquí estás pasando el estado a través de la opción state
    });
  };

  return {
    rangeValues,
    changesMade,
    handleChange,
    loading,
    handleNavigateToComment,
  };
};
