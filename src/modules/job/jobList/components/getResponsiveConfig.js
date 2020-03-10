export const getResponsiveConfig = tableConfig => ([
  {
    'min-width': '768px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '9rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '8.1rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '12rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '12rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '12rem' } },
    ],
  },
  {
    'min-width': '820px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '9rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '8.4rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '14rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '13rem' } },
    ],
  },
  {
    'min-width': '900px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '11rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '10rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '14rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '15rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '14rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '14rem' } },
    ],
  },
  {
    'min-width': '1000px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '10rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '15rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '16rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '15rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '15rem' } },
    ],
  },
  {
    'min-width': '1200px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '16rem' } },
    ],
  },
]);

export default getResponsiveConfig;
