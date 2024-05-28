import { useDashboard } from "../../hooks/useDashboard";
import { useBoards } from "../hooks/useBoards";

export const NoSelectedBoard = () => {
  const { activeTeam } = useDashboard();
  const { activeBoard } = useBoards();
  console.log(activeBoard);
  console.log(activeTeam);

  return (
    <div className='text-primary pb-44 flex justify-center my-auto h-full text-primary/60 dark:text-teal-50 mt-48 font-poppins text-3xl'>
      {activeTeam === null ? "Selecciona un equipo" : !activeBoard ? "Selecciona una épica" : null}
    </div>
  );
};
