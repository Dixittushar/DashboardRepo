import React, { useEffect, useRef } from "react";
import * as Highcharts from "highcharts";
import { ChartDataPoint } from "../utils/types";

interface BarChartProps {
  chartData: ChartDataPoint[];
  type: string;
}

const BarChart: React.FC<BarChartProps> = ({ chartData, type }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartData || chartData.length === 0 || !chartRef.current) return;

    const chartOptions: Highcharts.Options = {
      chart: {
        renderTo: chartRef.current,
        type: "column",
      },
      title: {
        text: "Products in selected Category",
      },
      xAxis: {
        type: "category",
        categories: chartData.map((product) => product.name),
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
      yAxis: {
        min: 0,
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
        title: {
          text: type,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
      tooltip: {
        pointFormat: "<b>{series.name}: {point.y:.1f}</b>",
      },
      series: [
        {
          name: "Prices",
          type: "column",
          data: chartData.map((product) => product.price),
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: "#000000",
            align: "center",
            format: "{y:.1f}",
            y: 10,
          },
        } as Highcharts.SeriesColumnOptions,
      ],
    };

    Highcharts.chart(chartOptions);
  }, [chartData]);

  return <div ref={chartRef} />;
};

export default BarChart;
