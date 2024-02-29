import React, { useEffect, useState } from "react";
import { ImAttachment } from "react-icons/im";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { BsFillSendFill } from "react-icons/bs";

import { useOpenTask } from "../hooks/useOpenTask";
import { Button, Modal } from "@mui/base";
import { Container, Divider, Pagination, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { IoPersonAddOutline, IoPersonOutline, IoSaveSharp } from "react-icons/io5";
import { useDashboard } from "../../hooks/useDashboard";
import { useBoards } from "../hooks/useBoards";
import CommentsPagination from "./CommentsPagination";
import { useNewCheckList } from "../hooks/useNewCheckList";
import { CheckList } from "./CheckList";
export const CardItem = ({ item }) => {
  console.log(item);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const { startSettingAssigneeCard, startChangingDescription, startRemovingAssigneeCard, startDeletingNewCard, activeTeam, startAddingNewComment } =
    useBoards();
  const { user } = useDashboard();
  console.log(user);
  const handleJoinCard = () => {
    const assigneeInfo = {
      cardId: item._id,
      boardId: item.boardId,
      memberId: user.id,
      name: user.name,
      avtColor: user.avtColor,
    };
    startSettingAssigneeCard(item._id, assigneeInfo, item.status);
  };
  const handleOutCard = () => {
    startRemovingAssigneeCard(item._id, user.id);
  };
  const { checkListTitle, handleChangeCheckListTitle, handleSubmitNewCheckList, toggleCheckListTitleModal, checkListTitleModal } = useNewCheckList(item._id);
  useEffect(() => {
    console.log(activeTeam);
  }, []);

  const handleSubmitComment = () => {
    // Crear un nuevo objeto de comentario que incluya el texto del comentario y la información del usuario
    const newComment = {
      cardId: item._id,
      comment: comment,
      member: {
        memberId: user.id,
        name: user.name,
        email: user.email,
        teamId: activeTeam._id,
        avtColor: user.avtColor,
      },
    };
    console.log(newComment);
    startAddingNewComment(newComment);
    setComment("");
  };

  const handleChangeInfo = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
  };

  const handleCleanState = () => {
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleSubmitTitleDescription = () => {
    if (!title.length) return;
    const newData = {
      title: title,
      description: description,
      status: item.status,
    };
    startChangingDescription(item._id, item.boardId, newData);
  };

  const useStyles = makeStyles((theme) => ({
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },

    modalContainer: {
      position: "absolute",
      width: 1000,
      height: "90%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      outline: "none",
      borderRadius: 8,
      zIndex: 1000,
    },
    button: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: "200px",
      backgroundColor: "black",
    },
  }));
  const handlePropagation = (e) => {
    e.stopPropagation();
  };
  const classes = useStyles();
  console.log(item);
  const currentlyAssignee = item.assignees.some((assignee) => assignee.memberId === user.id);
  console.log(currentlyAssignee);
  const handleDeleteCard = (cardId, boardId, status) => {
    startDeletingNewCard(cardId, boardId, status);
  };

  const { toggleTaskModal, openTaskModal } = useOpenTask();

  return (
    <div className='bg-white text-primary rounded-md p-3 mt-3 relative' onClick={toggleTaskModal}>
      <span className=''>{item?.title}</span>
      <div className='flex justify-between pt-3'>
        <div className='flex space-x-4 items-center'>
          <span className='flex space-x-2 items-center'>
            <HiOutlineChatAlt2 className='mr-1 text-gray-500 w-4 ' /> {item?.comments.length}
          </span>

          <ul className='flex items-center absolute right-3 space-x-1'>
            {item?.assignees?.map((assignee) => (
              <li className='list-none' key={assignee?.id}>
                <div className={`${assignee.avtColor} rounded-full flex justify-center  w-6`}>
                  <span className='text-tertiary'>{assignee.memberName[0]}</span>{" "}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {openTaskModal && (
          <>
            <div className={classes.overlay}></div>
            <Modal open={openTaskModal} onClose={toggleTaskModal} onClick={(e) => handlePropagation(e)}>
              <div className={`${classes.modalContainer} overflow-y-scroll`}>
                <div className='flex'>
                  {/* Columna Izquierda */}
                  <div className='flex-2'>
                    <Container>
                      <TextField name='title' onChange={(e) => handleChangeInfo(e)} label='Titulo' variant='outlined' value={title} fullWidth margin='normal' />
                      <TextField
                        label='Objetivo'
                        name='description'
                        onChange={(e) => handleChangeInfo(e)}
                        variant='outlined'
                        value={description}
                        fullWidth
                        multiline
                        rows={10}
                        className='p-2 '
                        margin='normal'
                      />
                    </Container>
                    <Container>
                      {" "}
                      <Divider className='py-2 mb-2' />
                      {item.checkList.length > 0 && <CheckList checkList={item.checkList} cardId={item._id} />}
                    </Container>

                    {item.title !== title || item.description !== description ? (
                      <div className='flex justify-center duration-300 font-poppins text-sm space-x-4'>
                        <div onClick={handleSubmitTitleDescription} className='cursor-pointer p-2 btn-primary rounded-md'>
                          Guardar
                        </div>
                        <div onClick={handleCleanState} className='cursor-pointer p-2 btn-secondary rounded-md'>
                          Limpiar
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* Columna Derecha */}
                  <div className='flex-1 ml-4 mt-6'>
                    <div className='flex flex-col justify-start items-start space-y-4 '>
                      {/* JOIN */}

                      <div className='flex ml-6 space-x-6'>
                        <div className='flex flex-col space-y-2'>
                          {!currentlyAssignee ? (
                            <div
                              onClick={handleJoinCard}
                              className='flex cursor-pointer bg-secondary text-sm p-2 font-poppins text-tertiary rounded-md hover:bg-primary duration-300'
                            >
                              Unirme
                              <IoPersonOutline className='my-auto ml-2' />
                            </div>
                          ) : (
                            <div
                              onClick={handleOutCard}
                              className='flex cursor-pointer bg-secondary text-sm p-2 font-poppins text-tertiary rounded-md hover:bg-primary duration-300'
                            >
                              Salir
                              <IoPersonOutline className='my-auto ml-2' />
                            </div>
                          )}
                          <div
                            onClick={() => handleDeleteCard(item._id, item.boardId, item.status)}
                            className='flex cursor-pointer bg-secondary text-sm p-2 font-poppins text-tertiary rounded-md hover:bg-primary duration-300'
                          >
                            Eliminar Tarjeta
                          </div>
                          {!item.checkList.length ? (
                            <div
                              onClick={toggleCheckListTitleModal}
                              className='flex cursor-pointer bg-secondary text-sm p-2 font-poppins text-tertiary rounded-md hover:bg-primary duration-300'
                            >
                              Agregar checklist
                            </div>
                          ) : (
                            <button
                              disabled
                              className='flex cursor-pointer bg-gray-500 text-sm p-2 font-poppins text-tertiary rounded-md hover:bg-primary duration-300'
                            >
                              Agregar checklist
                            </button>
                          )}
                        </div>
                        {/* ADD MEMBERS */}
                        <div className='flex-col justify-center'>
                          <h2 className='justify-center absolute top-2 right-8'>
                            <span className='font-poppins'>{item?.assignees.length > 0 ? "Miembros" : ""}</span>
                          </h2>
                          <ul className='flex items-center absolute right-3 space-x-1'>
                            {item?.assignees?.map((assignee) => (
                              <li className='list-none flex cursor-pointer' key={assignee?.id}>
                                <div className={`${assignee.avtColor} rounded-full flex justify-center  w-6`}>
                                  <span className='text-tertiary'>{assignee.memberName[0]}</span>{" "}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Container className='mt-10'>
                        <Divider />
                        <div className='mt-6'>Comentarios ({item.comments.length})</div>
                        <div>{item.comments && <CommentsPagination comments={item.comments} />}</div>

                        <div>
                          <TextField
                            label='Añadir comentario'
                            autoComplete='off'
                            variant='outlined'
                            value={comment}
                            onChange={handleCommentChange}
                            fullWidth
                            margin='normal'
                            inputProps={{ maxLength: 120 }}
                            InputProps={{
                              endAdornment: (
                                <Button variant='contained' color='primary' onClick={handleSubmitComment} style={{ marginLeft: "8px" }}>
                                  <BsFillSendFill />
                                </Button>
                              ),
                            }}
                          />
                        </div>
                      </Container>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </>
        )}
        <Modal open={checkListTitleModal} onClose={toggleCheckListTitleModal} onClick={(e) => handlePropagation(e)}>
          <div className={classes.modalContainer}>
            <Container>
              <div className='flex flex-col '>
                <h2 className='font-poppins py-2 text-lg'>Checklist</h2>
              </div>
              <TextField label='Título' variant='outlined' value={checkListTitle} onChange={(e) => handleChangeCheckListTitle(e)} fullWidth margin='normal' />
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
              <div className='space-x-2 pt-2'>
                <button
                  onClick={() => handleSubmitNewCheckList()}
                  className={` bg-secondary font-poppins rounded-md p-2 text-teal-50 hover:bg-primary duration-300`}
                >
                  Añadir
                </button>
                <button className={` bg-tertiary font-poppins rounded-md p-2 text-primary hover:bg-primary/30 duration-300`}>Cancelar</button>
              </div>
            </Container>
          </div>
        </Modal>
      </div>
    </div>
  );
};
