import React, { useState } from "react";
import api from "../../helpers/apiToken";
import { useBoards } from "./useBoards";

export const useNewCheckList = (cardId) => {
  console.log(cardId);
  const { startAddingNewCheckList } = useBoards();
  const [checkListTitle, setCheckListTitle] = useState("");
  const [checkListTitleModal, setCheckListTitleModal] = useState(false);
  const handleChangeCheckListTitle = (e) => {
    e.stopPropagation();
    setCheckListTitle(e.target.value);
  };

  const handleSubmitNewCheckList = async () => {
    if (!checkListTitle || checkListTitle.length < 4) return;
    console.log(checkListTitle);
    const title = checkListTitle;
    try {
      await startAddingNewCheckList(cardId, title);
    } catch (error) {
      console.log(error);
    }
    toggleCheckListTitleModal();
    setCheckListTitle("");
  };

  const toggleCheckListTitleModal = () => setCheckListTitleModal(!checkListTitleModal);
  return {
    checkListTitle,
    handleChangeCheckListTitle,
    handleSubmitNewCheckList,
    checkListTitleModal,
    toggleCheckListTitleModal,
  };
};
