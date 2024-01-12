import { IoClose } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { useStickyNote } from "../hooks/useStickyNote";
import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

export const StickyModal = ({ handleClick, selectedNote, user_id, team_id }) => {
  const [note, setNote] = useState();
  const { stickyNotes } = useSocket();
  const { sendStickyNote } = useSocket();
  const handleChange = (e) => {
    const { value } = e.target;
    setNote(value);
    console.log(value);
  };

  const handleSaveSticky = (c, v) => {
    console.log(c, v);
    console.log(stickyNotes);
    const stickyNotesFilter = stickyNotes.filter((note) => note.column == c);
    if (!v) return;
    if (stickyNotesFilter.length >= 8) {
      return;
    }
    sendStickyNote(c, v);
    handleClick();
  };
  return (
    <div className='modal-overlay relative'>
      <div className='sticky-content relative  '>
        <div className='absolute right-4 top-4 text-4xl cursor-pointer duration-500 hover:text-secondary'>
          {" "}
          <i className='  ' onClick={handleClick}>
            <IoClose />
          </i>
        </div>
        <textarea
          maxLength={220}
          onChange={(e) => handleChange(e)}
          placeholder='Place your comments here'
          className='h-2/4 mt-6 placeholder:text-primary/80 w-full appearance-none font-poppins bg-[#ffd60a] border-0 focus:border-transparent focus:outline-none resize-none'
        ></textarea>

        <div
          onClick={() => handleSaveSticky(selectedNote, note)}
          className='absolute bottom-4 left-4 text-3xl cursor-pointer duration-500 hover:text-secondary'
        >
          {" "}
          <i className='  '>
            <FaRegSave />
          </i>
        </div>
      </div>
    </div>
  );
};
