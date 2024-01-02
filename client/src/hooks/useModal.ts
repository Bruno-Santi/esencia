import { useState } from "react";

interface ModalHook {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): ModalHook => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
