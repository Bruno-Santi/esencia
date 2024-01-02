import { useQuestions } from "../../hooks";
import { questions } from "../data/questions";

export const Questions = (team_id, token) => {
  //@ts-expect-error 'efefe'
  const { rangeValues, changesMade, handleChange, handleSubmit } = useQuestions(team_id, token);
  return (
    <div className='flex flex-col'>
      <div className='w-4/6 m-auto flex flex-col mt-12 h-fit bg-gray-600 rounded-md'>
        {questions.map(({ id, question }) => (
          <div
            key={id}
            className='flex flex-col lg:p-6 md:p-2 lg:space-y-4 md:space-y-2 text-xl text-center text-tertiary font-poppins justify-center'
          >
            {question}
            <div className='flex items-center justify-between'>
              <span role='img' className='lg:text-3xl md:text-lg' aria-label='Sad Emoji'>
                😟
              </span>
              <label
                htmlFor={`minmax-range-${id}`}
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '
              >
                {rangeValues.map(({ id: valueId, value }) => {
                  return valueId === id ? (
                    <div className='border-2 mt-2 rounded-full  border-secondary w-8 h-8'>
                      <span key={valueId} className='text-xl '>
                        {value}
                      </span>
                    </div>
                  ) : null;
                })}
              </label>
              <span role='img' className='text-3xl' aria-label='Happy Emoji'>
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
              className=' custom-range'
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!changesMade}
        className={
          changesMade
            ? "btn-primary font-poppins p-2 w-[150px] m-auto mt-6 rounded-md"
            : "btn-secondary font-poppins cursor-not-allowed p-2 w-[150px] m-auto mt-6 rounded-md"
        }
      >
        Continue
      </button>
    </div>
  );
};
