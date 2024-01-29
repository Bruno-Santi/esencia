import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { VictoryPie, VictoryTooltip } from "victory";
import { useDashboard } from "../../hooks/useDashboard";

const MetricChart = ({ metricName, value, color }) => {
  const data = [
    { x: metricName, y: value },
    { x: "", y: 100 - value },
  ];

  const tooltipContainer = document.getElementById("tooltip-container");

  const tooltipComponent = (
    <VictoryTooltip
      style={{ fontSize: 48, zIndex: 0 }}
      flyoutStyle={{ fill: "white", stroke: "gray", strokeWidth: 1 }}
      cornerRadius={5}
      flyoutPadding={10}
      orientation='top'
      renderInPortal={false}
      text={({ datum }) => `${datum.y}`}
    />
  );

  return (
    <div className='-z-0 w-[170px]' style={{ width: 170, height: 110, margin: 25, padding: 6 }}>
      <VictoryPie data={data} colorScale={[color, "#D3D3D380"]} innerRadius={120} labels={() => null} padding={7} labelComponent={tooltipComponent} />
      <div>
        <p className='text-center text-lg pt-2 dark:text-tertiary'>{metricName}</p>
      </div>
      {tooltipContainer && createPortal(tooltipComponent, tooltipContainer)}
    </div>
  );
};

export const Charts = () => {
  const { metricsForToday } = useDashboard();
  //   <div>

  // </div>
  return (
    <section>
      <div className='flex mx-auto    justify-center space-x-6 space-y-6'>
        <MetricChart metricName='Self Satisfaction' value={Math.round(metricsForToday.self_satisfaction * 100)} color='#FF6384' />
        <MetricChart metricName='Team Collaboration' value={Math.round(metricsForToday.team_collaboration * 100)} color='#36A2EB' />

        <MetricChart metricName='Work Engagement' value={Math.round(metricsForToday.work_engagement * 100)} color='#FFCE56' />
        <MetricChart metricName='Workspace Wellbeing' value={Math.round(metricsForToday.workspace_wellbeing * 100)} color='#4CAF50' />
        <div id='tooltip-container' className='-z-10' style={{ position: "fixed", top: 0, left: 0 }} />
      </div>
      <div className='text-tertiary text-4xl pt-2 flex justify-center mt-12'>
        {" "}
        <div className='w-3/4 h-2.5'>
          <div className='flex flex-col justify-between'>
            <span className='text-base font-bold font-poppins text-primary  dark:text-tertiary'>
              General Satisfaction -{" "}
              <span className=' font-bold  dark:text-white text-primary font-poppins'>{Math.round(metricsForToday.general_satisfaction * 100)}%</span>
            </span>

            <div className='relative  bg-gray-400/60  rounded-full h-4 mt-4'>
              <div className='bg-orange-600 h-4 rounded-full' style={{ width: `${Math.round(metricsForToday.general_satisfaction * 100)}%` }}>
                <div className='absolute inset-0 flex items-center cursor-pointer justify-center group'>
                  <span className='hidden group-hover:block text-lg text-primary group-hover:duration-700 animate-pulse dark:text-tertiary'>
                    {Math.round(metricsForToday.general_satisfaction * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
