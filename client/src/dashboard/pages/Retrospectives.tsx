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
      <div className='flex h-full  mx-12 ml-28 justify-center my-0 p-20'>
        <div
          className='  w-full h-full bg-tertiary shadow-lg
         shadow-primary/50 p-8 rounded-md'
        >
          <NoRetro />
        </div>
      </div>
    </DashboardLayout>
  );
};
