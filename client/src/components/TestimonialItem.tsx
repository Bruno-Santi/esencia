import { Avatar } from "@mui/material";
import React from "react";

export const TestimonialItem = ({ testimonial }) => {
  console.log(testimonial);

  return (
    <div className='lg:w-2/6 px-4 md:px-10 md:w-3/6 sm:w-6/6 italic sm:mb-28 relative '>
      "{testimonial.content}"
      <div className='flex items-center mt-2 absolute lg:top-28 md:top-44'>
        <Avatar alt='logo-testimonial' src={testimonial.avatar} className='mr-2' />
        <div>
          <div>{testimonial.name.trim()}</div>
          <div>{testimonial.description.trim()}</div>
        </div>
      </div>
    </div>
  );
};
