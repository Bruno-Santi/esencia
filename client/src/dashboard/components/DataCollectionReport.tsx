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
      className='md:mt-2 lg:-mt-6 shadow-lg w-[350px]
    shadow-primary/50 border-primary border rounded-md flex justify-center p-2 bg-quaternary'
    >
      {Object.entries(dataAmount).map(([key, value]) => (
        <span key={key} className='p-2 text-center text-tertiary flex flex-col '>
          <span className='font-poppins lg:text-sm md:text-xs'> {key.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())}:</span>{" "}
          <span className='font-poppins   lg:text-sm md:text-xs'>{renderValue(value)}</span>
        </span>
      ))}
    </div>
  );
};
