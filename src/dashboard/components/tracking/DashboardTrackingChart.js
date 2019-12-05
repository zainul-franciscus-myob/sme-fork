import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import {
  flxPaletteBerry,
  flxPaletteDusk100,
  flxPaletteDusk70,
  flxPaletteThunder,
  flxPaletteWhite,
} from '@myob/myob-styles/dist/design-tokens/js/design-tokens';
import React from 'react';

import { getChart } from '../../selectors/DashboardTrackingSelectors';

const incomeLineColor = flxPaletteDusk100;
const expenseLineColor = flxPaletteDusk70;
const profitLineColor = flxPaletteBerry;

const getDataSetOptions = color => ({
  fill: false,
  borderWidth: 3,
  lineTension: 0,
  spanGaps: true,
  borderCapStyle: 'round',
  borderJoinStyle: 'round',
  borderColor: color,
  pointRadius: 5,
  pointBackgroundColor: color,
  pointHoverRadius: 10,
  pointHoverBorderColor: color,
  pointHoverBackgroundColor: color,
});

const getData = ({
  incomeData, expenseData, profitData, labels,
}) => ({
  labels,
  datasets: [
    {
      ...getDataSetOptions(incomeLineColor),
      label: 'Income',
      data: incomeData,
      xAxisID: 'line-x-axis-1',
    },
    {
      ...getDataSetOptions(expenseLineColor),
      label: 'Expense',
      data: expenseData,
      xAxisID: 'line-x-axis-1',
    },
    {
      ...getDataSetOptions(profitLineColor),
      label: 'Net profit',
      data: profitData,
      borderWidth: 2,
      borderDash: [5, 5],
      xAxisID: 'line-x-axis-1',
    },
  ],
});

const getOptions = data => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        id: 'line-x-axis-1',
        display: true,
        gridLines: {
          display: true,
          color: flxPaletteWhite,
          lineWidth: 0,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        id: 'line-y-axis-1',
        display: true,
        gridLines: {
          display: true,
          color: flxPaletteWhite,
          zeroLineColor: flxPaletteWhite,
          drawBorder: false,
        },
        ticks: {
          padding: 8,
          maxTicksLimit: 6,
          callback: (value) => {
            const kValue = value / 1000;

            return `${kValue}k`;
          },
        },
      },
    ],
  },
  title: {
    display: false,
  },
  legend: {
    display: false,
  },
  tooltips: {
    displayColors: false,
    backgroundColor: flxPaletteWhite,
    borderColor: flxPaletteDusk100,
    borderWidth: 2,
    titleFontStyle: 'normal',
    titleFontColor: flxPaletteThunder,
    bodyFontStyle: 'normal',
    bodyFontColor: flxPaletteThunder,
    callbacks: {
      title: (tooltipItems) => {
        const [tooltipItem] = tooltipItems;
        const { datasetIndex, index } = tooltipItem;

        const dataset = data.datasets[datasetIndex];
        const { label } = dataset;

        const datum = dataset.data[index];
        const { name } = datum;


        return `${label}: ${name}`;
      },
      label: (tooltipItem) => {
        const { datasetIndex, index } = tooltipItem;

        const datum = data.datasets[datasetIndex].data[index];
        const { description } = datum;

        return `Amount: ${description}`;
      },
    },
  },
});

const DashboardTrackingChart = ({
  data: {
    incomeData,
    expenseData,
    profitData,
    labels,
  },
}) => {
  const data = getData({
    incomeData, expenseData, profitData, labels,
  });
  const options = getOptions(data);

  return (
    <Line data={data} options={options} />
  );
};

const mapStateToProps = state => ({
  data: getChart(state),
});

export default connect(mapStateToProps)(DashboardTrackingChart);
