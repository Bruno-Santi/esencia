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
      <VictoryPie
        data={data}
        colorScale={[color, "#D3D3D380"]}
        innerRadius={120}
        labels={() => null}
        padding={7}
        labelComponent={tooltipComponent}
      />
      <div>
        <p className='text-center text-lg pt-2'>{metricName}</p>
      </div>
      {tooltipContainer && createPortal(tooltipComponent, tooltipContainer)}
    </div>
  );
};

export const Charts = () => {
  const { metricsForToday } = useDashboard();
  useEffect(() => {
    console.log(metricsForToday);
  }, [metricsForToday]);

  return (
    <div className='flex mx-auto -z-10 justify-center space-x-6'>
      <MetricChart metricName='Self Satisfaction' value={metricsForToday.self_satisfaction} color='#FF6384' />
      <MetricChart metricName='Team Collaboration' value={metricsForToday.team_collaboration} color='#36A2EB' />

      <MetricChart metricName='Work Engagement' value={metricsForToday.work_engagement} color='#FFCE56' />
      <MetricChart metricName='Workspace Wellbeing' value={metricsForToday.workspace} color='#4CAF50' />
      <div id='tooltip-container' className='-z-10' style={{ position: "fixed", top: 0, left: 0 }} />
    </div>
  );
};
