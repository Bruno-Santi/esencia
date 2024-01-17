import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyLayout } from "../../layaout";
import { useLocation } from "react-router-dom";
import { useNavigateTo, useQuestions } from "../../hooks";
import api, { baseURL } from "../../helpers/apiToken";
import axios from "axios";

export const AdditionalComments = () => {
  const { handleNavigate } = useNavigateTo();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const location = useLocation();
  const dailySurvey = location.state?.dailySurvey;
  const [comment, setComment] = useState<string>(dailySurvey.comment || "");
  useEffect(() => {
    console.log(dailySurvey);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to leave?");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    console.log("Received finalBody:", dailySurvey);
  }, [dailySurvey]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  //% FACU_EDIT

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const team_id = searchParams.get("team_id");
    setParams({ token, team_id });
  }, []);

  const [params, setParams] = useState({ token: "", team_id: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...dailySurvey,
      comment: comment || "",
    };

    if (userToken) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      try {
        const resp = await api.post("/api/survey", data, { headers });
        navigate("/members/finished");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("No se encontró el token del usuario en el localStorage");
    }
  };

  return (
    <SurveyLayout>
      <div className='w-4/6 m-auto flex flex-col mt-12 h-3/6 bg-gray-600 rounded-md text-tertiary font-poppins'>
        <span className='m-auto md:mt-8 lg:mt-16 md:text-lg lg:text-2xl'>
          ¿Te gustaría dejar algún comentario adicional?
        </span>
        <textarea
          onChange={handleCommentChange}
          placeholder='Deja tu comentario aquí.'
          className='bg-white rounded-md w-5/6 h-1/3 p-4 flex m-auto text-primary'
        ></textarea>
        <div className='flex w-1/3 space-x-6 m-auto'>
          <button
            onClick={() => handleNavigate("/members/finished")}
            className='btn-secondary mb-12 p-2 w-[150px] rounded-md m-auto'
          >
            Omitir
          </button>
          <button
            disabled={!comment}
            onClick={handleSubmit}
            className={
              comment
                ? "btn-primary mb-12 p-2 w-[150px] rounded-md m-auto"
                : "btn-secondary mb-12 p-2 w-[150px] rounded-md m-auto"
            }
          >
            Continuar
          </button>
        </div>
      </div>
    </SurveyLayout>
  );
};
