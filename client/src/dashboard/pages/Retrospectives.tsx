import { useDocumentTitle } from "../../hooks";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { BackButton, NoRetro } from "../components";

export const Retrospectives = () => {
  useDocumentTitle("Retrospectives | Esencia.app");
  const { modalOpen } = useDashboard();
  return (
    <DashboardLayout>
      {/* <BackButton /> */}
      <div className='flex justify-center m-auto mt-6  '>
        <h1 className='font-manrope text-2xl text-primary pb-20 dark:text-tertiary'>TEAM RETROSPECTIVE</h1>
      </div>
      <div className='flex h-full  mx-12 ml-26 justify-center my-0 px-20'>
        <div
          className={`w-full h-full bg-tertiary shadow-lg
         shadow-primary/50 p-8 rounded-md  -z-${modalOpen ? "10" : "0"} dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 dark:shadow-white/10`}
        >
          <NoRetro />
        </div>
      </div>
    </DashboardLayout>
  );
};
