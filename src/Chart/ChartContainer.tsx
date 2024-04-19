import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { ChartDataPoint } from "../utils/types";
export interface ChartContainerProps {
  chartData: ChartDataPoint[];
  type: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ chartData, type }) => {
  console.log(chartData);

  return (
    <div>
      <BarChart chartData={chartData} type={type} />
    </div>
  );
};

export default ChartContainer;
