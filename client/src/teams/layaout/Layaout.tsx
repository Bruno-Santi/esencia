import React from "react";

export const Layaout = ({ children }) => {
  return (
    <div className='min-w-full min-h-screen bg-gray-100'>
      <main className='pl-40 pt-24'>{children}</main>
    </div>
  );
};
