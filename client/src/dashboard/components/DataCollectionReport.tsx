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
  if (dataAmount.length === 0) return <p className='text-2xl'>NO DATA YET, TRY MAKING ACTIONS</p>;

  return (
    <div>
      <ul className='text-primary text-xl md:text-sm text-left border-2 border-primary/30 rounded-lg space-y-2 m-auto justify-start '>
        {Object.entries(dataAmount).map(([key, value]) => (
          <li key={key} className='p-4 odd:bg-gray-400/40 rounded-lg'>
            {key.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())}: {renderValue(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};
