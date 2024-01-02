import { useDocumentTitle } from "../../hooks";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { BackButton, NoRetro } from "../components";

export const Retrospectives = () => {
  useDocumentTitle("Retrospectives | Esencia.app");
  return (
    <DashboardLayout>
      <BackButton />
      <div className='flex justify-center m-auto mt-6'>
        <h1 className='font-poppins text-2xl text-primary'>TEAM RETROSPECTIVE</h1>
      </div>
      <div className='grid columns-12 h-screen grid-rows-1 gap-6  mx-12 ml-28 mt-6'>
        <div
          className='col-start-1 col-end-10 col-span-3 h-5/6 row-span-1 rounded-md p-6 bg-tertiary shadow-lg
         shadow-primary/50'
        >
          asd
        </div>
        <div
          className=' col-start-10 col-end-12 row-span-1 h-5/6 bg-tertiary shadow-lg
         shadow-primary/50 p-6 rounded-md'
        >
          <NoRetro />
        </div>
      </div>
    </DashboardLayout>
  );
};
