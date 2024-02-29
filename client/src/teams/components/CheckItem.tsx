import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CheckItem = ({ item, onToggle }) => {
  console.log(item);

  const handleToggle = () => {
    onToggle(item._id, !item.isChecked);
  };

  return (
    <div className='flex items-center'>
      <FormControlLabel
        control={<Checkbox checked={item.isChecked} onChange={handleToggle} color='primary' />}
        label={item.content}
        style={{ textDecoration: item.isChecked ? "line-through" : "none" }}
      />
    </div>
  );
};

export default CheckItem;
