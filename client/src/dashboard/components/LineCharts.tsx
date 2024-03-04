import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { useDashboard } from "../../hooks/useDashboard";
import { formatDate } from "../../helpers";

export const LineCharts = ({ height = "8em" }) => {
  const themeLocal = localStorage.getItem("theme");
  const [theme, setTheme] = useState();
  const { linesMetrics } = useDashboard();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    setTheme(themeLocal);
  }, [theme]);

  const chartData = useMemo(() => {
    if (!linesMetrics || linesMetrics.length === 0) {
      return null;
    }

    const formattedData = linesMetrics.map((metric) => ({
      date: formatDate(metric.date),
      daily_general_satisfaction: metric.daily_general_satisfaction * 100,
      daily_self_satisfaction: metric.daily_self_satisfaction * 100,
      daily_team_collaboration: metric.daily_team_collaboration * 100,
      daily_work_engagement: metric.daily_work_engagement * 100,
      daily_workspace_wellbeing: metric.daily_workspace_wellbeing * 100,
    }));

    const labels = formattedData.map((data) => data.date);

    return {
      labels: labels,
      datasets: [
        {
          label: "Self Satisfaction",
          data: formattedData.map((data) => data.daily_self_satisfaction),
          borderColor: "rgba(255, 99, 132, 0.5)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Team Collaboration",
          data: formattedData.map((data) => data.daily_team_collaboration),
          borderColor: "rgba(54, 162, 235, 0.5)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          label: "Work Engagement",
          data: formattedData.map((data) => data.daily_work_engagement),
          borderColor: "rgba(255, 206, 86, 0.5)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
        },
        {
          label: "Workspace Wellbeing",
          data: formattedData.map((data) => data.daily_workspace_wellbeing),
          borderColor: "#2f8032",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  }, [linesMetrics]);

  useEffect(() => {
    if (chartContainer.current && chartData && chartData.labels.length > 0) {
      if (!chartInstance.current) {
        chartInstance.current = new Chart(chartContainer.current.getContext("2d"), {
          type: "line",
          data: chartData,
          options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  parser: "MM/DD/YYYY",
                  tooltipFormat: "ll",
                },
              },
            },
            plugins: {
              title: {
                display: true,
              },
            },
          },
        });
      } else {
        chartInstance.current.data.labels = chartData.labels;
        chartInstance.current.data.datasets.forEach((dataset, index) => {
          dataset.data = chartData.datasets[index].data;
        });
        chartInstance.current.update();
      }
    }
  }, [chartData, themeLocal]);

  return (
    <div>
      <div>
        <canvas id='SesionLine' ref={chartContainer} style={{ marginBottom: "10px", width: "100%", height: `${height}`, margin: "auto", padding: 10 }} />
      </div>
    </div>
  );
};
