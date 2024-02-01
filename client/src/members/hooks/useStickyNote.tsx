import { useState } from "react";

export const useStickyNote = () => {
  const initialState = {
    c1: [],
    c2: [],
    c3: [],
    c4: [],
  };
  const [notes, setNotes] = useState(initialState);
  const [stickyModal, setStickyModal] = useState(false);
  const toggleModal = () => setStickyModal(!stickyModal);
  const handleSaveNote = (c, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [c]: [...prevNotes[c], value],
    }));
    console.log(notes);
  };

  return {
    toggleModal,
    stickyModal,
    handleSaveNote,
    notes,
  };
};
