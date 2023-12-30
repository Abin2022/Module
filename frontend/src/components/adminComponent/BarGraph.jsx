import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarGraph = ({ graphData }) => {
  const options = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: "Courses with their purchases",
      },
    },
  };
  const data = {
    labels: graphData.courseNames,
    datasets: [
      {
        label: "courses",

        backgroundColor: "#616068",
        borderColor: "#0F0E25",
        borderWidth: 1,
        hoverBackgroundColor: "red",
        hoverBorderColor: "#2E2993",
        data: graphData.purchaseCount,
      },
    ],

  };
  console.log(data);
  return (

    <div className="flex  justify-center items-center mt-7 h-[25rem] w-[80rem]">
      <Bar options={options} data={data} />
     
    </div>
  );
};

export default BarGraph;
