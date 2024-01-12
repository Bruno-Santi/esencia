import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigateTo } from "../../hooks/useNavigateTo";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { useDashboard } from "../../hooks/useDashboard";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../members/hooks/useSocket";

export const NoRetro = () => {
  const { sendRetroToServer, completeRetro, handleSendRetro } = useSocket();
  const initialQuestions = {
    c1: "What went well?",
    c2: "What went wrong?",
    c3: "What need to be improved?",
    c4: "What should we start doing?",
  };
  const navigate = useNavigate();
  const [questions, setQuestions] = useState({ ...initialQuestions });
  const [editMode, setEditMode] = useState(null);
  const { user } = useAuthSlice();
  const { activeTeam } = useDashboard();
  const token = localStorage.getItem("authToken");
  const handleEditClick = (field) => setEditMode(field);
  const handleNavigateTo = useNavigateTo();
  const handleSaveClick = () => {
    const trimmedValue = questions[editMode].trim();
    if (trimmedValue === "") {
      setQuestions({ ...questions, [editMode]: initialQuestions[editMode] });
      setEditMode(null);
      return;
    }

    setEditMode(null);
  };
  const handleSubmit = () => {
    console.log({ questions });
    const functionThatReturnPromise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    toast.promise(functionThatReturnPromise, {
      pending: "Sending retro",
      success: "Retro sended successfully. Redirecting... 👌",
      error: "Promise rejected 🤯",
    });
  };

  return (
    <div className='flex mt-6 h-full flex-col m-auto text-center justify-center'>
      <div className='flex m-auto space-x-6'>
        <div className='flex-col w-full space-y-6 relative px-10 '>
          <div className='p-20 w-12/12 h-3/6 text-2xl font-poppins rounded-lg relative shadow-lg bg-gray-300/80 text-primary'>
            {editMode === "c1" ? (
              <div>
                <input
                  value={questions.c1}
                  type='text'
                  minLength={5}
                  maxLength={35}
                  onChange={(e) => setQuestions({ ...questions, c1: e.target.value })}
                  autoFocus
                  className='border-b-2  border-gray-500 outline-none bg-transparent text-primary text-center'
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
          <div className='p-20  w-12/12 h-3/6 text-2xl relative font-poppins rounded-lg shadow-lg bg-gray-300/80 text-primary'>
            {editMode === "c3" ? (
              <div>
                <input
                  value={questions.c3}
                  type='text'
                  maxLength={35}
                  onChange={(e) => setQuestions({ ...questions, c3: e.target.value })}
                  autoFocus
                  className='border-b-2  border-gray-500 outline-none bg-transparent text-primary text-center'
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
          <div className='p-20 w-12/12 h-3/6 text-2xl font-poppins relative rounded-lg shadow-lg bg-gray-300/80 text-primary'>
            {editMode === "c2" ? (
              <div>
                <input
                  value={questions.c2}
                  type='text'
                  maxLength={35}
                  onChange={(e) => setQuestions({ ...questions, c2: e.target.value })}
                  autoFocus
                  className='border-b-2  border-gray-500 outline-none bg-transparent text-primary text-center'
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
          <div className='p-20 text-2xl w-12/12 h-3/6 font-poppins relative rounded-lg shadow-lg bg-gray-300/80 text-primary'>
            {editMode === "c4" ? (
              <div>
                <input
                  value={questions.c4}
                  type='text'
                  maxLength={35}
                  onChange={(e) => setQuestions({ ...questions, c4: e.target.value })}
                  autoFocus
                  className='border-b-2  border-gray-500 outline-none bg-transparent text-primary text-center'
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
            console.log(activeTeam._id);

            handleSendRetro(initialQuestions, activeTeam._id);
          }}
          className='btn-primary  duration-700 hover:bg-primary p-4 mt-16 rounded-md text-lg  '
        >
          Send Retro
        </button>

      </div>
    </div>
  );
};
