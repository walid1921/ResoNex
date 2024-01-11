import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function BarChart({ tasksDataChart }) {
  const chartRef = useRef(null);

  console.log(tasksDataChart);


  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const taskLabels = tasksDataChart.map((task) => task.day);
    const taskData = tasksDataChart.map((task) => task.percentage);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: taskLabels,
        datasets: [
          {
            label: "This week's progress",
            data: taskData,
            backgroundColor: "rgba(58,111,240,0.20)",
            borderColor: "rgba(58,111,240,1)",
            borderWidth: 1,
            fill: true,
            tension: 0.2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100, // Assuming percentage values
          },
        },
      },
    });
  }, [tasksDataChart]);

  const canvasStyle = {
    width: "840px",
    height: "430px",
  };

  return <canvas ref={chartRef} style={canvasStyle} />;
}

export default BarChart;
