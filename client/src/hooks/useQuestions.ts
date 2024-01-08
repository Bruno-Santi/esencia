import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigateTo } from ".";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../helpers/apiToken";

export const useQuestions = ({ token, team_id, user_id }) => {
  const navigate = useNavigate();
  const [isSendend, setIsSendend] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [loading, setLoading] = useState();
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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (isSendend) return;

    const requestBody = rangeValues.reduce((acc, item, index) => {
      const questionKey = `question${index + 1}`;
      return {
        ...acc,
        [questionKey]: item.value,
      };
    }, {});

    const dailySurvey = {
      team_id: team_id,
      sprint: 2,
      comment: "",
      ...requestBody,
    };
    const { question1, question2, question3, question4 } = requestBody;
    setLoading(true);
    try {
      const resp = await api.post(`/api/survey`, {
        user_id,
        team_id,
        sprint: 1,
        comment: "",
        question1,
        question2,
        question3,
        question4,
      });
      console.log("todo bien " + resp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    setIsSendend(true);

    // navigate("/members/comments", { state: { dailySurvey } });

    //% FACU_EDIT
    //! Estás cambiando el "team_id" por "token"?

    navigate(`/members/comments?token=${token}&team_id=${team_id}`, {
      state: { dailySurvey },
    });
  };
  //% END

  return {
    rangeValues,
    changesMade,
    handleChange,
    handleSubmit,
    loading,
  };
};
