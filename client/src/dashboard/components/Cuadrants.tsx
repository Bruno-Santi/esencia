export const Cuadrants = ({ icon, label, value, color }) => {
  console.log(color);
  console.log(Math.round(value).toString());
  const formattedValue = Math.round(value).toString();
  return (
    <div className={`flex flex-col  w-56 h-36  my-auto items-center justify-center  mx-1 text-primary dark:text-tertiary rounded-lg space-y-2 ${color}`}>
      <i className={`${label === "Self Satisfaction" ? `text-tertiary w-52  justify-center text-center flex text-3xl pt-3` : `text-tertiary text-2xl pt-3`}`}>
        {icon}
      </i>
      <span className='text-[12px] font-bold font-poppins text-tertiary p-2 shadow-xl shadow-black/30 rounded-b-lg'>{label}</span>
      <span className='text-lg font-poppins font-bold text-tertiary'>{formattedValue.includes("-") ? `${formattedValue}%` : `+${formattedValue}%`}</span>
    </div>
  );
};
