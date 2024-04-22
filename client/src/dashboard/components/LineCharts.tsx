import { LineChart } from "@tremor/react";
import { useEffect, useMemo, useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { formatDate } from "../../helpers";

export function LineCharts({ height = "8em" }) {
  const themeLocal = localStorage.getItem("theme");
  const [theme, setTheme] = useState(themeLocal);
  const { linesMetrics } = useDashboard();
  console.log(linesMetrics);

  useEffect(() => {
    setTheme(themeLocal);
  }, [themeLocal]);

  const chartData = useMemo(() => {
    if (!linesMetrics || linesMetrics.length === 0) {
      return null;
    }

    const formattedData = linesMetrics.map((metric) => ({
      date: formatDate(metric.date),
      "Satisfacción personal diaria": metric.daily_self_satisfaction * 100,
      "Colaboración en equipo diaria": metric.daily_team_collaboration * 100,
      "Compromiso laboral diario": metric.daily_work_engagement * 100,
      "Bienestar en el espacio de trabajo": metric.daily_workspace_wellbeing * 100,
      "Satisfacción general diaria": Math.round(metric.daily_general_satisfaction * 100),
    }));

    return formattedData;
  }, [linesMetrics]);

  const dataFormatter = (number) => `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <LineChart
      className='h-80 p-2 antialiased '
      data={chartData}
      index='date'
      categories={[
        "Satisfacción personal diaria",
        "Colaboración en equipo diaria",
        "Compromiso laboral diario",
        "Bienestar en el espacio de trabajo",
        "Satisfacción general diaria",
      ]}
      connectNulls={true}
      valueFormatter={dataFormatter}
      colors={["red-400", "orange-400", "blue-400", "rose-300", "rose-400"]}
      yAxisWidth={50}
    />
  );
}
