export const getResponsiveConfig = tableConfig => ([
  {
    'min-width': '768px',
    config: [
      { columnName: tableConfig.date.columnName, styles: { width: '11rem' } },
      { columnName: tableConfig.invoiceNumber.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.status.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.balanceDue.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.discountGiven.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.discountedBalance.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.amountReceived.columnName, styles: { width: 'flex-1' } },
    ],
  },
  {
    'min-width': '1100px',
    config: [
      { columnName: tableConfig.date.columnName, styles: { width: '11rem' } },
      { columnName: tableConfig.invoiceNumber.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.status.columnName, styles: { width: '11rem' } },
      { columnName: tableConfig.balanceDue.columnName, styles: { width: '16.8rem' } },
      { columnName: tableConfig.discountGiven.columnName, styles: { width: '16.8rem' } },
      { columnName: tableConfig.discountedBalance.columnName, styles: { width: '18.6rem' } },
      { columnName: tableConfig.amountReceived.columnName, styles: { width: '16.8rem' } },
    ],
  },
]);

export default getResponsiveConfig;
