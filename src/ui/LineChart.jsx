import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChart({ tasksData }) {
  const chartRef = useRef(null);

  Chart.defaults.color = "rgb(148 163 184)";

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(58,111,240,0.70)");
    gradient.addColorStop(1, "rgba(58,111,240,0)");

    let delayed;

    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const taskLabels = tasksData.map((task) => task.day);
    const taskData = tasksData.map((task) => task.percentage);

    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "This week's progress",
            data: taskData,
            backgroundColor: gradient,
            borderColor: "rgba(58,111,240,1)",
            borderWidth: 1,
            fill: true,
            tension: 0.2,
            pointBackgroundColor: "rgba(255,187,51,0.5)",
          },
        ],
      },
      options: {
        responsive: true,
        radius: 2,
        hitRadius: 40,
        hoverRadius: 5,
        animation: {
          onComplete: function () {
            delayed = true;
          },
          delay: function (context) {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delay
            ) {
              delay = context.dataIndex * 100 + context.datasetIndex * 100;
            }
            return delay;
          },
        },

        scales: {
          y: {
            beginAtZero: true,
            max: 100, // Assuming percentage values
          },
        },
      },
    });
  }, [tasksData]);

  const canvasStyle = {
    width: "840px",
    height: "430px",
  };

  return <canvas ref={chartRef} style={canvasStyle} />;
}

export default LineChart;
