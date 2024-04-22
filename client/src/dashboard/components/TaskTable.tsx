import React from "react";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const TaskTable = ({ tasks }) => {
  console.log(tasks);

  return (
    <div className='bg-tertiary/20 rounded-md md:h-[350px] lg:h-[400px] lg:w-[430px] md:w-[400px] sm:w-5/6 sm:m-auto   dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800  shadow-lg  shadow-primary/20 text-primary font-poppins p-1 max-h-[300px] overflow-hidden relative'>
      <TableContainer sx={{ maxHeight: "400px", overflowY: "scroll" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='sticky top-0 bg-gray-200   dark:bg-quaternary/40  z-10'>
                {" "}
                <span className='font-poppins text-primary text-lg dark:text-tertiary'>Estado</span>
              </TableCell>
              <TableCell className='sticky top-0 bg-gray-200 z-10   dark:bg-quaternary/40'>
                <span className='font-poppins text-primary text-lg dark:text-tertiary'>Título</span>
              </TableCell>
              <TableCell className='sticky top-0 bg-gray-200 z-10  dark:bg-quaternary/40 '>
                {" "}
                <span className='font-poppins text-primary text-lg dark:text-tertiary'>Avance</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 &&
              tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell className=''>
                    <span className='dark:text-tertiary font-bold font-poppins'>
                      {" "}
                      {task.status === "Backlog"
                        ? "Pendientes"
                        : task.status === "In Progress"
                          ? "En Progreso"
                          : task.status === "Finished"
                            ? "Finalizados"
                            : task.status === "In Review"
                              ? "En Revisión"
                              : task.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className='dark:text-tertiary font-poppins'>{task.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className='dark:text-tertiary font-poppins'>
                      {task.total_check_items === 0
                        ? "No medible"
                        : typeof task.percentage_true === "number"
                          ? `${Math.round(task.percentage_true)}%`
                          : `${Math.trunc(task.percentage_true)}%`}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!tasks.length && (
          <div className='flex items-center justify-center mt-16 font-poppins text-lg text-center text-primary/70  '>
            Sin datos, intenta crear un tablero e ir completando objetivos.
          </div>
        )}
      </TableContainer>
    </div>
  );
};
