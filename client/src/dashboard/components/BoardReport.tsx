export const BoardReport = ({ title, value }) => {
  console.log(title, value);

  return (
    <div className='lg:w-[110px] md:w-[90px]   flex flex-col items-center bg-quaternary lg:mt-10 md:px-4 dark:bg-gradient-to-br dark:from-zinc-900 lg:h-20 md:h-20 sm:w-20 dark:to-gray-800   shadow-md shadow-primary/20  '>
      <div>
        <span className=' text-tertiary md:whitespace-nowrap lg:text-sm md:text-xs md:p-6 sm:text-xs lg:font-bold  '>{title}</span>
      </div>
      <div className='rounded-md py-4 px-4 text-center'>
        {" "}
        <div className='lg:text-xl md:text-2xl sm:text-sm text-tertiary'>{value}</div>
      </div>
    </div>
  );
};
