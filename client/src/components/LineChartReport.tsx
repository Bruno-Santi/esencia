import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const LineChartReport = ({ data, height = "8em" }) => {
  console.log(data);

  const transformLineGraphData = (lineGraphsData) => {
    const labels = Object.keys(lineGraphsData);
    const values = lineGraphsData[labels[0]].map((value) => parseFloat(value) * 100);

    const datasets = [
      {
        label: "Satisfacción General Diaria",
        data: [values[0]],
        borderColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Colaboración en Equipo Diaria",
        data: [values[1]],
        borderColor: "rgba(255, 206, 86, 0.5)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "Compromiso Laboral Diario",
        data: [values[2]],
        borderColor: "rgba(75, 192, 192, 0.5)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Bienestar en el Espacio de Trabajo Diario",
        data: [values[3]],
        borderColor: "rgba(153, 102, 255, 0.5)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ];

    return {
      labels: labels,
      datasets: datasets,
    };
  };

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer.current && data && Object.keys(data).length > 0) {
      const formattedData = transformLineGraphData(data);

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
        chartInstance.current.data.datasets = formattedData.datasets;
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
