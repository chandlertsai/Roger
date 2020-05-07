import React, { useEffect, useRef, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import Chart from "chart.js";
import R from "ramda";
const defaultData = {
  datasets: [
    {
      data: [1],
      backgroundColor: ["red", "orange", "green"],
      label: "Dataset 1",
    },
  ],
  labels: ["alarm", "Orange", "Yellow"],
};
const DoughnutChart = ({ data = [1, 2, 3] }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig = {
    type: "doughnut",
    data: R.mergeDeepLeft(data, defaultData),
    options: {
      responsive: true,
      legend: {
        position: "top",
      },

      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  // update when data changed.
  useDeepCompareEffect(() => {
    if (!chartInstance) return;
    chartInstance.data = data;
    chartInstance.update();
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer} width="100" height="100" />
    </div>
  );
};

export default DoughnutChart;

// usage

// const onButtonClick = () => {
//   const data = [1, 2, 3, 4, 5, 6];
//   updateDataset(0, data);
// };
