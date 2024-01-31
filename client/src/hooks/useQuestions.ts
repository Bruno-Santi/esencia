import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useQuestions = (token, team_id, user_id) => {
  const navigate = useNavigate();
  const [changesMade, setChangesMade] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [questions, setQuestions] = useState([]);
  const [rangeValues, setRangeValues] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await axios.get(`https://esencia-api.onrender.com/api/survey/day-survey/team/${team_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(response.data.questions);
      console.log(response.data.questions);

      setLoading(false); // Set loading to false after successfully fetching data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getQuestions();
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Update rangeValues when questions are updated
    setRangeValues(
      questions?.map((question) => ({
        id: question.id,
        value: 5,
      })) || []
    );
  }, [questions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRangeValues((prevValues) => prevValues.map((item) => (item.id === name ? { ...item, value: parseInt(value, 10) } : item)));
    setChangesMade(true);
  };

  const handleNavigateToComment = () => {
    const transformedQuestions = rangeValues.reduce((acc, item, index) => {
      const questionData = questions.find((q) => q.id === item.id);

      if (questionData) {
        return {
          ...acc,
          [questionData.id]: {
            content: questionData.content,
            cuadrant_cohef: questionData.cuadrant_cohef,
            value: item.value / 10,
          },
        };
      }
      return acc;
    }, {});

    const dailySurvey = {
      team_id: team_id,
      user_id: user_id,
      comment: "",
      ...transformedQuestions,
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
    questions,
  };
};
