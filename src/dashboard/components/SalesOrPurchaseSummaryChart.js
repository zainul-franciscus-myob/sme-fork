import { Bar } from 'react-chartjs-2';
import {
  flxColorHeadingsDarker,
  flxPaletteDusk70,
  flxPaletteThunder,
} from '@myob/myob-styles/dist/design-tokens/js/design-tokens';
import React from 'react';

const previousYearColumnColor = '#88b1ed';
const currentYearColumnColor = flxPaletteDusk70;

const getData = ({ currentYearData, previousYearData, labels }) => ({
  labels,
  datasets: [
    {
      label: 'Last year',
      backgroundColor: previousYearColumnColor,
      data: previousYearData,
      xAxisID: 'bar-x-axis-1',
    },
    {
      label: 'This year',
      data: currentYearData,
      backgroundColor: currentYearColumnColor,
      xAxisID: 'bar-x-axis-1',
    },
  ],
});

const getOptions = (title, data) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        id: 'bar-x-axis-1',
        display: true,
        gridLines: {
          display: false,
          offsetGridLines: true,
        },
      },
    ],
    yAxes: [
      {
        id: 'bar-y-axis-1',
        display: false,
        gridbars: { display: false },
        gridLines: { display: false },
        stacked: false,
        ticks: { beginAtZero: true },
      },
    ],
  },
  title: {
    display: true,
    text: title,
    fontSize: 16,
    padding: 16,
    fontColor: flxColorHeadingsDarker,
  },
  legend: {
    position: 'bottom',
    align: 'start',
    labels: {
      usePointStyle: true,
      boxWidth: 5,
      padding: 15,
    },
  },
  tooltips: {
    displayColors: false,
    backgroundColor: flxPaletteThunder,
    titleFontStyle: 'normal',
    bodyFontStyle: 'bold',
    callbacks: {
      title: (tooltipItems) => {
        const [tooltipItem] = tooltipItems;
        const { datasetIndex, index } = tooltipItem;

        const datum = data.datasets[datasetIndex].data[index];
        const { name } = datum;

        return name;
      },
      label: (tooltipItem) => {
        const { datasetIndex, index } = tooltipItem;

        const datum = data.datasets[datasetIndex].data[index];
        const { description } = datum;

        return description;
      },
    },
  },
});

const SalesOrPurchaseSummaryChart = ({
  title,
  data: {
    currentYearData,
    previousYearData,
    labels,
  },
}) => {
  const data = getData({ currentYearData, previousYearData, labels });
  const options = getOptions(title, data);

  return (
    <Bar data={data} options={options} />
  );
};

export default SalesOrPurchaseSummaryChart;
