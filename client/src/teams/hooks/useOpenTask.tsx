import { useState } from "react";

export const useOpenTask = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const toggleTaskModal = () => setOpenTaskModal(!openTaskModal);

  return {
    toggleTaskModal,
    openTaskModal,
  };
};
