import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../hooks";
import { finalRandomizedQuestions as questions } from "../data/questions";
import { useEffect } from "react";

export const Questions = ({ token, team_id, user_id }) => {
  const navigate = useNavigate();
  const { rangeValues, changesMade, handleChange, loading, handleNavigateToComment } = useQuestions(
    token,
    team_id,
    user_id,
    questions
  );

  const handleContinue = () => {
    if (changesMade) {
      navigate("/members/comments", {
        state: { dailySurvey: { team_id, sprint: 2, comment: "", ...getRangeValuesObject() } },
      });
    }
  };

  const getRangeValuesObject = () => {
    return questions.reduce((acc, { id }) => {
      return {
        ...acc,
        [id]: rangeValues.find((item) => item.id === id)?.value || 0,
      };
    }, {});
  };

  return (
    <div className='flex flex-col sm:p-4 md:w-4/6  m-auto'>
      <div className='sm:w-full m-auto flex flex-col mt-6 h-fit bg-gray-600 rounded-md p-2 '>
        {questions.map(({ id, question }) => (
          <div
            key={id}
            className='flex flex-col lg:p-6 md:p-2 lg:space-y-4 md:space-y-2 lg:text-xl md:text-[18px] sm:text-[18px] text-center text-tertiary font-poppins justify-center'
          >
            {question}
            <div className='flex items-center justify-between'>
              <span role='img' className='lg:text-3xl md:text-lg sm:text-lg' aria-label='Sad Emoji'>
                😟
              </span>
              <label
                htmlFor={`minmax-range-${id}`}
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '
              >
                {rangeValues.map(({ id: valueId, value }) => {
                  return valueId === id ? (
                    <div className='border-2 mt-2 rounded-full  border-secondary w-8 h-8'>
                      <span key={valueId} className='text-xl'>
                        {value}
                      </span>
                    </div>
                  ) : null;
                })}
              </label>
              <span role='img' className='lg:text-3xl md:text-lg sm:text-lg' aria-label='Happy Emoji'>
                😊
              </span>
            </div>
            <input
              onChange={handleChange}
              name={id}
              value={rangeValues.find((item) => item.id === id)?.value || 0}
              id={`minmax-range-${id}`}
              type='range'
              min='0'
              max='10'
              className=' custom-range my-4'
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleNavigateToComment}
        disabled={!changesMade || loading}
        className={
          changesMade && !loading
            ? "btn-primary font-poppins p-2 w-[150px] m-auto mt-6 rounded-md"
            : "btn-secondary font-poppins cursor-not-allowed p-2 w-[150px] m-auto mt-6 rounded-md"
        }
      >
        Continuar
      </button>
    </div>
  );
};
