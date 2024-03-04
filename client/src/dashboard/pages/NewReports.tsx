import React from "react";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { Cuadrants } from "../components/Cuadrants";
import { FaHome, FaSmile, FaTools, FaUsers } from "react-icons/fa";
import { MdOutlineSelfImprovement } from "react-icons/md";
import { Divider, Grid } from "@mui/material";
import { BoardReport, RetroResume } from "../components";
import { LineChart } from "@mui/x-charts";
import { LineCharts } from "../components/LineCharts";

export const NewReports = () => {
  return (
    <DashboardLayout>
      <div className='font-poppins flex justify-center mt-4 items-center'>
        <span className='text-2xl text-primary'>
          Sprint <span className='text-secondary'>2</span> Report
        </span>
      </div>
      <Grid container spacing={0} justifyContent='left' alignItems='center' ml={{ xs: 0, lg: 0 }} className='gap-4 items-center space-x-10 pt-6'>
        <Grid item xs={12} lg={5}>
          <div className='flex space-x-0 ml-10 gap-6  font-poppins text-primary '>
            <BoardReport title='Objetivos planificados' value='5' />
            <BoardReport title='Objetivos en proceso' value='3 (60%)' />
            <BoardReport title='Objetivos en revisión' value='0' />
            <BoardReport title='Objetivos completados' value='3' />
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className='flex text-center'>
            <Cuadrants icon={<FaSmile />} label='General Satisfaction' value={12} color='bg-[#8136c2]' />
            <Cuadrants icon={<MdOutlineSelfImprovement />} label='Self Satisfaction' value={12} color='bg-[#FF6384]' />
            <Cuadrants icon={<FaUsers />} label='Team Collaboration' value={12} color='bg-[#36A2EB]' />
            <Cuadrants icon={<FaTools />} label='Work Engagement' value={10} color='bg-[#ebb734]' />
            <Cuadrants icon={<FaHome />} label='Workspace Well-Being' value={15} color='bg-[#5a2f80]' />
          </div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 text-primary font-poppins p-2 h-[250px] overflow-hidden relative'>
            <div className=' h-full'>
              <div className='flex flex-col'>
                <span className='p-2'>Resumen de retro.</span>
                <span className='italic text-sm font-light px-2 font-poppins'>Pregunta / Idea / Votos</span>
              </div>
              <Divider className='py-2' />
              <div className='mt-8 px-2 overflow-y-scroll absolute top-14 left-0 right-0 bottom-0'>
                <ul className='text-sm space-y-4 py-4 px-2'>
                  <RetroResume question='¿Que deberíamos empezar a hacer?' response='Avanzar con el backlog' vote='4' />
                  <RetroResume question='¿Que deberíamos empezar a hacer?' response='Avanzar con el backlog' vote='4' />
                  <RetroResume question='¿Que deberíamos empezar a hacer?' response='Avanzar con el backlog' vote='4' />
                  <RetroResume question='¿Que deberíamos empezar a hacer?' response='Avanzar con el backlog' vote='4' />
                  <RetroResume question='¿Que deberíamos empezar a hacer?' response='Avanzar con el backlog' vote='4' />
                  <RetroResume question='¿Que deberíamos empezar a hacer?' response='Avanzar con el backlog' vote='4' />
                </ul>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={7} className='pr-6'>
          <div className=''>
            {" "}
            {/* Aumenta la altura para permitir dos líneas */}
            <LineCharts height='20em' />
          </div>
        </Grid>
        <Grid item xs={12} lg={5} className=''>
          <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 text-primary font-poppins p-2 h-[250px] overflow-hidden relative'>
            <div className=' h-full'>
              <div className='flex flex-col'>
                <span className='p-2'>Preguntas realizadas en este sprint.</span>
                <span className='italic text-sm font-light px-2 font-poppins'>Pregunta / Resultado</span>
              </div>
              <Divider className='py-2' />
              <div className='mt-8 px-2 overflow-y-scroll absolute top-14 left-0 right-0 bottom-0'>
                <ul className='text-sm space-y-4 py-4 px-2'>
                  <li className=''>
                    {" "}
                    • <span className='text-secondary font-bold'>En una escala del 1 al 10, ¿Cuánto disfrutas del proceso creativo en tu trabajo?</span> / 80%
                  </li>
                  <li className=''>
                    {" "}
                    • <span className='text-secondary font-bold'>En una escala del 1 al 10, ¿Cuánto disfrutas del proceso creativo en tu trabajo?</span> / 80%
                  </li>
                  <li className=''>
                    {" "}
                    • <span className='text-secondary font-bold'>En una escala del 1 al 10, ¿Cuánto disfrutas del proceso creativo en tu trabajo?</span> / 80%
                  </li>
                  <li className=''>
                    {" "}
                    • <span className='text-secondary font-bold'>En una escala del 1 al 10, ¿Cuánto disfrutas del proceso creativo en tu trabajo?</span> / 80%
                  </li>
                  <li className=''>
                    {" "}
                    • <span className='text-secondary font-bold'>En una escala del 1 al 10, ¿Cuánto disfrutas del proceso creativo en tu trabajo?</span> / 80%
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} lg={5}>
          <div className='bg-gray-200/60 rounded-md shadow-md shadow-primary/20 text-primary h-[250px] font-poppins p-2 overflow-hidden relative'>
            <div className=' h-full '>
              <div className='p-2'>Análisis de conocimiento.</div>
              <Divider className='py-2 ' />

              <div className='mt-6 px-4  pb-4 overflow-y-scroll absolute top-14 left-0 right-0 bottom-0'>
                Durante esta semana, hemos experimentado un aumento significativo en la Satisfacción General del equipo de trabajo, con una diferencia de 35.72%
                en comparación con la semana anterior. Se han observado mejoras en todos los cuadrantes, siendo el de Workspace Well-Being el de mayor
                crecimiento con un incremento del 52.5%. Esto indica que las condiciones físicas y el ambiente laboral han tenido un impacto positivo en el
                equipo. Sin embargo, es importante destacar que aún existen áreas de oportunidad en cuanto a la comunicación y el trabajo en equipo, que fueron
                mencionados como tópicos recurrentes por los miembros del equipo. Además, algunos objetivos no se lograron completar durante la semana y se
                identificó la necesidad de mejorar los plazos de entrega. En resumen, ha sido una semana positiva en términos generales, pero es fundamental
                continuar trabajando en la comunicación y fortalecer el trabajo en equipo para seguir mejorando.
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={2}>
          15
        </Grid>
        <Grid item xs={12} lg={2}>
          16
        </Grid>
        <Grid item xs={12} lg={2}>
          17
        </Grid>
        <Grid item xs={12} lg={2}>
          18
        </Grid>
        <Grid item xs={12} lg={2}>
          19
        </Grid>
        <Grid item xs={12} lg={2}>
          20
        </Grid>
        <Grid item xs={12} lg={2}>
          21
        </Grid>
        <Grid item xs={12} lg={2}>
          22
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
