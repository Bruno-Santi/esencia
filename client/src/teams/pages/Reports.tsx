import React from "react";
import { Charts } from "../../dashboard/components/Charts";
import { LineCharts } from "../../dashboard/components/LineCharts";

export const Reports = () => {
  return (
    <div className='ml-36'>
      <h1>Reports</h1>
      <Charts />
      <LineCharts />
    </div>
  );
};
