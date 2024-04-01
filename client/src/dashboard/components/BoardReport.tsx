export const BoardReport = ({ title, value }) => {
  console.log(title, value);

  return (
    <div className='bg-gray-200/60   dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800  shadow-md shadow-primary/20 lg:h-24 md:h-32 lg:w-26 md:w-32 sm:w-20 rounded-md py-4 px-2 text-center'>
      {" "}
      <div className='lg:text-xl md:text-lg sm:text-sm text-secondary dark:text-tertiary'>{value}</div>
      <div>
        <span className=' dark:text-tertiary lg:text-lg md:text-lg sm:text-xs'>{title}</span>
      </div>
    </div>
  );
};
