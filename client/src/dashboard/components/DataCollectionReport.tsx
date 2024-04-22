import { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";

const renderValue = (value: unknown): React.ReactNode => {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  } else {
    return "Unsupported Type";
  }
};
export const DataCollectionReport = () => {
  const { dataAmount } = useDashboard();
  useEffect(() => {
    console.log(dataAmount);
  }, []);

  if (dataAmount.length === 0) return null;

  return (
    <div
      className='md:mt-2 lg:-mt-6 shadow-lg flex flex-col   lg:w-[550px] md:w-[550px] sm:w-screen 
    shadow-primary/20 border-primary border rounded-md  justify-center p-2 bg-quaternary dark:bg-quaternary/40'
    >
      <span className='text-tertiary font-poppins items-center justify-center text-center'>Datos de los últimos 15 días.</span>
      <section className='flex items-center justify-center'>
        {Object.entries(dataAmount).map(([key, value]) => (
          <span key={key} className='md:p-2 lg:p-2 sm:p-1 sm:space-y-2 text-center text-tertiary flex flex-col '>
            <span className='font-poppins lg:text-sm md:text-xs sm:text-xs'> {key.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())}:</span>{" "}
            <span className='font-poppins font-bold   lg:text-base md:text-xs'>{renderValue(value)}</span>
          </span>
        ))}
      </section>
    </div>
  );
};
