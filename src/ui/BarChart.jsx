import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function BarChart({ tasksDataChart }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to store the Chart instance

  console.log(tasksDataChart);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (tasksDataChart.length === 0) {
      // Handle empty data, for example, display a message
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = "16px Arial";
      ctx.fillText("No data available", 10, 50);
      return;
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const taskData = tasksDataChart.map((task) => task.percentage);
    const dateData = tasksDataChart.map((task) => task.date);
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const dataPoints = Array(labels.length).fill(0);

    dateData.forEach((date, index) => {
      if (date === "Mon") {
        dataPoints[0] = taskData[index];
      } else if (date === "Tue") {
        dataPoints[1] = taskData[index];
      } else if (date === "Wed") {
        dataPoints[2] = taskData[index];
      } else if (date === "Thu") {
        dataPoints[3] = taskData[index];
      } else if (date === "Fri") {
        dataPoints[4] = taskData[index];
      } else if (date === "Sat") {
        dataPoints[5] = taskData[index];
      } else if (date === "Sun") {
        dataPoints[6] = taskData[index];
      }
    });

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "This week's progress",
            data: dataPoints,
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

  return <canvas ref={chartRef} />;
}

export default BarChart;
