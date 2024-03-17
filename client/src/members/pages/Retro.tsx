import React, { useEffect, useState } from "react";
import { RetroLayout } from "../../layaout/RetroLayout";
import { FaRegStickyNote, FaRegTrashAlt, FaEdit, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

import { useSocket } from "../hooks/useSocket";
import { NoServer } from "../components/NoServer";
import { useStickyNote } from "../hooks/useStickyNote";
import { StickyModal } from "../components/StickyModal";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { CircularProgress } from "@mui/material";

export const Retro = ({ token, team_id, user_id, scrum_id }) => {
  const {
    retroLoading,
    setRetroLoading,
    addListeners,
    serverStatus,
    questions,
    handleDeleteNote,
    membersConnected,
    handleConnect,
    teamLength,
    stickyNotes,
    completeRetro,
    handleVote,
  } = useSocket();

  const { toggleModal, stickyModal, notes } = useStickyNote();

  const { user } = useAuthSlice();
  console.log(user);

  const [userVotes, setUserVotes] = useState({});
  const [noteValue, setNoteValue] = useState();
  const initialQuestions = {
    c1: "What went well?",
    c2: "What went wrong?",
    c3: "What needs to be improved?",
    c4: "What should we start doing?",
  };
  const [selectedNote, setSelectedNote] = useState();
  const handleDeleteNoteByValue = (v) => {
    handleDeleteNote(v);
  };
  const handleClick = (c) => {
    toggleModal();
    setSelectedNote(c);
  };

  useEffect(() => {
    handleConnect();
  }, []);
  const handleCompleted = () => {
    setRetroLoading(true);
  };
  if (serverStatus === "Disconnected") return <NoServer />;
  return (
    <RetroLayout>
      {stickyModal && <StickyModal handleClick={handleClick} selectedNote={selectedNote} />}

      {user?.role === "admin" && !retroLoading ? (
        <button
          disabled={retroLoading}
          onClick={() => {
            completeRetro(team_id);
            handleCompleted();
          }}
          className={`btn-${retroLoading ? "secondary disabled" : "primary"} flex p-2 my-4 rounded-md justify-center m-auto`}
        >
          Complete Retro
        </button>
      ) : (
        user?.role === "admin" && (
          <div className=' flex p-2 my-4 rounded-md justify-center m-auto'>
            <CircularProgress color='success' />
          </div>
        )
      )}
      <div className='flex justify-center text-center mb-4 font-po'>
        <div className='flex space-x-6'>
          <span className='text-tertiary'>
            Server Status: <span className='text-secondary'>{serverStatus}</span>
          </span>
          <span className='text-tertiary'>Total Members: {teamLength}</span>
          <span className='text-tertiary'>Members Connected: {membersConnected}</span>
        </div>
      </div>

      <section className='flex justify-center m-auto mt-4 font-poppins text-tertiary space-x-2'>
        <section className='grid grid-cols-12 p-2 relative grid-rows-5 gap-5 '>
          {/* Div 1 */}
          <div className='bg-gray-400 relative row-start-1 p-40  overflow-y-scroll px-[300px] row-end-3 col-start-1 col-end-7 rounded-lg text-2xl flex items-center justify-center'>
            {questions?.c1}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 absolute h-full pt-2'>
              {stickyNotes &&
                stickyNotes
                  .filter((note, index, arr) => arr.findIndex((n) => n.value === note.value && n.column === "c1") === index)
                  .map((note, index) => (
                    <>
                      <div
                        key={index}
                        style={{
                          backgroundColor: "rgba(255, 255, 102, 0.7)",
                        }}
                        className='p-3  overflow-y-scroll  md:[130px] md:h-[140px] lg:w-[170px] lg:h-[150px] text-lg relative'
                      >
                        <div className=' text-primary pb-1  md:text-sm lg:text-lg left-2 flex w-full space-x-3'>
                          <button
                            onClick={() => handleVote("c1", "thumb_up", note.value)}
                            style={{ color: userVotes[note.value] === "thumb_up" ? "green" : "black" }}
                            className='flex'
                          >
                            <FaRegThumbsUp />
                            <span className='md:text-[10px] lg:text-sm flex'>({note.thumb_up})</span>
                          </button>
                          <button
                            onClick={() => handleVote("c1", "thumb_down", note.value)}
                            style={{ color: userVotes[note.value] === "thumb_down" ? "red" : "black" }}
                            className='flex'
                          >
                            <FaRegThumbsDown />
                            <span className='md:text-[10px] lg:text-sm flex'>({note.thumb_down})</span>
                          </button>

                          {user_id == note.user_id && (
                            <div className='absolute -bottom-10 right-2 flex space-x-2'>
                              <button onClick={() => handleDeleteNoteByValue(note.value)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          )}
                          {scrum_id == note.user_id && (
                            <div className='absolute   right-2 flex space-x-2'>
                              <button onClick={() => handleDeleteNoteByValue(note.value)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          )}
                        </div>
                        <span
                          className='md:text-xs text-primary lg:text-sm w-[150px]  overflow-y-scroll'
                          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                        >
                          <p>{note.value}</p>
                        </span>
                      </div>
                    </>
                  ))}
            </div>
            <i
              onClick={() => handleClick("c1")}
              className='absolute bottom-1  text-primary duration-500 hover:text-tertiary cursor-pointer animate-pulse right-4'
            >
              <FaRegStickyNote />
            </i>
          </div>
          {/* Div 2 */}
          <div className='bg-gray-400 relative row-start-1 p-40  overflow-y-scroll px-[300px] row-end-3 col-start-7 col-end-13 rounded-lg text-2xl flex items-center justify-center'>
            {questions?.c2}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 absolute h-full pt-2'>
              {stickyNotes &&
                stickyNotes
                  .filter((note, index, arr) => arr.findIndex((n) => n.value === note.value && n.column === "c2") === index)
                  .map((note, index) => (
                    <>
                      <div
                        key={index}
                        style={{
                          backgroundColor: "rgba(255, 255, 102, 0.7)",
                        }}
                        className='p-3  overflow-y-scroll  md:[130px] md:h-[140px] lg:w-[170px] lg:h-[150px] text-lg relative'
                      >
                        <div className=' text-primary pb-1  md:text-sm lg:text-lg left-2 flex w-full space-x-3'>
                          <button
                            onClick={() => handleVote("c2", "thumb_up", note.value)}
                            style={{ color: userVotes[note.value] === "thumb_up" ? "green" : "black" }}
                            className='flex'
                          >
                            <FaRegThumbsUp />
                            <span className='md:text-[10px] lg:text-sm flex'>({note.thumb_up})</span>
                          </button>
                          <button
                            onClick={() => handleVote("c2", "thumb_down", note.value)}
                            style={{ color: userVotes[note.value] === "thumb_down" ? "red" : "black" }}
                            className='flex'
                          >
                            <FaRegThumbsDown />
                            <span className='md:text-[10px] lg:text-sm flex'>({note.thumb_down})</span>
                          </button>

                          {user_id == note.user_id && (
                            <div className='absolute -bottom-10 right-2 flex space-x-2'>
                              <button onClick={() => handleDeleteNoteByValue(note.value)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          )}
                          {scrum_id == note.user_id && (
                            <div className='absolute   right-2 flex space-x-2'>
                              <button onClick={() => handleDeleteNoteByValue(note.value)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          )}
                        </div>
                        <span
                          className='md:text-xs text-primary lg:text-sm w-[150px]  overflow-y-scroll'
                          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                        >
                          <p>{note.value}</p>
                        </span>
                      </div>
                    </>
                  ))}
            </div>
            <i
              onClick={() => handleClick("c2")}
              className='absolute bottom-1  text-primary duration-500 hover:text-tertiary cursor-pointer animate-pulse right-4'
            >
              <FaRegStickyNote />
            </i>
          </div>
          <div className='bg-gray-400 relative p-40  overflow-y-scroll px-[250px] row-start-3 row-end-5 col-start-1 col-end-7 rounded-lg text-2xl flex items-center justify-center'>
            {questions?.c3}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 absolute h-full pt-2'>
              {stickyNotes &&
                stickyNotes
                  .filter((note, index, arr) => arr.findIndex((n) => n.value === note.value && n.column === "c3") === index)
                  .map((note, index) => (
                    <>
                      <div
                        key={index}
                        style={{
                          backgroundColor: "rgba(255, 255, 102, 0.7)",
                        }}
                        className='p-3  overflow-y-scroll  md:[130px] md:h-[140px] lg:w-[170px] lg:h-[150px] text-lg relative'
                      >
                        <div className=' text-primary pb-1  md:text-sm lg:text-lg left-2 flex w-full space-x-3'>
                          <button
                            onClick={() => handleVote("c3", "thumb_up", note.value)}
                            style={{ color: userVotes[note.value] === "thumb_up" ? "green" : "black" }}
                            className='flex'
                          >
                            <FaRegThumbsUp />
                            <span className='md:text-[10px] lg:text-sm flex'>({note.thumb_up})</span>
                          </button>
                          <button
                            onClick={() => handleVote("c3", "thumb_down", note.value)}
                            style={{ color: userVotes[note.value] === "thumb_down" ? "red" : "black" }}
                            className='flex'
                          >
                            <FaRegThumbsDown />
                            <span className='md:text-[10px] lg:text-sm flex'>({note.thumb_down})</span>
                          </button>

                          {user_id == note.user_id && (
                            <div className='absolute -bottom-10 right-2 flex space-x-2'>
                              <button onClick={() => handleDeleteNoteByValue(note.value)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          )}
                          {scrum_id == note.user_id && (
                            <div className='absolute   right-2 flex space-x-2'>
                              <button onClick={() => handleDeleteNoteByValue(note.value)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          )}
                        </div>
                        <span
                          className='md:text-xs text-primary lg:text-sm w-[150px]  overflow-y-scroll'
                          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                        >
                          <p>{note.value}</p>
                        </span>
                      </div>
                    </>
                  ))}
            </div>
            <i
              onClick={() => handleClick("c3")}
              className='absolute bottom-1  text-primary duration-500 hover:text-tertiary cursor-pointer animate-pulse right-4'
            >
              <FaRegStickyNote />
            </i>
          </div>

          {/* Div 4 */}
          <div className='bg-gray-400 relative p-40  overflow-y-scroll px-[250px] row-start-3 row-end-5 col-start-7 col-end-13 rounded-lg text-2xl flex items-center justify-center'>
            {questions?.c4}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 absolute h-full pt-2'>
              {stickyNotes &&
                stickyNotes
                  .filter((note, index, arr) => arr.findIndex((n) => n.value === note.value && n.column === "c4") === index)
                  .map((note, index) => (
                    <>
                      <div
                        key={index}
                        style={{
                          backgroundColor: "rgba(255, 255, 102, 0.7)",
                        }}
                        className='p-3  overflow-y-scroll  md:[130px] md:h-[140px] lg:w-[170px] lg:h-[150px] text-lg relative'
                      >
                        <div className=' text-primary pb-1  md:text-sm lg:text-lg left-2 flex w-full space-x-3'>
                          <button
                            onClick={() => handleVote("c4", "thumb_up", note.value)}
                            style={{ color: userVotes[note.value] === "thumb_up" ? "green" : "black" }}
                            className='flex'
                          >
                            <FaRegThumbsUp />
                            <span className='md:text-[10px] lg:text-sm flex'>({note.thumb_up})</span>
                          </button>
                          <button
                            onClick={() => handleVote("c4", "thumb_down", note.value)}
                            style={{ color: userVotes[note.value] === "thumb_down" ? "red" : "black" }}
                            className='flex'
                          >
                            <FaRegThumbsDown />
                            <span className='md:text-[10px] lg:text-sm flex'>({note.thumb_down})</span>
                          </button>

                          {user_id == note.user_id && (
                            <div className='absolute -bottom-10 right-2 flex space-x-2'>
                              <button onClick={() => handleDeleteNoteByValue(note.value)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          )}
                          {scrum_id == note.user_id && (
                            <div className='absolute   right-2 flex space-x-2'>
                              <button onClick={() => handleDeleteNoteByValue(note.value)}>
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          )}
                        </div>
                        <span
                          className='md:text-xs text-primary lg:text-sm w-[150px]  overflow-y-scroll'
                          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                        >
                          <p>{note.value}</p>
                        </span>
                      </div>
                    </>
                  ))}
            </div>
            <i
              onClick={() => handleClick("c4")}
              className='absolute bottom-1  text-primary duration-500 hover:text-tertiary cursor-pointer animate-pulse right-4'
            >
              <FaRegStickyNote />
            </i>
          </div>
        </section>
      </section>
    </RetroLayout>
  );
};
