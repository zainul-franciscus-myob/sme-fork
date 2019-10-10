import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import {
  flxColorHeadingsDarker, flxPaletteAzure, flxPaletteStorm17, flxPaletteStorm28,
} from '@myob/myob-styles/dist/design-tokens/js/design-tokens';
import React from 'react';

import { getSalesChart } from '../../selectors/DashboardSalesSelectors';

const previousYearColumnColor = flxPaletteStorm17;
const previousYearColumnHoverColor = flxPaletteStorm28;
const currentYearColumnColor = '#5C94E6';
const currentYearColumnHoverColor = flxPaletteAzure;

const getData = ({ currentYearSales, previousYearSales, labels }) => ({
  labels,
  datasets: [
    {
      label: 'Last year',
      backgroundColor: previousYearColumnColor,
      hoverBackgroundColor: previousYearColumnHoverColor,
      data: previousYearSales,
      xAxisID: 'bar-x-axis-1',
    },
    {
      label: 'This year',
      data: currentYearSales,
      backgroundColor: currentYearColumnColor,
      hoverBackgroundColor: currentYearColumnHoverColor,
      xAxisID: 'bar-x-axis-1',
    },
  ],
});

const getOptions = data => ({
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
    text: 'Total sales',
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
    backgroundColor: flxPaletteAzure,
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

const DashboardSalesChart = ({
  currentYearSales,
  previousYearSales,
  labels,
}) => {
  const data = getData({ currentYearSales, previousYearSales, labels });
  const options = getOptions(data);

  return (
    <Bar data={data} options={options} />
  );
};

const mapStateToProps = state => getSalesChart(state);

export default connect(mapStateToProps)(DashboardSalesChart);
