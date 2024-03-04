export const BoardReport = ({ title, value }) => {
  console.log(title, value);

  return (
    <div className='bg-gray-200/60 shadow-md shadow-primary/20 h-32 w-32 rounded-md py-4 px-2 text-center'>
      {" "}
      <div className='lg:text-2xl md:text-lg text-secondary'>{value}</div>
      <div>
        <span>{title}</span>
      </div>
    </div>
  );
};
