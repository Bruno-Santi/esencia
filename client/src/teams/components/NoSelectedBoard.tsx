import { useDashboard } from "../../hooks/useDashboard";

export const NoSelectedBoard = () => {
  const { activeTeam } = useDashboard();

  return (
    <div className=' text-primary pb-44  flex justify-center my-auto h-full text-primary/60 dark:text-teal-50 mt-48 font-poppins text-3xl'>
      {activeTeam === null ? `Selecciona un equipo` : `Selecciona un tablero`}
    </div>
  );
};
