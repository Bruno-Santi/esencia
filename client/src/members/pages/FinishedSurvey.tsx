import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FinishedSurvey = () => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("team_id");
      localStorage.removeItem("userToken");
    };
  }, []);

  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h2 className='font-poppins  w-2/3 text-5xl text-tertiary mb-4 justify-center text-center'>
          ¡Felicitaciones has completado con éxito la encuesta!
        </h2>
        <span className='text-tertiary font-poppins text-2xl'>Gracias por tu feedback.</span>
      </div>
    </div>
  );
};
