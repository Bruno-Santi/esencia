import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../helpers/apiToken";

export const useQuestions = (token, team_id, user_id, randomizedQuestions) => {
  const navigate = useNavigate();

  const [changesMade, setChangesMade] = useState(false);
  const [loading, setLoading] = useState();

  const [rangeValues, setRangeValues] = useState(
    randomizedQuestions.map((question) => ({
      id: question.id,
      value: 5,
    }))
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRangeValues((prevValues) => [
      ...prevValues.map((item) => (item.id === name ? { ...item, value: parseInt(value, 10) } : item)),
    ]);
    setChangesMade(true);
  };

  const handleNavigateToComment = () => {
    const transformedQuestions = rangeValues.reduce((acc, item, index) => {
      const questionData = randomizedQuestions.find((q) => q.id === item.id);

      if (questionData) {
        return [
          ...acc,
          {
            id: item.id,
            content: questionData.question,
            value: item.value / 10,
          },
        ];
      }
      return acc;
    }, []);

    const dailySurvey = {
      team_id: team_id,
      user_id: user_id,
      sprint: 2,
      comment: "",
      ...transformedQuestions.reduce((acc, item) => {
        acc[item.id] = { content: item.content, value: item.value };
        return acc;
      }, {}),
    };
    console.log(dailySurvey);

    navigate(`/members/comments?token=${token}&team_id=${team_id}`, {
      state: { dailySurvey },
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
