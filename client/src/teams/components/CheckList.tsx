import React, { useState } from "react";
import api from "../../helpers/apiToken";
import CheckItem from "./CheckItem";
import { useBoards } from "../hooks/useBoards";

export const CheckList = ({ checkList, cardId }) => {
  const [newItem, setNewItem] = useState("");
  console.log(checkList[0].checkList);
  const { startAddingNewItemCheckList, startTogglingItem } = useBoards();

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem2 = { content: newItem, isChecked: false };
    try {
      await startAddingNewItemCheckList(cardId, newItem2, checkList[0]._id);

      setNewItem("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleItem = async (itemId, isChecked) => {
    try {
      await startTogglingItem(cardId, checkList[0]._id, itemId);
    } catch (error) {
      console.error(error);
    }
  };
  const { title } = checkList[0];

  return (
    <div className='flex flex-col space-x-4 justify-start font-poppins w-full text-primary mt-2'>
      <div>
        <span>Checklist</span>
      </div>
      <div className='overflow-y-scroll h-[280px] '>
        {checkList[0].checkItems &&
          checkList[0].checkItems.map((item, index) => <CheckItem key={index} item={item} onToggle={handleToggleItem} cardId={cardId} />)}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newItem}
          onChange={handleNewItemChange}
          placeholder='Ingrese un nuevo ítem...'
          className='w-full px-3 py-2 mt-2 border rounded-md'
        />
        <button
          type='submit'
          className='w-full mt-2 bg-secondary text-sm p-2 justify-center font-poppins text-tertiary rounded-md hover:bg-primary duration-300'
        >
          Añadir ítem
        </button>
      </form>
    </div>
  );
};
