import React from "react";
import { ImAttachment } from "react-icons/im";
import { HiOutlineChatAlt2 } from "react-icons/hi";

export const CardItem = ({ item }) => {
  return (
    <div className='bg-white text-primary rounded-md p-3 mt-3 relative'>
      <span className=''>{item?.title}</span>
      <div className='flex justify-between pt-3'>
        <div className='flex space-x-4 items-center'>
          <span className='flex space-x-2 items-center'>
            <HiOutlineChatAlt2 className='mr-1 text-gray-500 w-4 ' /> {item?.comments}
          </span>
          <span className='flex space-x-2 items-center'>
            <ImAttachment className='mr-1 text-gray-500 w-4' /> {item?.attachments}
          </span>

          <ul className='flex items-center absolute right-3'>
            {item?.assignees?.map((assignee) => (
              <li className='list-none' key={assignee?.id}>
                <img src={assignee?.avt} className='rounded-full w-6 ' alt='board' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
