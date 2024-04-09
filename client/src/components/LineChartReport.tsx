import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { format } from "date-fns";

export const LineChartReport = ({ data, height = "8em" }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer.current && data && data.length > 0) {
      const formattedData = {
        labels: data.map((entry) => {
          const date = new Date(entry.date.$date);
          date.setDate(date.getDate() + 1);
          return format(date, "yyyy-MM-dd");
        }),
        datasets: [
          {
            label: "Satisfacción General Diaria",
            data: data.map((entry) => Math.round(entry.daily_general_satisfaction * 100)),
            borderColor: "rgba(255, 99, 132, 0.5)",
            borderDash: [10, 6],
            borderWidth: 5,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: "Satisfacción Personal Diaria",
            data: data.map((entry) => Math.round(entry.daily_self_satisfaction * 100)),
            borderColor: "rgba(54, 162, 235, 0.5)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
          {
            label: "Colaboración en Equipo Diaria",
            data: data.map((entry) => Math.round(entry.daily_team_collaboration * 100)),
            borderColor: "rgba(255, 206, 86, 0.5)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
          },
          {
            label: "Compromiso Laboral Diario",
            data: data.map((entry) => Math.round(entry.daily_work_engagement * 100)),
            borderColor: "rgba(75, 192, 192, 0.5)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "Bienestar en el Espacio de Trabajo Diario",
            data: data.map((entry) => Math.round(entry.daily_workspace_wellbeing * 100)),
            borderColor: "rgba(153, 102, 255, 0.5)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
          },
        ],
      };

      if (!chartInstance.current) {
        chartInstance.current = new Chart(chartContainer.current.getContext("2d"), {
          type: "line",
          data: formattedData,
          options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  displayFormats: {
                    day: "YYYY-MM-DD",
                  },
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Gráfico de líneas",
              },
            },
          },
        });
      } else {
        chartInstance.current.data.labels = formattedData.labels;
        chartInstance.current.data.datasets.forEach((dataset, index) => {
          dataset.label = formattedData.datasets[index].label;
          dataset.data = formattedData.datasets[index].data;
        });
        chartInstance.current.update();
      }
    }
  }, [data]);

  return (
    <div>
      <canvas id='SesionLine' ref={chartContainer} style={{ marginBottom: "10px", width: "100%", height: `${height}`, margin: "auto", padding: 10 }} />
    </div>
  );
};
