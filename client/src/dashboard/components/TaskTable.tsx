import React from "react";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const TaskTable = ({ tasks }) => {
  return (
    <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 overflow-y-scroll text-primary font-poppins p-2 h-[250px] overflow-hidden relative'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='sticky top-0 bg-gray-200 z-10'>
                {" "}
                <span className='font-poppins text-primary text-lg'>Estado</span>
              </TableCell>
              <TableCell className='sticky top-0 bg-gray-200 z-10'>
                <span className='font-poppins text-primary text-lg'>Título</span>
              </TableCell>
              <TableCell className='sticky top-0 bg-gray-200 z-10'>
                {" "}
                <span className='font-poppins text-primary text-lg'>Avance</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 &&
              tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{typeof task.percentage_true === "number" ? `${Math.round(task.percentage_true)}%` : task.percentage_true}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!tasks.length && <div className='flex items-center justify-center mt-16 font-poppins text-lg'>Sin datos</div>}
      </TableContainer>
    </div>
  );
};
