import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import { useDashboard } from "../../hooks/useDashboard";
export const FinishedSurvey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startSettingActiveTeam, activeTeam } = useDashboard();
  console.log(location.pathname);
  const scrum_id = localStorage.getItem("scrum_id");
  useEffect(() => {
    if (scrum_id) startSettingActiveTeam(activeTeam);
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
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <ConfettiExplosion duration={3000} particleCount={250} />
        <h2 className='font-poppins sm:w-full lg:w-2/3 md:w-2/3 md:text-5xl lg:text-5xl sm:text-4xl text-tertiary mb-4 justify-center text-center'>
          ¡Felicitaciones has completado con éxito la {location.pathname === "/members/finished" ? `encuesta` : `retro`}!
        </h2>

        <span className='text-tertiary font-poppins text-2xl'>Gracias por tu feedback.</span>
      </div>
    </div>
  );
};
