import { useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import api from "../../helpers/apiToken";
import { toastSuccess, toastWarning } from "../../helpers";
import { useBoards } from "./useBoards";

export const useNewBoard = () => {
  const { activeTeam } = useDashboard();

  const { startGettingTeamBoards, startSettingActiveBoard } = useBoards();
  const [modalBoard, setModalBoard] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleModalBoard = () => setModalBoard(!modalBoard);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setBoardTitle(value);
    // Limpiar mensaje de error al cambiar el título
    setErrorMessage("");
  };

  const handleCreateBoard = async () => {
    const errors = errorMessages(boardTitle);
    if (errors) return toastWarning(errors);

    try {
      const { data } = await api.post(`/api/boards`, {
        scrum_id: activeTeam.scrumId,
        team_id: activeTeam._id,
        sprint: activeTeam.sprint,
        title: boardTitle,
      });

      await boardCreated(data);
    } catch (error) {
      if (error.message == "Cannot read properties of null (reading 'emit')") return;
      toastWarning(`Error while creating board`);
    }
  };
  const boardCreated = async (data) => {
    toastSuccess(`Board ${boardTitle} created`);
    setBoardTitle("");
    toggleModalBoard();

    await startGettingTeamBoards();
    await startSettingActiveBoard(data._id);
  };
  const handleClick = (e) => e.stopPropagation();

  const errorMessages = (title) => {
    let errors = "";
    if (!title) errors = "You must provide a title";
    else if (title.length < 5) errors = "Title must have at least 5 characters long";

    setErrorMessage(errors);
    return errors;
  };

  const cleanErrorMessage = () => setErrorMessage("");

  return { handleTitleChange, toggleModalBoard, boardTitle, modalBoard, errorMessage, cleanErrorMessage, handleCreateBoard, handleClick };
};
