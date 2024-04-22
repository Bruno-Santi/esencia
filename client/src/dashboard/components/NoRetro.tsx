import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigateTo } from "../../hooks/useNavigateTo";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { useDashboard } from "../../hooks/useDashboard";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../members/hooks/useSocket";
import { useCreateRetro } from "../../members/hooks/useCreateRetro";

export const NoRetro = () => {
  const { user } = useAuthSlice();
  const { activeTeam } = useDashboard();
  const scrum_id = user.id;
  const team_id = activeTeam._id;
  const token = localStorage.getItem("authToken");
  const initialQuestions = {
    c1: "¿Qué salió bien?",
    c2: "¿Qué salió mal?",
    c3: "¿Qué necesita ser mejorado?",
    c4: "¿Qué deberíamos comenzar a hacer?",
  };
  const { handleNewRetro } = useCreateRetro();
  const [questions, setQuestions] = useState({ ...initialQuestions });
  const [editMode, setEditMode] = useState(null);

  const handleEditClick = (field) => setEditMode(field);

  const handleSaveClick = () => {
    const trimmedValue = questions[editMode].trim();
    if (trimmedValue === "") {
      setQuestions({ ...questions, [editMode]: initialQuestions[editMode] });
      setEditMode(null);
      return;
    }

    setEditMode(null);
  };

  return (
    <div className='flex mt-6 h-full flex-col   m-auto text-center justify-center '>
      <div className='flex m-auto space-x-6  '>
        <div className='flex-col w-full space-y-6  px-10 '>
          <div className='p-20  w-12/12 h-3/6 text-2xl relative font-poppins rounded-lg shadow-lg bg-tertiary/20 text-primary dark:text-tertiary  dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 dark:shadow-white/10'>
            {editMode === "c1" ? (
              <div>
                <input
                  value={questions.c1}
                  type='text'
                  minLength={5}
                  maxLength={35}
                  onChange={(e) => setQuestions({ ...questions, c1: e.target.value })}
                  autoFocus
                  className='border-b-2  border-gray-500 outline-none bg-transparent dark:text-tertiary text-primary text-center'
                />
                <i
                  className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FaRegSave onClick={handleSaveClick} />{" "}
                </i>
              </div>
            ) : (
              <div className=' whitespace-pre-line '>
                {questions.c1}
                <div className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'>
                  <i
                    className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick("c1");
                    }}
                  >
                    <FaRegEdit />
                  </i>
                </div>
              </div>
            )}
          </div>
          <div className='p-20  w-12/12 h-3/6 text-2xl relative font-poppins rounded-lg shadow-lg bg-tertiary/20 text-primary dark:text-tertiary  dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 dark:shadow-white/10'>
            {editMode === "c3" ? (
              <div>
                <input
                  value={questions.c3}
                  type='text'
                  maxLength={35}
                  onChange={(e) => setQuestions({ ...questions, c3: e.target.value })}
                  autoFocus
                  className='border-b-2  border-gray-500 outline-none dark:text-tertiary bg-transparent text-primary text-center'
                />
                <i
                  className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FaRegSave onClick={handleSaveClick} />{" "}
                </i>
              </div>
            ) : (
              <div className=' whitespace-pre-line '>
                {questions.c3}
                <div className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'>
                  <i
                    className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick("c3");
                    }}
                  >
                    <FaRegEdit />
                  </i>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex-col w-full space-y-6 relative px-10'>
          <div className='p-20 w-12/12 h-3/6 text-2xl font-poppins relative rounded-lg shadow-lg bg-tertiary/20 text-primary dark:text-tertiary dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 dark:shadow-white/10'>
            {editMode === "c2" ? (
              <div>
                <input
                  value={questions.c2}
                  type='text'
                  maxLength={35}
                  onChange={(e) => setQuestions({ ...questions, c2: e.target.value })}
                  autoFocus
                  className='border-b-2  border-gray-500 outline-none bg-transparent text-primary  dark:text-tertiary text-center'
                />
                <i
                  className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FaRegSave onClick={handleSaveClick} />{" "}
                </i>
              </div>
            ) : (
              <div className=' whitespace-pre-line '>
                {questions.c2}
                <div className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'>
                  <i
                    className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick("c2");
                    }}
                  >
                    <FaRegEdit />
                  </i>
                </div>
              </div>
            )}
          </div>
          <div className='p-20 text-2xl w-12/12 h-3/6 font-poppins relative rounded-lg shadow-lg bg-tertiary/20 text-primary  dark:text-tertiary dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 dark:shadow-white/10'>
            {editMode === "c4" ? (
              <div>
                <input
                  value={questions.c4}
                  type='text'
                  maxLength={35}
                  onChange={(e) => setQuestions({ ...questions, c4: e.target.value })}
                  autoFocus
                  className='border-b-2  border-gray-500 outline-none bg-transparent dark:text-tertiary text-primary text-center'
                />
                <i
                  className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FaRegSave onClick={handleSaveClick} />
                </i>
              </div>
            ) : (
              <div className=' whitespace-pre-line '>
                {questions.c4}
                <div className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'>
                  <i
                    className='text-secondary duration-700 hover:text-primary cursor-pointer absolute bottom-4 right-4'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick("c4");
                    }}
                  >
                    <FaRegEdit />
                  </i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=''>
        <button
          onClick={() => {
            console.log("me click");
            console.log(token, team_id, scrum_id, questions);

            handleNewRetro(token, team_id, scrum_id, questions);
          }}
          className='btn-primary  duration-700 hover:bg-primary p-4 mt-16 rounded-md text-lg  '
        >
          Comenzar
        </button>
      </div>
    </div>
  );
};
