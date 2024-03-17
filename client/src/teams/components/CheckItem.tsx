import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FiTrash2 } from "react-icons/fi";
import { useBoards } from "../hooks/useBoards";
const CheckItem = ({ item, onToggle, cardId }) => {
  console.log(cardId);
  const { toastDelete } = useBoards();
  const handleToggle = () => {
    onToggle(item._id, !item.isChecked);
  };

  return (
    <div className='flex items-center mb-3 mt-3 scale-95'>
      <span className='cursor-pointer mr-4'>
        <FiTrash2 className='text-secondary duration-300 hover:text-primary h-5 w-5' onClick={() => toastDelete(item._id, cardId)} />
      </span>
      <FormControlLabel
        control={<Checkbox checked={item.isChecked} onChange={handleToggle} color='primary' />}
        label={item.content}
        style={{ textDecoration: item.isChecked ? "line-through" : "none" }}
        className=''
      />
    </div>
  );
};

export default CheckItem;
