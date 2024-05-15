import { useEffect, useState } from "react";
import { useDocumentTitle, useNavigateTo } from "../hooks";
import { FaqItem } from "./FaqItem";
import { guides } from "../data/guideData";
import { faqsList } from "../data/faqsEsencia";
import { agileList } from "../data/faqsAgile";
import { LandingLayaout } from "../layaout/LandingLayaout";
import { IoHomeOutline } from "react-icons/io5";

export const FaqsLanding = () => {
  useDocumentTitle("Faqs | Esencia.app");
  const { handleNavigate } = useNavigateTo();

  const [currentSection, setCurrentSection] = useState(""); // Estado para almacenar la sección actual

  useEffect(() => {
    // Listener para detectar el desplazamiento y actualizar la sección actual
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll("section"); // Obtener todas las secciones
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentSection(section.id); // Actualizar la sección actual
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LandingLayaout>
      {/* Botón para scrollear a la Guía de Uso de Esencia.app */}
      <div className='flex flex-col absolute space-y-2 font-poppins text-sm ' style={{ position: "fixed", top: "50%", left: "70px" }}>
        <button
          onClick={() => document.getElementById("guia-uso-esencia").scrollIntoView({ behavior: "smooth" })}
          className={`${currentSection === "guia-uso-esencia" ? "bg-secondary text-tertiary" : "bg-gray-200"} p-2 duration-300 rounded-md `}
        >
          Guía de Uso de Esencia.app
        </button>

        {/* Botón para scrollear a las Preguntas Frecuentes sobre Esencia */}
        <button
          onClick={() => document.getElementById("preguntas-frecuentes-esencia").scrollIntoView({ behavior: "smooth" })}
          className={`${currentSection === "preguntas-frecuentes-esencia" ? "bg-secondary text-tertiary" : "bg-gray-200"} p-2 duration-300 rounded-md `}
        >
          Preguntas Frecuentes sobre Esencia
        </button>

        {/* Botón para scrollear a las Preguntas Frecuentes sobre Agilidad */}
        <button
          onClick={() => document.getElementById("preguntas-frecuentes-agile").scrollIntoView({ behavior: "smooth" })}
          className={`${currentSection === "preguntas-frecuentes-agile" ? "bg-secondary text-tertiary" : "bg-gray-200"} p-2 duration-300 rounded-md `}
        >
          Preguntas Frecuentes sobre Agilidad
        </button>

        <span
          className='px-4 py-2 cursor-pointer rounded-full bg-secondary duration-300 group hover:bg-tertiary'
          style={{ position: "fixed", bottom: "20px", right: "70px" }}
          onClick={() => handleNavigate("/")}
        >
          <IoHomeOutline className='w-8 h-12 text-teal-50 group-hover:text-primary duration-300' />
        </span>
      </div>

      {/* Ancla para la sección de Guía de Uso de Esencia.app */}
      <a id='guia-uso-esencia' />

      <div className='w-3/6  flex flex-col justify-center m-auto space-y-4 -mt-6 mb-20 '>
        <section id='guia-uso-esencia' className='min-h-screen items-center m-auto flex flex-col justify-center space-y-6'>
          <h1 className='text-center font-manrope text-2xl text-primary/60 dark:text-tertiary p-2'>Guía de uso Esencia.app</h1>
          {guides.map(({ id, title, subtitle, text, url }) => {
            return <FaqItem key={id} title={title} subtitle={subtitle} text={text} url={url} />;
          })}
        </section>

        {/* Ancla para la sección de Preguntas Frecuentes sobre Esencia */}
        <a id='preguntas-frecuentes-esencia' className='' />

        <section id='preguntas-frecuentes-esencia' className='min-h-screen items-center m-auto flex flex-col justify-center space-y-6'>
          <h1 className='text-center font-manrope text-2xl text-primary/60 dark:text-tertiary p-2'>Preguntas Frecuentas sobre Esencia:</h1>
          {faqsList.map(({ id, title, text }) => {
            return <FaqItem key={id} title={title} text={text} />;
          })}
        </section>

        {/* Ancla para la sección de Preguntas Frecuentes sobre Agilidad */}
        <a id='preguntas-frecuentes-agile' />

        <section id='preguntas-frecuentes-agile' className='min-h-screen items-center m-auto flex flex-col justify-center space-y-6'>
          <h1 className='text-center font-manrope text-2xl text-primary/60 dark:text-tertiary p-2'>Preguntas Frecuentas sobre Agilidad:</h1>
          {agileList.map(({ id, title, text }) => {
            return <FaqItem key={id} title={title} text={text} />;
          })}
        </section>
      </div>
    </LandingLayaout>
  );
};
