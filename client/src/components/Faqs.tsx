import { DashboardLayout } from "../layaout/DashboardLayout";
import { useDocumentTitle } from "../hooks";
import { FaqItem } from "./FaqItem";
import { guides } from "../data/guideData";
import { faqsList } from "../data/faqsEsencia";
import { agileList } from "../data/faqsAgile";

export const Faqs = () => {
  useDocumentTitle("Faqs | Esencia.app");
  return (
    <DashboardLayout>
      <div className='w-2/3 flex flex-col justify-center m-auto space-y-4 mt-12 mb-20'>
        <h1 className='text-center font-manrope text-2xl text-primary/60 dark:text-tertiary p-2'>Guía de uso Esencia.app</h1>
        {guides.map(({ id, title, subtitle, text, url }) => {
          return <FaqItem key={id} title={title} subtitle={subtitle} text={text} url={url} />;
        })}
        <h1 className='text-center font-manrope text-2xl text-primary/60 dark:text-tertiary p-2'>Preguntas Frecuentas sobre Esencia:</h1>
        {faqsList.map(({ id, title, text }) => {
          return <FaqItem key={id} title={title} text={text} />;
        })}

        <h1 className='text-center font-manrope text-2xl text-primary/60 dark:text-tertiary p-2'>Preguntas Frecuentas sobre Agilidad:</h1>
        {agileList.map(({ id, title, text }) => {
          return <FaqItem key={id} title={title} text={text} />;
        })}
      </div>
    </DashboardLayout>
  );
};
