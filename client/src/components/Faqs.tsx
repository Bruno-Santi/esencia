import React from "react";
import { DashboardLayout } from "../layaout/DashboardLayout";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDocumentTitle } from "../hooks";

export const Faqs = () => {
  useDocumentTitle("Faqs | Esencia.app");
  return (
    <DashboardLayout>
      <div className='w-2/3 flex flex-col justify-center m-auto space-y-12 mt-28 mb-20'>
        <h1 className='text-center font-manrope text-2xl text-primary/60 dark:text-tertiary'>Preguntas Frecuentes</h1>
        <Accordion className='dark:bg-black dark:text-tertiary'>
          <AccordionSummary className='dark:text-tertiary' expandIcon={<ExpandMoreIcon className='dark:text-tertiary' />}>
            <Typography>
              <span className='font-poppins'>Registro</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className='font-poppins flex flex-col justify-center text-center m-auto'>
                <span className='text-secondary'>Únete a la revolución ágil con Esencia.</span> <br />
                En este video tutorial, te mostraremos cómo registrarte en nuestra plataforma y crear tu equipo en solo unos simples pasos. <br />
                Descubre cómo Esencia puede ayudarte a potenciar la agilidad de tu equipo desde el primer momento. <br />
                <iframe
                  className='mt-6 m-auto'
                  width='560'
                  height='315'
                  src='https://www.youtube.com/embed/PbGgDm1qC20'
                  title='Registro'
                  allowfullscreen
                ></iframe>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className='dark:bg-black dark:text-tertiary'>
          <AccordionSummary className='dark:text-tertiary' expandIcon={<ExpandMoreIcon className='dark:text-tertiary' />}>
            <Typography>
              <span className='font-poppins'>Tableros</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className='font-poppins flex flex-col justify-center text-center m-auto'>
                <span className='text-secondary'>Organiza, colabora, triunfa.</span> <br />
                Descubre cómo Esencia puede llevar la gestión de tareas de tu equipo al siguiente nivel. <br />
                En este video, te mostraremos cómo crear, organizar y hacer un seguimiento de tus tareas con nuestros intuitivos tableros. <br />
                Simplifica tu flujo de trabajo y mantén a tu equipo en sincronía. <br />
                <iframe
                  className='mt-6 m-auto'
                  width='560'
                  height='315'
                  src='https://www.youtube.com/embed/fh9xqIt07us'
                  title='Tableros'
                  allowfullscreen
                ></iframe>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className='dark:bg-black dark:text-tertiary'>
          <AccordionSummary className='dark:text-tertiary' expandIcon={<ExpandMoreIcon className='dark:text-tertiary' />}>
            <Typography>
              <span className='font-poppins'>Encuestas Pulso</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className='font-poppins flex flex-col justify-center text-center m-auto'>
                <span className='text-secondary'>Conecta, evalúa, mejora</span> . <br />
                Descubre cómo Esencia puede ayudarte a mantener el pulso de tu equipo con nuestras encuestas pulso. <br />
                En este video, te mostraremos cómo enviar encuestas a tu equipo, recopilar feedback valioso y monitorear el progreso en tiempo real. <br />
                Obtén insights profundos sobre la satisfacción personal, colaboración en equipo, compromiso laboral y bienestar en el espacio de trabajo. <br />
                Con Esencia, impulsa la cultura de tu equipo hacia nuevos horizontes de éxito. <br />
                <iframe
                  className='mt-6 m-auto'
                  width='560'
                  height='315'
                  src='https://www.youtube.com/embed/L0aDoMIClzw'
                  title='Encuestas Pulso'
                  allowfullscreen
                ></iframe>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className='dark:bg-black dark:text-tertiary'>
          <AccordionSummary className='dark:text-tertiary' expandIcon={<ExpandMoreIcon className='dark:text-tertiary' />}>
            <Typography>
              <span className='font-poppins'>Retrospectivas</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className='font-poppins flex flex-col justify-center text-center m-auto'>
                <span className='text-secondary'>Reflexiona, mejora, avanza.</span> <br />
                En este video, exploraremos el poder del módulo de retrospectivas de Esencia. <br />
                Aprende cómo analizar tus proyectos pasados, identificar áreas de mejora y planificar acciones concretas para impulsar el éxito futuro de tu
                equipo. <br />
                <iframe
                  className='mt-6 m-auto'
                  width='560'
                  height='315'
                  src='https://www.youtube.com/embed/e5kgNzYysUw'
                  title='Retrospectivas'
                  allowfullscreen
                ></iframe>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className='dark:bg-black dark:text-tertiary'>
          <AccordionSummary className='dark:text-tertiary' expandIcon={<ExpandMoreIcon className='dark:text-tertiary' />}>
            <Typography>
              <span className='font-poppins'>Sprint Report</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className='font-poppins flex flex-col justify-center text-center m-auto'>
                <span className='text-secondary'>Analiza, optimiza, crece.</span> <br />
                En este video, exploraremos la potencia de los reportes de sprint de Esencia. <br />
                Aprende cómo visualizar métricas clave, identificar tendencias y tomar decisiones informadas para optimizar tu proceso ágil. <br />
                Con Esencia, obtén la información que necesitas para crecer y triunfar. <br />
                <iframe
                  className='mt-6 m-auto'
                  width='560'
                  height='315'
                  src='https://www.youtube.com/embed/nMIsD8K8ZbU'
                  title='Sprint Report'
                  allowfullscreen
                ></iframe>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </DashboardLayout>
  );
};
