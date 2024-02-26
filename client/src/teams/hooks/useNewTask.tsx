import React, { useState } from "react";
import { toastWarning } from "../../helpers";
import api from "../../helpers/apiToken";
import { useBoards } from "./useBoards";
import { useAuthSlice } from "../../hooks/useAuthSlice";

export const useNewTask = (status, activeBoard) => {
  const [modalTask, setModalTask] = useState(false);
  const [taskTitle, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const { user } = useAuthSlice();
  const postData = {
    status: status,
    description: "descripcion al azar",
    boardId: activeBoard._id,
    creator_id: user.id,
    assignees: [],
    title: taskTitle,
  };

  const toggleModal = () => setModalTask(!modalTask);

  const handleChangeTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
    handleError(taskTitle);
  };

  const handleError = (title) => {
    if (!title.length) setTitleError("You must provide a title.");
    if (title.length < 4) setTitleError("Title must have at least 4 characters long.");
    setTitleError("");
  };

  const handleAddTask = async () => {
    if (titleError) return toastWarning(titleError);
    try {
      const newTask = await api.post(`/api/card`, {
        ...postData,
      });
      setTitle("");
      console.log(newTask);

      // Emitir evento SSE para informar sobre la creación de una tarjeta
      const eventSource = new EventSource("/api/sse/cards");
      eventSource.addEventListener("card_created", handleCardCreated);
    } catch (error) {
      console.log(error);
    }
    toggleModal();
  };

  const handleCardCreated = (event) => {
    const newCard = JSON.parse(event.data);
    console.log("Card created:", newCard);
    // Aquí puedes realizar acciones adicionales si es necesario
  };

  return { toggleModal, handleChangeTitle, handleAddTask, modalTask, taskTitle };
};
