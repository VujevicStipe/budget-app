import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ pieData }) {
  return (
    <>
      <Pie data={pieData} />
    </>
  );
}

export default PieChart;
