export const getResponsiveConfig = tableConfig => ([
  {
    'min-width': '768px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '6.6rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '6.6rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '12.6rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '12.6rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '12.6rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '13.1rem' } },
    ],
  },
  {
    'min-width': '820px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '8rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '7rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '13.5rem' } },
    ],
  },
  {
    'min-width': '900px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '9rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '7.5rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '13.5rem' } },
    ],
  },
  {
    'min-width': '1000px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '12rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '8rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '14rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '14rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '14rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '15.1rem' } },
    ],
  },
  {
    'min-width': '1200px',
    config: [
      { columnName: tableConfig.number.columnName, styles: { width: '16rem' } },
      { columnName: tableConfig.isActive.columnName, styles: { width: '9rem' } },
      { columnName: tableConfig.income.columnName, styles: { width: '16rem' } },
      { columnName: tableConfig.cost.columnName, styles: { width: '16rem' } },
      { columnName: tableConfig.expenses.columnName, styles: { width: '16rem' } },
      { columnName: tableConfig.netProfit.columnName, styles: { width: '16rem' } },
    ],
  },
]);

export default getResponsiveConfig;
