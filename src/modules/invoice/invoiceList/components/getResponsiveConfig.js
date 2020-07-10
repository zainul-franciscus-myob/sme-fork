export const getResponsiveConfig = (tableConfig) => [
  {
    'max-width': '750px',
    config: [
      {
        columnName: tableConfig.dateIssued.columnName,
        styles: { width: '8rem' },
      },
      { columnName: tableConfig.number.columnName, styles: { width: '8rem' } },
      {
        columnName: tableConfig.customer.columnName,
        styles: { width: 'flex-1' },
      },
      {
        columnName: tableConfig.purchaseOrder.columnName,
        styles: { width: '8rem' },
      },
      {
        columnName: tableConfig.invoiceAmount.columnName,
        styles: { width: '8rem' },
      },
      {
        columnName: tableConfig.invoiceDue.columnName,
        styles: { width: '12rem' },
      },
      {
        columnName: tableConfig.dateDue.columnName,
        styles: { width: '12rem' },
      },
      {
        columnName: tableConfig.status.columnName,
        styles: { width: '9.5rem' },
      },
    ],
  },
  {
    'min-width': '1024px',
    config: [
      {
        columnName: tableConfig.dateIssued.columnName,
        styles: { width: '11.5rem' },
      },
      { columnName: tableConfig.number.columnName, styles: { width: '11rem' } },
      {
        columnName: tableConfig.customer.columnName,
        styles: { width: 'flex-1' },
      },
      {
        columnName: tableConfig.purchaseOrder.columnName,
        styles: { width: '15.2rem' },
      },
      {
        columnName: tableConfig.invoiceAmount.columnName,
        styles: { width: '12.4rem' },
      },
      {
        columnName: tableConfig.invoiceDue.columnName,
        styles: { width: '15.2rem' },
      },
      {
        columnName: tableConfig.dateDue.columnName,
        styles: { width: '11rem' },
      },
      {
        columnName: tableConfig.status.columnName,
        styles: { width: '9.5rem' },
      },
    ],
  },
];

export default getResponsiveConfig;
