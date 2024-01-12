import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FinishedSurvey = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("team_id");
    localStorage.removeItem("userToken");
    return () => {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    };
  }, []);

  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h2 className='font-poppins text-6xl text-tertiary mb-4'>Congratulations!</h2>
        <span className='text-tertiary font-poppins text-2xl'>Thanks for your feedback</span>
      </div>
    </div>
  );
};
