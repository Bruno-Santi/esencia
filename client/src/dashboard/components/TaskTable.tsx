import React from "react";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const TaskTable = ({ tasks }) => {
  return (
    <div className='bg-gray-200/60 rounded-md  lg:w-full md:w-full sm:w-5/6 sm:m-auto   dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800  shadow-md shadow-primary/20 overflow-y-scroll text-primary font-poppins p-2 h-[250px] overflow-hidden relative'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='sticky top-0 bg-gray-200   dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800  z-10'>
                {" "}
                <span className='font-poppins text-primary text-lg dark:text-tertiary'>Estado</span>
              </TableCell>
              <TableCell className='sticky top-0 bg-gray-200 z-10   dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 '>
                <span className='font-poppins text-primary text-lg dark:text-tertiary'>Título</span>
              </TableCell>
              <TableCell className='sticky top-0 bg-gray-200 z-10  dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 '>
                {" "}
                <span className='font-poppins text-primary text-lg dark:text-tertiary'>Avance</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 &&
              tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <span className='dark:text-tertiary'>{task.status}</span>
                  </TableCell>
                  <TableCell>
                    <span className='dark:text-tertiary'>{task.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className='dark:text-tertiary'>
                      {typeof task.percentage_true === "number" ? `${Math.round(task.percentage_true)}%` : task.percentage_true}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!tasks.length && <div className='flex items-center justify-center mt-16 font-poppins text-lg'>Sin datos</div>}
      </TableContainer>
    </div>
  );
};
