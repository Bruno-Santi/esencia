import { useDocumentTitle } from "../../hooks";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { BackButton, NoRetro } from "../components";

export const Retrospectives = () => {
  useDocumentTitle("Retrospectives | Esencia.app");
  const { modalOpen } = useDashboard();
  const { activeTeam } = useDashboard();
  return (
    <DashboardLayout>
      {/* <BackButton /> */}
      <div className='flex justify-center m-auto mt-6  '>
        <h1 className='font-manrope text-2xl text-primary pb-20 dark:text-tertiary'>Retrospectiva de equipo</h1>
      </div>
      <div className='flex h-full  md:mx-12 lg:mx-12 sm:mx-0 md:ml-26 lg:ml-26 sm:ml-0 justify-center my-0 lg:px-20 md:px-20 sm:px-0'>
        {!activeTeam ? (
          <span className='dark:text-tertiary text-primary pb-44 '>Selecciona un equipo.</span>
        ) : (
          <div
            className={`w-full h-full  bg-tertiary/20 shadow-lg sm:bg-transparent sm:shadow-none
         shadow-primary/50 lg:p-8 md:p-8 sm:pb-6 rounded-md  -z-${
           modalOpen ? "10" : "0"
         } dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 dark:shadow-white/10`}
          >
            {" "}
            <NoRetro />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
