import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChart({ tasksDataChart }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to store the Chart instance

  console.log(tasksDataChart);

  Chart.defaults.color = "rgb(148 163 184)";

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(58,111,240,0.70)");
    gradient.addColorStop(1, "rgba(58,111,240,0)");

    let delayed;

    // Destroy the existing Chart instance
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


    console.log(taskData);

    // Create a new Chart instance
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "This week progress",
            data: dataPoints,
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
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },

        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  }, [tasksDataChart]);

  return <canvas ref={chartRef} />;
}

export default LineChart;
