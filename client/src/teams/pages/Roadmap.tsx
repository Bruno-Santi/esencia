import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import api from "../../helpers/apiToken";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { useDashboard } from "../../hooks/useDashboard";
import { useDocumentTitle } from "../../hooks";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import moment from "moment";
import "moment/locale/es";
import boardData from "../mocks/board-data";

export const Roadmap = () => {
  useDocumentTitle("Roadmap | Esencia.app");

  const { user } = useAuthSlice();
  const { activeTeam } = useDashboard();
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]); // Estado local para almacenar boards

  const columns = [
    { type: "string", label: "ID de Tarea" },
    { type: "string", label: "Nombre de Tarea" },
    { type: "string", label: "Recurso" },
    { type: "date", label: "Fecha de Inicio" },
    { type: "date", label: "Fecha de Fin" },
    { type: "number", label: "Duración" },
    { type: "number", label: "Porcentaje Completado" },
    { type: "string", label: "Dependencias" },
  ];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 50,
    },
  };

  useEffect(() => {
    moment.locale("es"); // Establecer la localización en español

    const fetchBoards = async () => {
      try {
        const response = await api.get("/api/boards/roadmap/" + activeTeam._id);
        const boardsData = response.data.result;
        setBoards(boardsData); // Guardar boards en el estado local
        console.log("Datos del Roadmap", boardsData);

        const ganttTasks = boardsData.map((board, index) => {
          const startDate = moment(board.startDate).toDate();
          const endDate = moment(board.endDate).toDate();
          const totalCards = board.totalCards || 0;
          const totalFinishedCards = board.totalFinishedCards || 0;
          const percentComplete = totalCards > 0 ? ((totalFinishedCards / totalCards) * 100).toFixed(2) : 0;

          return [`board-${index}`, board.title, "board", startDate, endDate, null, percentComplete, null];
        });

        console.log("Tareas del Gantt", ganttTasks);

        const data = [columns, ...ganttTasks];
        setTasks(data);
      } catch (error) {
        console.error("Error al obtener datos", error);
      }
    };

    if (activeTeam) {
      fetchBoards();
    }
  }, [activeTeam]);

  if (!activeTeam) {
    return (
      <DashboardLayout>
        <h1 className='flex justify-normal items-center m-auto'>Selecciona un equipo</h1>
      </DashboardLayout>
    );
  }

  return (
    <div className='pl-10'>
      <h1 className='flex justify-center font-poppins text-2xl text-primary mb-20'>Epic Roadmap</h1>
      <div className='px-2 mr-6'>{boards.length > 0 && <Chart chartType='Gantt' width='100%' height='50%' data={tasks} options={options} />}</div>
    </div>
  );
};
