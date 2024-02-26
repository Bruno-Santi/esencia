import io, { Socket } from "socket.io-client";

export const connectToServer = (boardId) => {
  const URL_LOCAL = "https://esencia-api.onrender.com";
  const NAMESPACE = "/boardgateway";
  console.log(boardId);

  const socket = io(`${URL_LOCAL}${NAMESPACE}`, {
    query: { boardId },
  });

  socket.on("error", (error) => {
    console.error("Error en la conexión:", error);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
  });
  addListeners(socket);
};

export const addListeners = (socket: Socket) => {
  socket.on("connect", () => {
    console.log("connected");
  });
};

export const handleDisconnect = (socket: Socket) => {
  socket.emit("disconnect", () => {
    console.log("desconectado");
  });
};
