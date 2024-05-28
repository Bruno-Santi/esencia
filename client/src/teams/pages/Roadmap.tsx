import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { baseURL } from "../../helpers/apiToken";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { useDashboard } from "../../hooks/useDashboard";
import { useDocumentTitle } from "../../hooks";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { useBoards } from "../hooks/useBoards";
import { NoSelectedBoard } from "../components/NoSelectedBoard";

export const Roadmap = () => {
  useDocumentTitle("Roadmap | Esencia.app");

  const { user } = useAuthSlice();
  const { activeTeam } = useDashboard();
  const { activeBoard } = useBoards();
  console.log(activeBoard);

  const [tasks, setTasks] = useState([]);
  if (!activeBoard.length) {
    return <NoSelectedBoard />;
  }
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 50,
    },
  };

  useEffect(() => {
    console.log("activeTeam", activeTeam);
    const fetchBoards = async () => {
      try {
        const response = await axios.get(baseURL + "/api/boards/roadmap/" + activeTeam._id);
        const boards = response.data.result;
        console.log("Roadmap Data", boards);

        const ganttTasks = await boards.map((board, index) => {
          const startDate = new Date(board.startDate);
          const endDate = new Date(board.endDate);
          return [`board-${index}`, board.title, "board", startDate, endDate, null, ((board.totalFinishedCards / board.totalCards) * 100).toFixed(2), null];
        });

        console.log("ganttTasks", ganttTasks);

        const data = [columns, ...ganttTasks];
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className='pl-10'>
      <h1>Epic Roadmap</h1>
      <Chart chartType='Gantt' width='100%' height='50%' data={tasks} options={options} />
    </div>
  );
};
