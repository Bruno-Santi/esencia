import { IoClose } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export const StickyModalModify = ({ handleModifiyModal, value, user_id, team_id, stickyNotes }) => {
  const [note, setNote] = useState(value);
  const { editStickyNote } = useSocket();

  const handleChange = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  useEffect(() => {
    console.log(stickyNotes);
  }, []);

  const handleSaveSticky = () => {
    const selectedNote = stickyNotes.find((note) => note.value === value);

    if (!selectedNote) {
      console.error("Nota no encontrada para modificar");
      return;
    }

    const updatedNote = { ...selectedNote, value: note };

    // Llamar a la función para editar la nota en el servidor
    editStickyNote(user_id, team_id, selectedNote.value, updatedNote.value);

    handleModifiyModal();
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (key === "Escape") handleModifiyModal();
    if (key === "Enter") handleSaveSticky();
  };

  return (
    <div className='modal-overlay relative ' onKeyDown={handleKeyDown}>
      <div className='sticky-content relative  '>
        <div className='absolute right-4 top-4 text-4xl cursor-pointer duration-500 hover:text-secondary'>
          <i className='' onClick={handleModifiyModal}>
            <IoClose />
          </i>
        </div>
        <textarea
          maxLength={220}
          value={note}
          onChange={(e) => handleChange(e)}
          placeholder='Place your comments here'
          className='h-2/4 mt-6 placeholder:text-primary/80 w-full appearance-none font-poppins bg-[#ffd60a] border-0 focus:border-transparent focus:outline-none resize-none'
        ></textarea>

        <div
          onClick={handleSaveSticky}
          className='absolute bottom-4 left-4 text-3xl cursor-pointer duration-500 hover:text-secondary'
        >
          <i className=''>
            <FaRegSave />
          </i>
        </div>
      </div>
    </div>
  );
};
