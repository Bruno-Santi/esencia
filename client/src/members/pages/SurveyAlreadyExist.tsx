import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SurveyAlreadyExist = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("team_id");
      localStorage.removeItem("userToken");
    };
  }, []);
  return (
    <div className='bg-primary h-screen flex flex-col m-auto items-center justify-center'>
      <p className='text-tertiary text-5xl w-2/3 text-center'>Ya realizaste la encuesta el día de hoy.</p>
      <p className='text-secondary text-3xl mt-6'>Vuelve mañana. 🚀</p>
    </div>
  );
};
