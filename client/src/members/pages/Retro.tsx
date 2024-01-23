import React, { useEffect, useState } from "react";
import { RetroLayout } from "../../layaout/RetroLayout";
import { FaRegStickyNote, FaRegTrashAlt, FaEdit, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

import { useSocket } from "../hooks/useSocket";
import { NoServer } from "../components/NoServer";
import { useStickyNote } from "../hooks/useStickyNote";
import { StickyModal } from "../components/StickyModal";
import { useAuthSlice } from "../../hooks/useAuthSlice";

export const Retro = ({ token, team_id, user_id, scrum_id }) => {
  const {
    addListeners,
    serverStatus,
    handleDeleteNote,
    membersConnected,

    teamLength,
    stickyNotes,
    completeRetro,
    handleVote,
  } = useSocket();

  const { toggleModal, stickyModal, notes } = useStickyNote();

  const { user } = useAuthSlice();

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
    addListeners();
  }, []);

  if (serverStatus === "Disconnected") return <NoServer />;
  return (
    <RetroLayout>
      {stickyModal && <StickyModal handleClick={handleClick} selectedNote={selectedNote} />}

      {user && (
        <button
          onClick={() => completeRetro(team_id)}
          className='btn-primary flex p-2 my-4 rounded-md justify-center m-auto'
        >
          Complete Retro
        </button>
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
          <div className='bg-gray-400 relative row-start-1 p-40 px-60 row-end-3 col-start-1 col-end-7 rounded-lg text-2xl flex items-center justify-center'>
            {initialQuestions.c1}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 absolute'>
              {stickyNotes &&
                stickyNotes
                  .filter(
                    (note, index, arr) => arr.findIndex((n) => n.value === note.value && n.column === "c1") === index
                  )
                  .map((note, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "rgba(255, 255, 102, 0.7)", // Amarillo pastel
                        // Otras propiedades de estilo que desees agregar
                      }}
                      className='text-primary p-1 grid grid-cols-5 grid-rows-5 md:[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] text-lg relative'
                    >
                      <span
                        className='md:text-xs lg:text-sm w-[120px]'
                        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                      >
                        {note.value}
                      </span>

                      <div className='absolute bottom-0 left-2 flex space-x-2'>
                        <button
                          onClick={() => handleVote("c1", "thumb_up", note.value)}
                          style={{ color: userVotes[note.value] === "thumb_up" ? "green" : "black" }}
                        >
                          <FaRegThumbsUp />
                          <span className='text-xs flex'>({note.thumb_up})</span>
                        </button>
                        <button
                          onClick={() => handleVote("c1", "thumb_down", note.value)}
                          style={{ color: userVotes[note.value] === "thumb_down" ? "red" : "black" }}
                        >
                          <FaRegThumbsDown />
                          <span className='text-xs flex'>({note.thumb_down})</span>
                        </button>
                      </div>

                      {user_id == note.user_id && (
                        <div className='absolute bottom-2 right-2 flex space-x-2'>
                          <button onClick={() => handleDeleteNoteByValue(note.value)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                      {scrum_id == note.user_id && (
                        <div className='absolute bottom-2 right-2 flex space-x-2'>
                          <button onClick={() => handleDeleteNoteByValue(note.value)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
            <i
              onClick={() => handleClick("c1")}
              className='absolute bottom-4 text-primary duration-500 hover:text-tertiary cursor-pointer animate-pulse right-4'
            >
              <FaRegStickyNote />
            </i>
          </div>
          {/* Div 2 */}
          <div className='bg-gray-400 relative row-start-1 row-end-3 col-start-7 col-end-13 rounded-lg text-2xl flex items-center justify-center'>
            {initialQuestions.c2}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 absolute'>
              {stickyNotes &&
                stickyNotes
                  .filter(
                    (note, index, arr) => arr.findIndex((n) => n.value === note.value && n.column === "c2") === index
                  )
                  .map((note, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "rgba(255, 255, 102, 0.7)", // Amarillo pastel
                        // Otras propiedades de estilo que desees agregar
                      }}
                      className='text-primary p-1 grid grid-cols-5 grid-rows-5 md:[120px] md:h-[120px] lg:w-[145px] lg:h-[145px] text-lg relative'
                    >
                      <span
                        className='md:text-xs lg:text-sm w-[120px]'
                        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                      >
                        {note.value}
                      </span>

                      <div className='absolute bottom-2 left-2 flex space-x-2'>
                        <button
                          onClick={() => handleVote("c2", "thumb_up", note.value)}
                          style={{ color: userVotes[note.value] === "thumb_up" ? "green" : "black" }}
                        >
                          <FaRegThumbsUp />
                          <span className='text-xs flex'>({note.thumb_up})</span>
                        </button>
                        <button
                          onClick={() => handleVote("c2", "thumb_down", note.value)}
                          style={{ color: userVotes[note.value] === "thumb_down" ? "red" : "black" }}
                        >
                          <FaRegThumbsDown />
                          <span className='text-xs flex'>({note.thumb_down})</span>
                        </button>
                      </div>

                      {user_id == note.user_id && (
                        <div className='absolute bottom-2 right-2 flex space-x-2'>
                          <button onClick={() => handleDeleteNoteByValue(note.value)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                      {scrum_id == note.user_id && (
                        <div className='absolute bottom-2 right-2 flex space-x-2'>
                          <button onClick={() => handleDeleteNoteByValue(note.value)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
            <i
              onClick={() => handleClick("c2")}
              className='absolute bottom-4 text-primary duration-500 hover:text-tertiary cursor-pointer animate-pulse right-4'
            >
              <FaRegStickyNote />
            </i>
          </div>
          <div className='bg-gray-400 relative row-start-3 row-end-5 col-start-1 col-end-7 rounded-lg text-2xl flex items-center justify-center'>
            {initialQuestions.c3}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 absolute'>
              {stickyNotes &&
                stickyNotes
                  .filter(
                    (note, index, arr) => arr.findIndex((n) => n.value === note.value && n.column === "c3") === index
                  )
                  .map((note, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "rgba(255, 255, 102, 0.7)", // Amarillo pastel
                        // Otras propiedades de estilo que desees agregar
                      }}
                      className='text-primary p-1 grid grid-cols-5 grid-rows-5 md:[120px] md:h-[120px] lg:w-[145px] lg:h-[145px] text-lg relative'
                    >
                      <span
                        className='md:text-xs lg:text-sm w-[120px]'
                        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                      >
                        {note.value}
                      </span>

                      <div className='absolute bottom-2 left-2 flex space-x-2'>
                        <button
                          onClick={() => handleVote("c3", "thumb_up", note.value)}
                          style={{ color: userVotes[note.value] === "thumb_up" ? "green" : "black" }}
                        >
                          <FaRegThumbsUp />
                          <span className='text-xs flex'>({note.thumb_up})</span>
                        </button>
                        <button
                          onClick={() => handleVote("c3", "thumb_down", note.value)}
                          style={{ color: userVotes[note.value] === "thumb_down" ? "red" : "black" }}
                        >
                          <FaRegThumbsDown />
                          <span className='text-xs flex'>({note.thumb_down})</span>
                        </button>
                      </div>

                      {user_id == note.user_id && (
                        <div className='absolute bottom-2 right-2 flex space-x-2'>
                          <button onClick={() => handleDeleteNoteByValue(note.value)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                      {scrum_id == note.user_id && (
                        <div className='absolute bottom-2 right-2 flex space-x-2'>
                          <button onClick={() => handleDeleteNoteByValue(note.value)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
            <i
              onClick={() => handleClick("c3")}
              className='absolute bottom-4 text-primary duration-500 hover:text-tertiary cursor-pointer animate-pulse right-4'
            >
              <FaRegStickyNote />
            </i>
          </div>

          {/* Div 4 */}
          <div className='bg-gray-400 relative row-start-3 row-end-5 col-start-7 col-end-13 rounded-lg text-2xl flex items-center justify-center'>
            {initialQuestions.c4}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 absolute'>
              {stickyNotes &&
                stickyNotes
                  .filter(
                    (note, index, arr) => arr.findIndex((n) => n.value === note.value && n.column === "c4") === index
                  )
                  .map((note, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "rgba(255, 255, 102, 0.7)", // Amarillo pastel
                        // Otras propiedades de estilo que desees agregar
                      }}
                      className='text-primary p-1 grid grid-cols-5 grid-rows-5 md:[120px] md:h-[120px] lg:w-[145px] lg:h-[145px] text-lg relative'
                    >
                      <span
                        className='md:text-xs lg:text-sm w-[120px]'
                        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                      >
                        {note.value}
                      </span>

                      <div className='absolute bottom-2 left-2 flex space-x-2'>
                        <button
                          onClick={() => handleVote("c4", "thumb_up", note.value)}
                          style={{ color: userVotes[note.value] === "thumb_up" ? "green" : "black" }}
                        >
                          <FaRegThumbsUp />
                          <span className='text-xs flex'>({note.thumb_up})</span>
                        </button>
                        <button
                          onClick={() => handleVote("c4", "thumb_down", note.value)}
                          style={{ color: userVotes[note.value] === "thumb_down" ? "red" : "black" }}
                        >
                          <FaRegThumbsDown />
                          <span className='text-xs flex'>({note.thumb_down})</span>
                        </button>
                      </div>

                      {user_id == note.user_id && (
                        <div className='absolute bottom-2 right-2 flex space-x-2'>
                          <button onClick={() => handleDeleteNoteByValue(note.value)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                      {scrum_id == note.user_id && (
                        <div className='absolute bottom-2 right-2 flex space-x-2'>
                          <button onClick={() => handleDeleteNoteByValue(note.value)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
            <i
              onClick={() => handleClick("c4")}
              className='absolute bottom-4 text-primary duration-500 hover:text-tertiary cursor-pointer animate-pulse right-4'
            >
              <FaRegStickyNote />
            </i>
          </div>
        </section>
      </section>
    </RetroLayout>
  );
};
