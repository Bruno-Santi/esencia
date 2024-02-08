import React from "react";
import { TbDotsVertical } from "react-icons/tb";
import { CardItem } from "./CardItem";
import { GoPlus } from "react-icons/go";
import { Droppable, Draggable } from "react-beautiful-dnd";

export const BoardColumn = ({ title, items, provided }) => {
  return (
    <div ref={provided.innerRef} className='bg-gray-400 shadow-lg shadow-black/30 p-3 text-gray-100 mt-10 font-poppins rounded-md '>
      <h1 className='flex justify-between items-center text-xl'>
        <span>{title}</span> <TbDotsVertical className='w-5 h-5 text-gray-100 cursor-pointer' />
      </h1>
      {items.map((item, index) => (
        <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <CardItem item={item} />
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
      <button className='flex justify-center items-center mt-6 m-auto space-x-2 text-lg'>
        <span>Add task</span> <GoPlus className='bg-black/60  rounded-full w-5 h-5 text-gray-100' />
      </button>
    </div>
  );
};
