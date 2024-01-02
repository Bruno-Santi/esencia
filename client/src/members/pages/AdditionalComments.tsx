import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyLayout } from "../../layaout";
import { useLocation } from "react-router-dom";
import { useNavigateTo } from "../../hooks";
import { baseURL } from "../../helpers/apiToken";
import axios from "axios";

export const AdditionalComments = () => {
  const { handleNavigate } = useNavigateTo();
  const navigate = useNavigate();
  const location = useLocation();
  const dailySurvey = location.state?.dailySurvey || {};
  const [comment, setComment] = useState<string>(dailySurvey.comment || "");
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

  // ? AFTER_BRUNO

  // const handleSubmit = (e: SyntheticEvent) => {
  //   e.preventDefault();

  //   const updatedFinalBody = {
  //     ...dailySurvey,
  //     comment: comment,
  //   };
  //   navigate("/members/finished");
  //   console.log(updatedFinalBody);
  // };

  // ? END

  //% FACU_EDIT

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const team_id = searchParams.get("team_id");
    setParams({ token, team_id });
  }, []);

  const [params, setParams] = useState({ token: "", team_id: "" });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${baseURL}/survey/daily_survey_comment?comment=${comment}&team_id=${params.team_id}`,
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => console.log(JSON.stringify(response.data)))
      .catch((error) => console.log(error));

    navigate("/members/finished");
  };

  //% END

  return (
    <SurveyLayout>
      <div className='w-4/6 m-auto flex flex-col mt-12 h-3/6 bg-gray-600 rounded-md text-tertiary font-poppins'>
        <span className='m-auto md:mt-8 lg:mt-16 md:text-lg lg:text-2xl'>
          Would you like to leave any additional comments?
        </span>
        <textarea
          onChange={handleCommentChange}
          placeholder='Put any comment here...'
          className='bg-white rounded-md w-5/6 h-1/3 p-4 flex m-auto text-primary'
        ></textarea>
        <div className='flex w-1/3 space-x-6 m-auto'>
          <button
            onClick={() => handleNavigate("/members/finished")}
            className='btn-secondary mb-12 p-2 w-[150px] rounded-md m-auto'
          >
            Skip
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
            Continue
          </button>
        </div>
      </div>
    </SurveyLayout>
  );
};
