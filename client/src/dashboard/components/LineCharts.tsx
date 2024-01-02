import React, { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import "chartjs-adapter-moment";
import { useDashboard } from "../../hooks/useDashboard";

const formatDate = (dateString) => moment(dateString).format("MM/DD/YYYY");

export const LineCharts = () => {
  const { linesMetrics } = useDashboard();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const chartData = useMemo(() => {
    if (!linesMetrics || linesMetrics.label_x.length === 0) {
      return null; // O cualquier valor predeterminado que desees cuando no haya datos
    }

    return {
      labels: linesMetrics.label_x.map(formatDate),
      datasets: [
        {
          label: "Self Satisfaction",
          data: linesMetrics.self_satisfaction || Array(linesMetrics.label_x.length).fill(0),
          borderColor: "rgba(255, 99, 132, 0.5)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Team Collaboration",
          data: linesMetrics.team_collaboration || Array(linesMetrics.label_x.length).fill(0),
          borderColor: "rgba(54, 162, 235, 0.5)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          label: "Work Engagement",
          data: linesMetrics.work_engagement || Array(linesMetrics.label_x.length).fill(0),
          borderColor: "rgba(255, 206, 86, 0.5)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
        },
        {
          label: "Workspace",
          data: linesMetrics.workspace || Array(linesMetrics.label_x.length).fill(0),
          borderColor: "rgba(75, 192, 192, 0.5)",
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
  }, [chartData]);

  return (
    <div>
      <div>
        <canvas ref={chartContainer} style={{ marginBottom: "10px", width: "90%", height: "6.5em", margin: "auto" }} />
      </div>
    </div>
  );
};
