export const ActiveBoardHeader = ({ activeBoard }) => {
  return (
    <div className='flex justify-center font-poppins text-primary dark:text-tertiary space-x-20 text-xl'>
      <div className=''>{activeBoard[0].title}</div>
      <div>
        Sprint: <span className='text-secondary'>{activeBoard[0].sprint}</span>
      </div>
    </div>
  );
};
