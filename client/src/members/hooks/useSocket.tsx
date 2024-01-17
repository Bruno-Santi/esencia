import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Manager } from "socket.io-client";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { useDashboard } from "../../hooks/useDashboard";

const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  USER_LENGTH: "userLength",
  SET_TEAMS: "setTeams",
  TEAM_LENGTH: "teamLength",
  STICKY_NOTES_SAVED: "stickyNotesSaved",
  STICKY_NOTES: "stickyNotes",
  DELETE_STICKY_NOTES: "deleteStickyNotes",
  STICKY_NOTE_DELETED: "stickyNoteDeleted",
  COMPLETE_RETRO_REDIRECT: "completeRetroRedirect",
  STICKY_NOTE_RATED: "stickyNoteRated",
  DISCONNECT_TEAM: "disconnectTeam",
  EDIT_STICKY_NOTE: "editStickyNote",
  STICKY_NOTE_EDITED: "stickyNoteEdited",
};
const socket = new Manager("https://www.esencia.app/socket.io/socket.io.js").socket("/retro");

export const useSocket = () => {
  const [serverStatus, setServerStatus] = useState("");
  const [membersConnected, setMembersConnected] = useState(0);
  const [teamLength, setTeamLength] = useState(0);
  const { activeTeam } = useDashboard();
  const [stickyNotes, setStickyNotes] = useState([]);

  const [userVotes, setUserVotes] = useState({});
  const { user } = useAuthSlice();

  const team_id = localStorage.getItem("team_id");
  let user_id = localStorage.getItem("user_id");
  const scrum_id = localStorage.getItem("scrum_id");
  const token = localStorage.getItem("authToken");

  const addListeners = () => {
    socket.once(SOCKET_EVENTS.CONNECT, handleConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
    socket.on(SOCKET_EVENTS.STICKY_NOTE_EDITED, handleStickyNoteEdited);

    socket.on(SOCKET_EVENTS.USER_LENGTH, handleClientsUpdated);
    socket.on(SOCKET_EVENTS.SET_TEAMS, () => handleSetTeams(team_id));
    socket.on(SOCKET_EVENTS.TEAM_LENGTH, handleTeamLength);
    socket.on(SOCKET_EVENTS.STICKY_NOTES_SAVED, handleStickyNotesSaved);
    socket.on(SOCKET_EVENTS.STICKY_NOTES, handleStickyNotes);
    socket.on(SOCKET_EVENTS.DELETE_STICKY_NOTES, handleDeleteNote);
    socket.on(SOCKET_EVENTS.STICKY_NOTE_DELETED, handleStickyNoteDeleted);
    socket.on(SOCKET_EVENTS.COMPLETE_RETRO_REDIRECT, ({ redirectUrl }) => {
      window.location.href = redirectUrl;
    });
    socket.on("retroCompleted", retroCompleted);
    socket.on(SOCKET_EVENTS.STICKY_NOTE_RATED, handleStickyNoteRated);
    socket.on(SOCKET_EVENTS.DISCONNECT_TEAM, handleDisconnectTeam); // Agregado el nuevo evento

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      socket.emit("getStickyNotes", { user_id, team_id });
    });
    socket.on("completeRetroRedirect", ({ redirectUrl }) => {
      window.location.href = redirectUrl;
    });
  };
  const handleStickyNoteDeleted = ({ user_id, team_id, noteContent }) => {
    setStickyNotes((prevNotes) =>
      prevNotes.filter((note) => !(note.user_id === user_id && note.team_id === team_id && note.value === noteContent))
    );
  };

  const handleConnect = () => {
    console.log(user_id, scrum_id, team_id);
    if (team_id || activeTeam._id) {
      socket.emit("joinRoom", team_id);

      socket.emit("setUserId", { user_id, scrum_id, team_id });

      setServerStatus("Connected");
    }
  };

  const handleStickyNotes = (notes) => {
    const updatedUserVotes = {};
    notes.forEach((note) => {
      updatedUserVotes[note.value] = userVotes[note.value] || { thumb_up: 0, thumb_down: 0 };
    });
    setUserVotes(updatedUserVotes);
    setStickyNotes([...notes]);
  };

  const handleVote = (column, vote, value) => {
    handleRateStickyNote(user_id, team_id, column, vote, value);
  };

  const handleRateStickyNote = (user_id, team_id, column, vote, value) => {
    if (!userVotes[column]) {
      setUserVotes((prevUserVotes) => ({
        ...prevUserVotes,
        [column]: { thumb_up: 0, thumb_down: 0 },
      }));
    }

    if (!userVotes[column][vote]) {
      setUserVotes((prevUserVotes) => ({
        ...prevUserVotes,
        [column]: { ...prevUserVotes[column], [vote]: prevUserVotes[column][vote] + 1 },
      }));
      socket.emit("rateStickyNote", { user_id, team_id, column, vote, value });
    }
  };
  const handleStickyNoteEdited = ({ user_id, team_id, noteContent, newNoteContent }) => {
    setStickyNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.user_id === user_id && note.team_id === team_id && note.value === noteContent
          ? { ...note, value: newNoteContent }
          : note
      )
    );
  };

  // Add a new function to emit the edit event
  const editStickyNote = (user_id, team_id, noteContent, newNoteContent) => {
    socket.emit(SOCKET_EVENTS.EDIT_STICKY_NOTE, { user_id, team_id, noteContent, newNoteContent });
  };
  const handleStickyNoteRated = (updatedStickyNote) => {
    setStickyNotes((prevNotes) =>
      prevNotes.map((note) => (note.value === updatedStickyNote.value ? { ...note, ...updatedStickyNote } : note))
    );
  };
  const retroCompleted = () => {
    console.log("completado");
  };
  const handleDisconnect = () => {
    socket.emit("setUserId", { user_id });
    setServerStatus("Disconnected");
    console.log("desconectado");
  };

  const handleTeamLength = (length) => {
    setTeamLength(length);
  };

  const handleDeleteNote = (noteContent) => {
    if (user_id === "null") user_id = scrum_id;
    socket.emit("deleteStickyNote", { user_id, team_id, noteContent });
    setStickyNotes((prevNotes) =>
      prevNotes.filter((note) => !(note.user_id === user_id && note.team_id === team_id && note.value === noteContent))
    );
  };

  const handleClientsUpdated = (clients) => {
    setMembersConnected(clients);
  };

  const handleSetTeams = (team_id) => {
    setTeamLength(team_id);
    console.log(teamLength);
  };

  const handleInitialStickyNotes = (notes) => {
    setStickyNotes(notes);
    console.log(notes);
  };

  const handleStickyNotesSaved = (note) => {
    if (!stickyNotes.some((existingNote) => existingNote.value === note.value)) {
      setStickyNotes((prevNotes) => [...prevNotes, note]);
      console.log(note);
    }
  };

  const handleDisconnectTeam = () => {
    socket.emit("setUserId", { user_id });

    console.log("Disconnected from the team");
  };

  useEffect(() => {
    addListeners();
    console.log(stickyNotes);

    if (scrum_id) handleStartRetro(team_id);

    handleConnect();
  }, []);

  const handleStartRetro = (team_id) => {
    socket.emit("startRetro", { team_id });
  };
  const sendStickyNote = (column, value) => {
    if (user_id === "null") user_id = scrum_id;
    socket.emit("saveStickyNote", {
      user_id,
      team_id,
      column,
      value,
      thumb_up: 0,
      thumb_down: 0,
    });
  };

  const disconnectServer = () => {
    socket.emit("removeUserId", { user_id });
  };

  const completeRetro = (team_id) => {
    socket.emit("completeRetro", { team_id });
    socket.emit("disconnectTeam", { team_id });
  };

  const sendRetroToServer = async (teamId) => {
    socket.emit("sendRetro", { teamId });
    console.log(team_id);
  };

  const redirectToRetro = () => {
    const tokenSinComillas = token.replace(/^"|"$/g, "");
    const retroUrl = `http://localhost:5173/members/retro?token=${tokenSinComillas}&team_id=${activeTeam._id}&scrum_id=${user.id}`;

    window.location.href = retroUrl;
  };
  const handleSendRetro = async (team_id) => {
    await handleStartRetro(team_id);

    console.log(team_id);
    handleConnect();
    await sendRetroToServer(team_id);
    redirectToRetro();
  };

  const handleCompleteRetroRedirect = ({ redirectUrl }) => {
    window.location.href = redirectUrl;
  };

  useEffect(() => {
    if (scrum_id) sendRetroToServer(team_id);
  }, [scrum_id]);

  return {
    serverStatus,
    membersConnected,
    disconnectServer,
    teamLength,
    sendStickyNote,
    stickyNotes,
    addListeners,
    completeRetro,
    sendRetroToServer,
    handleConnect,
    handleDeleteNote,
    handleSendRetro,
    handleVote,
    editStickyNote,
  };
};

