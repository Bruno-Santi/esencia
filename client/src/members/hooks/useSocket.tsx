import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Manager } from "socket.io-client";
import { useAuthSlice } from "../../hooks/useAuthSlice";

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
};

export const useSocket = () => {
  const [serverStatus, setServerStatus] = useState();
  const [membersConnected, setMembersConnected] = useState(0);
  const [teamLength, setTeamLength] = useState(0);
  const [stickyNotes, setStickyNotes] = useState([]);
  const location = useLocation();
  const [userVotes, setUserVotes] = useState({});
  const { user } = useAuthSlice();

  const storedToken = localStorage.getItem("token");
  const team_id = localStorage.getItem("team_id");
  const user_id = localStorage.getItem("user_id");
  const scrum_id = localStorage.getItem("scrum_id");
  const token = localStorage.getItem("authToken");
  const socket = new Manager("https://esencia.app/socket.io/socket.io.js").socket("/retro");

  const addListeners = () => {
    socket.once(SOCKET_EVENTS.CONNECT, handleConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
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

    // Nuevo listener para el evento 'stickyNoteRated'
    socket.on(SOCKET_EVENTS.STICKY_NOTE_RATED, handleStickyNoteRated);

    socket.once(SOCKET_EVENTS.CONNECT, () => {
      socket.emit("getStickyNotes", { user_id, team_id });
    });
  };

  const handleStickyNoteDeleted = ({ user_id, team_id, noteContent }) => {
    setStickyNotes((prevNotes) =>
      prevNotes.filter((note) => !(note.user_id === user_id && note.team_id === team_id && note.value === noteContent))
    );
  };

  const handleConnect = () => {
    if (team_id) {
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

  const handleStickyNoteRated = (updatedStickyNote) => {
    setStickyNotes((prevNotes) =>
      prevNotes.map((note) => (note.value === updatedStickyNote.value ? { ...note, ...updatedStickyNote } : note))
    );
  };

  const handleDisconnect = () => {
    socket.emit("setUserId", { user_id });
    setServerStatus("Disconnected");
    localStorage.removeItem("user_id");
    localStorage.removeItem("team_id");
  };

  const handleTeamLength = (length) => {
    setTeamLength(length);
  };

  const handleDeleteNote = (noteContent) => {
    console.log("holasdasdsa");
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

  useEffect(() => {
    addListeners();

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, handleConnect);
      socket.off(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
      socket.off(SOCKET_EVENTS.USER_LENGTH, handleClientsUpdated);
      socket.off(SOCKET_EVENTS.SET_TEAMS, handleSetTeams);
      socket.off(SOCKET_EVENTS.TEAM_LENGTH, handleTeamLength);
      socket.off(SOCKET_EVENTS.STICKY_NOTES_SAVED, handleStickyNotesSaved);
      socket.off(SOCKET_EVENTS.STICKY_NOTES, handleStickyNotes);
      socket.off(SOCKET_EVENTS.DELETE_STICKY_NOTES, handleDeleteNote);
      socket.off(SOCKET_EVENTS.STICKY_NOTE_DELETED, handleStickyNoteDeleted);
      socket.off(SOCKET_EVENTS.COMPLETE_RETRO_REDIRECT);
      socket.off(SOCKET_EVENTS.STICKY_NOTE_RATED, handleStickyNoteRated);
      socket.off(SOCKET_EVENTS.CONNECT); // Remove the 'connect' event handler
      socket.off("getStickyNotes");
    };
  }, []);

  const sendStickyNote = (column, value) => {
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
  };

  const sendRetroToServer = async (questions, teamId) => {
    socket.emit("sendRetro", { questions, teamId });
    console.log(team_id);
  };

  const redirectToRetro = (teamId) => {
    const tokenSinComillas = token.replace(/^"|"$/g, "");
    const retroUrl = `https://esencia.app/members/retro?token=${tokenSinComillas}&team_id=${teamId}&scrum_id=${user.id}`;
    window.location.href = retroUrl;
  };

  const handleSendRetro = async (questions, teamId) => {
    console.log(teamId);
    console.log({ questions });
    await sendRetroToServer(questions, teamId);
    redirectToRetro(teamId);
  };

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
  };
};
