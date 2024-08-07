import { AccordionDetails, TextField, Modal } from "@mui/material";
import { useBoards } from "../hooks/useBoards";
import { useNewBoard } from "../hooks/useNewBoard";
import { IoSaveSharp } from "react-icons/io5";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { useDashboard } from "../../hooks/useDashboard";

export const BoardAccordionList = ({ boards }) => {
  const { startSettingActiveBoard, activeTeam } = useBoards();

  const { handleTitleChange, toggleModalBoard, boardTitle, modalBoard, handleClick, errorMessage, handleCreateBoard } = useNewBoard();
  const { user } = useAuthSlice();
  const isAdmin = activeTeam?.members?.some((member) => member.id === user.id && member.role === "admin");
  const handleActiveBoard = (boardId) => {
    startSettingActiveBoard(boardId);
  };

  return (
    <div>
      <AccordionDetails className='space-y-4 cursor-pointer flex-col'>
        {boards?.length > 0 ? (
          boards.map(({ _id, title }) => (
            <div onClick={() => handleActiveBoard(_id)} className='hover:bg-gray-500 hover:text-tertiary duration-300 p-2' key={_id}>
              {title}
            </div>
          ))
        ) : (
          <div className='hover:bg-gray-500 hover:text-tertiary duration-300 p-2'>Sin tableros aún</div>
        )}
      </AccordionDetails>
      {isAdmin ? (
        <AccordionDetails onClick={toggleModalBoard} className='cursor-pointer btn-primary hover:bg-gray-500 hover:text-tertiary duration-300'>
          <span className='flex items-center justify-center mt-2'>+ Nuevo tablero</span>
        </AccordionDetails>
      ) : (
        ""
      )}
      {modalBoard && (
        <Modal open={modalBoard} onClose={toggleModalBoard} onClick={handleClick} className='flex justify-center items-center'>
          <div className='bg-white p-20 flex flex-col space-y-6 rounded-md dark:bg-quaternary'>
            <label htmlFor='outlined-basic' className='font-poppins dark:text-tertiary'>
              Crear un nuevo tablero
            </label>
            <TextField id='outlined-basic' label='Título' variant='outlined' onChange={handleTitleChange} value={boardTitle} />
            <div
              onClick={handleCreateBoard}
              className='flex cursor-pointer w-fit bg-secondary p-2 font-poppins text-tertiary rounded-md hover:bg-primary duration-300'
            >
              Guardar <IoSaveSharp className='my-auto text-tertiary ml-2' />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
