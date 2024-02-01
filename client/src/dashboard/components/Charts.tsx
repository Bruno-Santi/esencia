import React from "react";
import { Typography, Box } from "@material-ui/core";
import { useDashboard } from "../../hooks/useDashboard";
import { PieChart } from "@mui/x-charts/PieChart";

const MetricChart = ({ metricName, value, colors }) => {
  const data = [
    { id: metricName, label: metricName, value, color: colors[0] },
    { id: "empty", label: "", value: 100 - value, color: colors[1] },
  ];

  return (
    <Box width={280} height={250} margin={1} padding={0} display='flex' flexDirection='column' alignItems='center' className='relative right-3'>
      <Typography align='center' className='text-primary text-2xl dark:text-xl dark:text-tertiary'>
        <span className='text-lg text-primary font-poppins dark:text-tertiary'>{metricName}</span>
      </Typography>
      <PieChart
        series={[
          {
            data,
            color: colors[0],
            innerRadius: 38,
            outerRadius: 65,
            paddingAngle: 8,
            cornerRadius: 4,
            startAngle: -360,
            endAngle: 180,
            cx: 70,
            cy: 30,
          },
        ]}
        slotProps={{
          legend: { hidden: true },
        }}
        height={110}
        width={150}
      />
    </Box>
  );
};

export const Charts = () => {
  const { metricsForToday } = useDashboard();

  return (
    <section className='flex-col'>
      <Box className='flex h-52'>
        <MetricChart metricName='Self Satisfaction' value={Math.round(metricsForToday.self_satisfaction * 100)} colors={["#FF6384", "#8b8a9d"]} />
        <MetricChart metricName='Team Collaboration' value={Math.round(metricsForToday.team_collaboration * 100)} colors={["#36A2EB", "#8b8a9d"]} />
        <MetricChart metricName='Work Engagement' value={Math.round(metricsForToday.work_engagement * 100)} colors={["#FFCE56", "#8b8a9d"]} />
        <MetricChart metricName='Workspace Wellbeing' value={Math.round(metricsForToday.workspace_wellbeing * 100)} colors={["#2f8032", "#8b8a9d"]} />
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' p={1} m={1}>
        <span className='text-primary dark:text-tertiary font-poppins font-normal text-xl'>
          General Satisfaction -{" "}
          <span className=' font-bold  dark:text-white text-primary font-poppins'>{Math.round(metricsForToday.general_satisfaction * 100)}%</span>
          <div className='relative  bg-gray-400/60  rounded-full h-4 mt-4'>
            <div className='bg-orange-600 h-4 rounded-full' style={{ width: `${Math.round(metricsForToday.general_satisfaction * 100)}%` }}>
              <div className='absolute inset-0 flex items-center cursor-pointer justify-center group'>
                <span className='hidden group-hover:block text-lg text-primary group-hover:duration-700 animate-pulse dark:text-tertiary'>
                  {Math.round(metricsForToday.general_satisfaction * 100)}%
                </span>
              </div>
            </div>
          </div>
        </span>
      </Box>
    </section>
  );
};
