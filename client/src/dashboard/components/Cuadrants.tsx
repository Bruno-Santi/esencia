export const Cuadrants = ({ icon, label, value, color }) => {
  console.log(color);

  return (
    <div className={`flex flex-col w-44 h-44 items-center justify-center text-primary dark:text-tertiary rounded-lg space-y-2 ${color}`}>
      <i className={`${label === "Self Satisfaction" ? `text-tertiary text-5xl pt-3` : `text-tertiary text-4xl pt-3`}`}>{icon}</i>
      <span className='text-lg font-bold font-poppins text-tertiary p-2 shadow-xl shadow-black/30 rounded-b-lg'>{label}</span>
      <span className='text-lg font-poppins font-bold text-tertiary'>{Math.round(value)}</span>
    </div>
  );
};
