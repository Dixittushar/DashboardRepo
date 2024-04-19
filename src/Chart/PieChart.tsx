import React, { useEffect, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import More from "highcharts/highcharts-more";

More(Highcharts);

interface CategoryData {
  name: string;
  y: number;
}

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      const formattedData = data.map((category: string) => ({
        name: category,
        y: category.length,
      }));
      setCategoryData(formattedData);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryData.length || !chartRef.current) return; // Check for chartRef.current

    const chartOptions: Highcharts.Options = {
      chart: {
        renderTo: chartRef.current,
        type: "pie",
        style: {
          fontSize: "18px",
        },
      },
      title: {
        text: "Product Category Distribution",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Categories",
          colorByPoint: true,
          data: categoryData,
          type: "pie",
        } as Highcharts.SeriesPieOptions,
      ],
    };

    Highcharts.chart(chartOptions);
  }, [categoryData]);

  return <div ref={chartRef} />;
};

export default PieChart;
