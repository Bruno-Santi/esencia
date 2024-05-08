import { useMemo, useState } from "react";
import { formatDate } from "../helpers";
import { LineChart } from "@tremor/react";

export const LineChartReport = ({ data, height = "8em" }) => {
  const themeLocal = localStorage.getItem("theme");
  const [theme, setTheme] = useState(themeLocal);
  console.log(data);

  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return null;
    }

    const formattedData = Object.entries(data).map(([date, values]) => ({
      date: formatDate(date),
      "Satisfacción personal diaria": parseFloat(values[0]) * 100,
      "Colaboración en equipo diaria": parseFloat(values[1]) * 100,
      "Compromiso laboral diario": parseFloat(values[2]) * 100,
      "Bienestar en el espacio de trabajo": parseFloat(values[3]) * 100,
      "Satisfacción general diaria": ((parseFloat(values[0]) + parseFloat(values[1]) + parseFloat(values[2]) + parseFloat(values[3])) * 100) / 4,
    }));

    return formattedData;
  }, [data]);

  const dataFormatter = (number) => `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <div>
      <div className='h-80 p-4 antialiased ' style={{ marginBottom: "10px", width: "100%", height: `${height}`, margin: "auto", padding: 10 }}>
        <LineChart
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
          onValueChange={(v) => console.log(v)}
        />
      </div>
    </div>
  );
};
