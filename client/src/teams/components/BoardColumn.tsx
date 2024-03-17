import { useEffect, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { CardItem } from "./CardItem";
import { GoPlus } from "react-icons/go";
import { Draggable } from "react-beautiful-dnd";
import { Modal, TextField, Button, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import { useBoards } from "../hooks/useBoards";

export const BoardColumn = ({ title, items, provided, activeBoard }) => {
  useEffect(() => {
    console.log(activeBoard);
  }, [activeBoard]);

  const { handleChangeTitle, startAddingNewCard, toggleModal: toggleModalCard, cardTitle, modalCard, titleError } = useBoards();
  const useStyles = makeStyles((theme) => ({
    modalContainer: {
      position: "absolute",
      width: 800,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      outline: "none",
      borderRadius: 8,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div ref={provided.innerRef} className='bg-gray-400 shadow-lg shadow-black/30 p-3 text-gray-100 mt-10 font-poppins rounded-md '>
        <h1 className='flex justify-between items-center text-xl'>
          <span>{title}</span> <TbDotsVertical className='w-5 h-5 text-gray-100 cursor-pointer' />
        </h1>
        {items.map((card, index) => (
          <Draggable draggableId={card._id} index={index} key={card._id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <CardItem item={card} />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        <button onClick={toggleModalCard} className='flex justify-center items-center mt-6 m-auto space-x-2 group text-lg'>
          <GoPlus className='bg-secondary group-hover:bg-primary group-hover:duration-300 rounded-full w-5 h-5 text-gray-100' /> <span>Nueva Tarjeta</span>
        </button>

        <Modal open={modalCard} onClose={toggleModalCard}>
          <div className={classes.modalContainer}>
            <Container>
              <div className='flex flex-col -space-y-6'>
                <h2 className='font-poppins py-6 text-lg'>Nueva tarjeta </h2>
                <p className='italic text-xs text-primary/70'>{title}</p>
              </div>
              <TextField error={titleError} label='Título' variant='outlined' value={cardTitle} onChange={handleChangeTitle} fullWidth margin='normal' />
              {/* <TextField
                label='Description'
                variant='outlined'
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin='normal'
              /> */}
              <button
                disabled={!cardTitle}
                onClick={() => startAddingNewCard(title, cardTitle)}
                className={`${!cardTitle ? "bg-gray-400" : "bg-secondary"}  font-poppins rounded-md p-2 text-teal-50 hover:bg-primary duration-300`}
              >
                Añadir
              </button>
              {titleError && <p className='text-red-400 mt-2'>{titleError}</p>}
            </Container>
          </div>
        </Modal>
      </div>
    </>
  );
};
