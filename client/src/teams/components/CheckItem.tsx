import React from "react";

const CheckItem = ({ item, onToggle }) => {
  console.log(item);

  const handleToggle = () => {
    onToggle(item._id, !item.isChecked);
  };

  return (
    <div className='flex items-center'>
      <input type='checkbox' checked={item.isChecked} onChange={handleToggle} className='mr-2' />
      <span style={{ textDecoration: item.isChecked ? "line-through" : "none" }}>{item.content}</span>
    </div>
  );
};

export default CheckItem;
