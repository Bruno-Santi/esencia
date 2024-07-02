import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export const TaskTable = ({ tasks }) => {
  console.log(tasks);

  return (
    <Paper elevation={0} sx={{ maxHeight: 400, overflow: "hidden", p: 2 }}>
      <TableContainer sx={{ maxHeight: 350, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='subtitle1' color='textPrimary'>
                  Estado
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle1' color='textPrimary'>
                  Título
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle1' color='textPrimary'>
                  Avance
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant='body2' color='textPrimary' fontWeight='bold'>
                      {task.status === "Backlog"
                        ? "Pendientes"
                        : task.status === "In Progress"
                          ? "En Progreso"
                          : task.status === "Finished"
                            ? "Finalizados"
                            : task.status === "In Review"
                              ? "En Revisión"
                              : task.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' color='textPrimary'>
                      {task.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' color='textPrimary'>
                      {task.total_check_items === 0 ? "No medible" : `${Math.round(task.percentage_true)}%`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  <Typography variant='body2' color='textSecondary'>
                    Sin datos, intenta crear un tablero e ir completando objetivos.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
