import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleanBoards, setActiveBoard, setTeamBoards, updateBoard, updateCardStatusLocally } from "../../store/boards/boardsSlice";
import api from "../../helpers/apiToken";
import { useDashboard } from "../../hooks/useDashboard";
import { toast } from "react-toastify";
import { toastSuccess, toastWarning } from "../../helpers";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { Socket, io } from "socket.io-client";
import { previousDay } from "date-fns";

export const useBoards = () => {
  const dispatch = useDispatch();
  const { startGettingMembers } = useDashboard();
  const { activeTeam } = useSelector(({ dashboard }) => dashboard);
  const { boards, activeBoard } = useSelector(({ board }) => board);
  const [activeBoardLocal, setActiveBoardLocal] = useState({});
  const { user } = useAuthSlice();
  const [modalCard, setModalCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const { membersActiveTeam } = useDashboard();
  const [titleError, setTitleError] = useState("");

  const socketRef = useRef(null);

  const handleChangeTitle = (e) => {
    const { value } = e.target;
    setCardTitle(value);
    handleError(cardTitle);
  };
  const handleError = (title) => {
    if (!title.length) setTitleError("You must provide a title.");
    if (title.length < 4) setTitleError("Title must have at least 4 characters long.");
    setTitleError("");
  };
  const toggleModal = () => setModalCard(!modalCard);
  const URL_LOCAL = "http://localhost:3000";
  const URL_DEPLOY = "https://esencia-api.onrender.com";
  const NAMESPACE = "/boardgateway";
  useEffect(() => {
    if (Object.keys(activeBoardLocal).length) {
      console.log(activeBoardLocal);

      const boardId = activeBoardLocal[0]._id;
      console.log(boardId);

      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      socketRef.current = io(`${URL_DEPLOY}${NAMESPACE}`, {
        query: { boardId: boardId },
      });
      console.log(socketRef);

      addListeners(socketRef.current);

      socketRef.current.on("connect", () => {
        console.log("Conectado al servidor");
        console.log(boardId);

        socketRef.current.emit("boardIdAvailable", boardId);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Desconectado del servidor");
      });
    }
  }, [activeBoardLocal]);

  const connectToServer = (boardId) => {
    socketRef.current.emit("boardIdAvailable", boardId);
  };

  const addListeners = (socket) => {
    socket.on("newCardAdded", () => {
      console.log("Nueva tarjeta añadida");
    });
    socket.on("error", (error) => {
      console.error("Error en la conexión:", error);
    });
    socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
    });
    socket.once("initialBoardData", (boardData) => {
      console.log("Datos iniciales del tablero:", boardData);
      if (boardData[0] !== null) {
        dispatch(setActiveBoard(boardData));
        console.log(activeBoard);

        console.log("hola");
      }
    });
    socket.on("boardDataUpdated", (boardData) => {
      console.log("Datos actualizados del tablero recibidos:", boardData);
      dispatch(setActiveBoard(boardData));
    });
  };

  const startGettingTeamBoards = async () => {
    dispatch(cleanBoards());

    if (activeTeam) {
      try {
        const response = await api.get(`/api/boards/${activeTeam._id}`);
        dispatch(setTeamBoards(response.data.boards));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const moveCardAndUpdateStatus = async (cardId, newStatus) => {
    console.log(activeBoard);
    const boardId = activeBoard[0]._id;

    try {
      const socket = io(`${URL_DEPLOY}${NAMESPACE}`, {
        query: { boardId: boardId },
      });
      socket.emit("updateCardStatus", { cardId, newStatus, boardId: boardId });

      console.log(activeBoardLocal);
    } catch (error) {
      console.error("Error al actualizar el estado de la tarjeta:", error);
    }
  };

  const startSettingActiveBoard = async (boardId) => {
    console.log(boardId);

    const boardSelected = boards.filter((board) => board._id === boardId);
    console.log(boardSelected);
    console.log(boardSelected.map((board) => board._id));
    setActiveBoardLocal(boardSelected);
    connectToServer(boardId);
  };

  const startCleaningBoards = () => dispatch(cleanBoards());

  const handleCancel = () => {
    toast.warning(`Action cancelled`);
  };
  const handleAccept = async (boardId) => {
    try {
      const response = await api.delete(`/api/boards/${boardId}`);
      if (response) {
        toast.success(`Board deleted 👌`);
        await startGettingTeamBoards();
      }
    } catch (error) {
      toast.error(`Error while deleting board`);
    }
  };
  const startDeletingBoard = (boardId: string) => {
    toast.info(
      <div className='flex flex-col'>
        <p className='font-poppins mb-2'>¿Estás seguro de eliminar este tablero?</p>
        <div className='flex space-x-2'>
          <button onClick={handleCancel} className='btn-secondary w-2/3 space-x-2 p-1 font-poppins rounded-md'>
            ❌
          </button>

          <button onClick={() => handleAccept(boardId)} className='btn-primary w-2/3 p-1 font-poppins rounded-md'>
            ✅
          </button>
        </div>
      </div>
    );
  };
  const startDeletingNewCard = (cardId, boardId, status) => {
    toast.info(
      <div className='flex flex-col'>
        <p className='font-poppins mb-2'>¿Estás seguro de eliminar esta tarjeta?</p>
        <div className='flex space-x-2'>
          <button onClick={handleCancelDeleteCard} className='btn-secondary w-2/3 space-x-2 p-1 font-poppins rounded-md'>
            ❌
          </button>

          <button onClick={() => handleAcceptDeleteCard(cardId, boardId, status)} className='btn-primary w-2/3 p-1 font-poppins rounded-md'>
            ✅
          </button>
        </div>
      </div>
    );
  };
  const handleCancelDeleteCard = () => toastSuccess(`Acción cancelada.`);
  const handleAcceptDeleteCard = async (cardId, boardId, status) => {
    const deletedCard = {
      cardId: cardId,
      boardId: boardId,
      status: status,
    };
    console.log(deletedCard);

    try {
      if (socketRef.current) {
        socketRef.current.emit("deletedCard", { deletedCard });
      } else {
        const socket = io(`${URL_DEPLOY}${NAMESPACE}`, {
          query: { boardId: boardId },
        });
        socket.emit("deletedCard", { deletedCard });
      }
      toastSuccess(`Tarjeta eliminada.`);
    } catch (error) {
      console.log(error);
    }
  };
  const startAddingNewCard = async (status, cardTitle) => {
    console.log(activeBoard);
    const boardId = activeBoard[0]._id;
    console.log(socketRef);

    const createdCard = {
      status: status,
      description: "",
      boardId: activeBoard[0]._id,
      creator_id: user.id,
      assignees: [],
      title: cardTitle,
    };

    try {
      const newCardResponse = await api.post(`/api/boards/cards`, {
        ...createdCard,
      });

      const newCard = newCardResponse.data;

      if (socketRef.current) {
        socketRef.current.emit("newCardAdded", { newCard });
      } else {
        const socket = io(`${URL_DEPLOY}${NAMESPACE}`, {
          query: { boardId: boardId },
        });
        socket.emit("newCardAdded", { newCard });
      }

      console.log(boardId);

      toggleModal();
      setCardTitle("");
      toastSuccess(`Tarjeta ${cardTitle} añadida`);
    } catch (error) {
      console.log(error);
    }
  };
  const startSettingAssigneeCard = async (cardId, assignee, status) => {
    console.log(cardId, assignee, status);

    const { boardId } = assignee;
    try {
      const newAssignee = [
        {
          cardId: cardId,
          boardId: boardId,
          memberId: assignee.memberId,
          memberName: assignee.name,
          avtColor: assignee.avtColor,
        },
      ];

      if (socketRef.current) {
        socketRef.current.emit("newAssignee", { newAssignee, status });
        console.log(newAssignee);
        toastSuccess(`Te has unido a la tarjeta`);
      } else {
        const socket = io(`${URL_DEPLOY}${NAMESPACE}`, {
          query: { boardId: boardId },
        });
        socket.emit("newAssignee", { newAssignee, status });
        toastSuccess(`Te has unido a la tarjeta`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const startRemovingAssigneeCard = async (cardId, assigneeId) => {
    const boardId = activeBoard[0]._id;
    console.log(cardId);

    try {
      const dataToRemove = {
        boardId: boardId,
        cardId: cardId,
        assigneeId: assigneeId,
      };

      if (socketRef.current) {
        socketRef.current.emit("removeAssignee", { dataToRemove });
        console.log("Assignee removed:", dataToRemove);
      } else {
        const socket = io(`${URL_DEPLOY}${NAMESPACE}`, {
          query: { boardId: boardId },
        });
        socket.emit("removeAssignee", { dataToRemove });
      }
      toastSuccess(`Has salido de la tarjeta `);
    } catch (error) {
      console.log(error);
    }
  };
  const startChangingDescription = (cardId, boardId, newData) => {
    try {
      console.log(newData);

      const socket = io(`${URL_DEPLOY}${NAMESPACE}`, {
        query: { boardId: boardId },
      });
      socket.emit("updatedTitleDescription", { cardId, boardId, newData });
      toastSuccess(`Tarjeta actualizada 🙌`);
    } catch (error) {
      console.log(error);
    }
  };

  const startAddingNewComment = async (data) => {
    console.log(data);
    const boardId = activeBoard[0]._id;
    console.log(boardId);

    const { cardId } = data;
    const comment = {
      comment: data.comment,
      member: {
        memberId: data.member.memberId,
        name: data.member.name,
        email: data.member.email,
        teamId: data.member.teamId,
        avtColor: data.member.avtColor,
      },
    };
    try {
      const socket = io(`${URL_DEPLOY}${NAMESPACE}`, {
        query: { boardId: boardId },
      });
      socket.emit("addNewComment", { cardId, boardId, comment });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    startAddingNewComment,
    startGettingTeamBoards,
    boards,
    startSettingAssigneeCard,
    activeBoard,
    startSettingActiveBoard,
    startCleaningBoards,
    startDeletingBoard,
    startChangingDescription,
    moveCardAndUpdateStatus,
    toggleModal,
    handleChangeTitle,
    membersActiveTeam,
    cardTitle,
    startAddingNewCard,
    modalCard,
    activeTeam,
    startRemovingAssigneeCard,
    startDeletingNewCard,
  };
};
