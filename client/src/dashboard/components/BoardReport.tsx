export const BoardReport = ({ title, value }) => {
  console.log(title, value);

  return (
    <div className='bg-gray-200/60 shadow-md shadow-primary/20 lg:h-32 md:h-32 lg:w-32 md:w-32 sm:w-20 rounded-md py-4 px-2 text-center'>
      {" "}
      <div className='lg:text-2xl md:text-lg sm:text-sm text-secondary'>{value}</div>
      <div>
        <span className='sm:text-xs sm:w-'>{title}</span>
      </div>
    </div>
  );
};
