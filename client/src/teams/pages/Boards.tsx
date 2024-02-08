import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { BoardColumn } from "../components/BoardColumn";
import boardData from "../mocks/board-data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const Boards = () => {
  // Estado local para la data del tablero
  const [boardData, setBoardData] = useState([
    {
      name: "Backlog",
      items: [
        {
          id: 1,
          title: "Create a new logo.",
          description: "",
          status: "Backlog",
          assignees: [
            {
              id: 1,
              avt: "https://randomuser.me/api/portraits/thumb/men/76.jpg",
            },
            {
              id: 2,
              avt: "https://randomuser.me/api/portraits/thumb/men/77.jpg",
            },
          ],
          comments: 2,
          attachments: 1,
        },
        {
          id: 2,
          title: "Create a new board",
          description: "Create a new board for the team",
          status: "Backlog",
          comments: 1,
          attachments: 0,
        },
      ],
    },
    {
      name: "In Progress",
      items: [
        {
          id: 3,
          title: "Implement login functionality",
          description: "Implement login functionality with authentication.",
          status: "In Progress",
          assignees: [
            {
              id: 3,
              avt: "https://randomuser.me/api/portraits/thumb/women/78.jpg",
            },
          ],
          comments: 3,
          attachments: 2,
        },
        {
          id: 4,
          title: "Design homepage",
          description: "Create a design for the homepage of the website.",
          status: "In Progress",
          assignees: [
            {
              id: 4,
              avt: "https://randomuser.me/api/portraits/thumb/women/79.jpg",
            },
          ],
          comments: 0,
          attachments: 1,
        },
      ],
    },
    {
      name: "In Review",
      items: [
        {
          id: 5,
          title: "Refactor backend code",
          description: "Refactor the backend code for better performance.",
          status: "In Review",
          assignees: [
            {
              id: 5,
              avt: "https://randomuser.me/api/portraits/thumb/men/80.jpg",
            },
          ],
          comments: 1,
          attachments: 3,
        },
      ],
    },
    {
      name: "Finished",
      items: [
        {
          id: 6,
          title: "Deploy to production",
          description: "Deploy the latest changes to the production server.",
          status: "Finished",
          assignees: [
            {
              id: 6,
              avt: "https://randomuser.me/api/portraits/thumb/men/81.jpg",
            },
          ],
          comments: 4,
          attachments: 0,
        },
      ],
    },
  ]);

  // Función para manejar el final del arrastre
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Verificar si el arrastre se completó dentro de una columna de destino válida
    if (!destination) {
      return; // El elemento fue soltado fuera de una columna de destino
    }

    // Verificar si el elemento fue soltado en una posición diferente
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return; // El elemento fue soltado en su misma posición, no hay cambios
    }

    // Obtener la columna de origen y destino
    const newBoardData = [...boardData];
    const columnSourceIndex = newBoardData.findIndex((column) => column.name === source.droppableId);
    const columnDestinationIndex = newBoardData.findIndex((column) => column.name === destination.droppableId);

    // Obtener el elemento arrastrado
    const draggedItem = newBoardData[columnSourceIndex].items.find((item) => item.id.toString() === draggableId);

    // Remover el elemento de la columna de origen
    newBoardData[columnSourceIndex].items.splice(source.index, 1);

    // Insertar el elemento en la posición de la columna de destino
    newBoardData[columnDestinationIndex].items.splice(destination.index, 0, draggedItem);

    // Actualizar el estado local con la nueva data del tablero
    setBoardData(newBoardData);
  };

  return (
    <div className='pl-10'>
      <div className='flex justify-between'>
        {/* Board Header */}
        <div className='flex items-center font-poppins'>
          <h4 className='text-2xl font-bold text-primary'>Test board</h4>
          <FaChevronDown className='w-7 p-1 h-7 text-gray-500 rounded-full bg-white ml-3 shadow-sm cursor-pointer' />
        </div>
        {/* Columns */}
        <div className=''>
          <ul className='flex space-x-3'>
            <li>
              <img src='https://randomuser.me/api/portraits/thumb/men/75.jpg' className='rounded-full w-10 object-cover' alt='board' />
            </li>
            <li>
              <img src='https://randomuser.me/api/portraits/thumb/men/76.jpg' className='rounded-full w-10 ' alt='board' />
            </li>
            <li>
              <img src='https://randomuser.me/api/portraits/thumb/men/77.jpg' className='rounded-full w-10 ' alt='board' />
            </li>
            <li>
              <button className='border border-dashed flex items-center w-10 h-10 border-gray-500 justify-center rounded-full cursor-pointer mr-6'>
                <GoPlus className='w-5 h-5 text-gray-500' />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-4 gap-5 mr-10'>
          {boardData.map((column) => (
            <Droppable droppableId={column.name} key={column.name}>
              {(provided) => <BoardColumn key={column.name} title={column.name} items={column.items} provided={provided} />}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
