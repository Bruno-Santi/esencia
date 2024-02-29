import React, { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { BoardColumn } from "../components/BoardColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useBoards } from "../hooks/useBoards";
import { BoardAccordion } from "../components/BoardAccordion";
import { MembersList } from "../components/MembersList";
import { NoSelectedBoard } from "../components/NoSelectedBoard";
import { ActiveBoardHeader } from "../components/ActiveBoardHeader";
import { useAuthSlice } from "../../hooks/useAuthSlice";

export const Boards = () => {
  const { startGettingTeamBoards, boards, activeTeam, activeBoard, membersActiveTeam, moveCardAndUpdateStatus, startDeletingBoard } = useBoards();
  const { user } = useAuthSlice();
  useEffect(() => {
    startGettingTeamBoards();
  }, [activeTeam]);
  useEffect(() => {
    console.log(activeBoard);
  }, [activeBoard]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    moveCardAndUpdateStatus(draggableId, destination.droppableId);
  };

  return (
    <div className='pl-10'>
      <div className='w-full'>
        <div className='flex items-center font-poppins absolute w-[200px]'>
          <BoardAccordion boards={boards} />
        </div>

        <div className='flex justify-end'>
          <ul className='flex space-x-3'>
            <MembersList members={membersActiveTeam} />
            <li>
              <button className='border border-dashed flex items-center w-10 h-10 border-gray-500 justify-center rounded-full cursor-pointer mr-6'>
                <GoPlus className='w-5 h-5 text-gray-500' />
              </button>
            </li>
          </ul>
        </div>
        {activeBoard.length > 0 && <ActiveBoardHeader activeBoard={activeBoard} />}
      </div>
      {activeBoard[0] === "null" || !activeBoard.length ? (
        <NoSelectedBoard />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='grid grid-cols-4 gap-5 mr-10'>
            {activeBoard[0] !== null &&
              activeBoard?.map(
                (board) =>
                  board?.columns.map((column) => (
                    <Droppable droppableId={column.name} key={column._id}>
                      {(provided) => <BoardColumn key={column._id} title={column.name} items={column.cards} provided={provided} activeBoard={activeBoard} />}
                    </Droppable>
                  ))
              )}
          </div>
        </DragDropContext>
      )}
      {activeBoard.length && user.role ? (
        <div
          onClick={() => startDeletingBoard(activeBoard[0]._id)}
          className='flex p-2 dark:text-tertiary text-bold font-poppins rounded-md text-primary btn-primary w-[150px] mt-20 m-auto justify-center hover:bg-tertiary hover:text-primary dark:hover:text-primary duration-300'
        >
          Eliminar tablero
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
