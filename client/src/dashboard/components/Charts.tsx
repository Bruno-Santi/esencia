import React from "react";
import { Typography, Box } from "@material-ui/core";
import { useDashboard } from "../../hooks/useDashboard";
import { PieChart } from "@mui/x-charts/PieChart";
import { ProgressBar } from "@tremor/react";

const MetricChart = ({ metricName, value, colors }) => {
  const data = [
    { id: metricName, label: metricName, value, color: colors[0] },
    { id: "empty", label: "", value: 100 - value, color: colors[1] },
  ];

  return (
    <Box
      width='100%'
      maxWidth={280}
      margin={1}
      padding={0}
      display='flex'
      flexDirection='column'
      alignItems='center'
      className='relative sm:h-28  sm:w-20 md:h-40 md:min-w-full md:items-center md:justify-center  lg:w-full lg:h-full lg:right-3 lg:-space-y-4 md:-space-x-7 md:-left-1 sm:right-3  '
    >
      <Typography align='center' className='text-primary  text-xl dark:text-xl dark:text-tertiary '>
        <span className='lg:text-sm  md:text-sm md:whitespace-pre-wrap md:mr-2  text-primary font-poppins dark:text-tertiary sm:text-sm'>{metricName}</span>
      </Typography>
      <PieChart
        series={[
          {
            data,
            color: colors[0],
            innerRadius: 38,
            outerRadius: 60,
            paddingAngle: 8,
            cornerRadius: 4,
            startAngle: -360,
            endAngle: 180,
            cx: 82,
            cy: 80,
          },
        ]}
        slotProps={{
          legend: { hidden: true },
        }}
        height={200}
        width={150}
      />
    </Box>
  );
};

export const Charts = () => {
  const { metricsForToday } = useDashboard();

  return (
    <section>
      <Box className='h-auto sm:flex lg:flex-row md:flex-row sm:flex-wrap md:flex-nowrap justify-center lg:-mt-6 md:-mt-16 sm:-mt-20'>
        <div className='sm:w-1/2 lg:w-auto  md:w-auto'>
          <MetricChart metricName='Satisfacción personal' value={Math.round(metricsForToday.self_satisfaction * 100)} colors={["#EF4444", "#8b8a9d"]} />
        </div>
        <div className='sm:w-1/2 lg:w-auto md:w-auto '>
          <MetricChart metricName='Colaboración en equipo' value={Math.round(metricsForToday.team_collaboration * 100)} colors={["#F97316", "#8b8a9d"]} />
        </div>
        <div className='sm:w-1/2 lg:w-auto md:w-auto'>
          <MetricChart metricName='Compromiso laboral' value={Math.round(metricsForToday.work_engagement * 100)} colors={["#3B82F6", "#8b8a9d"]} />
        </div>
        <div className='sm:w-1/2 lg:w-auto md:w-auto'>
          <MetricChart metricName='Espacio de trabajo' value={Math.round(metricsForToday.workspace_wellbeing * 100)} colors={["#D946EF", "#8b8a9d"]} />
        </div>
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' p={1} m={-1}>
        <span className='text-primary dark:text-tertiary sm:relative sm:bottom-4 font-poppins  font-normal lg:text-lg md:-mt-2 md:text-base sm:text-sm'>
          Satisfacción General
          <div className='  rounded-full md:h-6 md:mt-4 lg:h-6 lg:mt-4 sm:mt-2'>
            <ProgressBar
              label={`${Math.round(metricsForToday.general_satisfaction * 100)}%`}
              showAnimation={true}
              value={Math.round(metricsForToday.general_satisfaction * 100)}
              color='orange'
              className=''
            />
          </div>
        </span>
      </Box>
    </section>
  );
};
{
  /* <ProgressBar value={Math.round(metricsForToday.general_satisfaction * 100)} color='teal' className='mt-12' />; */
}
