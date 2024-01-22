import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyLayout } from "../../layaout";
import { useLocation } from "react-router-dom";
import { useNavigateTo } from "../../hooks";
import api from "../../helpers/apiToken";

import { toast } from "react-toastify";

export const AdditionalComments = () => {
  const { handleNavigate } = useNavigateTo();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [loading, setLoading] = useState(false);
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
  const sendFunction = async (data) => {
    if (userToken) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      setLoading(true);
      try {
        const resp = await api.post("/api/survey", data, { headers });

        navigate("/members/finished");

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...dailySurvey,
      comment: comment || "",
    };

    toast.promise(sendFunction(data), {
      pending: "Enviando encuesta... ⏳",
      success: "Encuesta enviada!. Redireccionando...🚀",
      error: "Error al enviar la encuesta ☹️",
    });
  };

  return (
    <SurveyLayout>
      <div className='lg:w-4/6 md:w-4/6 sm:w-5/6 m-auto flex flex-col mt-12 md:h-[25em] sm:h-5/6 bg-gray-600 rounded-md text-tertiary font-poppins'>
        <span className='m-auto md:my-8 lg:mt-16 sm:p-6 md:p-0 lg:p-0 sm:text-center md:text-lg lg:text-2xl'>
          ¿Te gustaría dejar algún comentario adicional?
        </span>
        <textarea
          onChange={handleCommentChange}
          placeholder='Deja tu comentario aquí.'
          className='bg-white rounded-md lg:w-5/6 lg:h-3/6  md:w-5/6 md:h-3/6 sm:h-1/6 sm:w-5/6  p-4 mb-2 sm:mb-6 flex m-auto text-primary placeholder:sm:text-sm'
        ></textarea>
        <div className='lg:flex-row md:flex-row md:w-3/4 lg:w-2/4 sm:w-full mx-auto sm:flex-col sm:flex  sm:mb-4 '>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className='btn-secondary lg:mb-12 md:mb-12 sm:mb-4 p-2 md:w-1/3 lg:w-1/3 sm:w-2/3 rounded-md m-auto'
          >
            Omitir
          </button>
          <button
            disabled={!comment || loading}
            onClick={handleSubmit}
            className={
              comment || loading
                ? "btn-primary mb-12 p-2 md:w-1/3 lg:w-1/3 sm:w-2/3 rounded-md m-auto"
                : "btn-secondary mb-12 p-2 md:w-1/3 lg:w-1/3 sm:w-2/3 rounded-md m-auto"
            }
          >
            Continuar
          </button>
        </div>
      </div>
    </SurveyLayout>
  );
};
