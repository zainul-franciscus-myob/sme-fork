const getSupplierReturnPurchaseTableResponsiveConfig = tableConfig => ([
  {
    'min-width': '900px',
    config: [
      { columnName: tableConfig.amount.columnName, styles: { width: '14.8rem' } },
      { columnName: tableConfig.discount.columnName, styles: { width: '14.8rem' } },
      { columnName: tableConfig.owed.columnName, styles: { width: '16.8rem' } },
      { columnName: tableConfig.amountApplied.columnName, styles: { width: '14.8rem' } },
    ],
  },
  {
    'min-width': '1100px',
    config: [
      { columnName: tableConfig.date.columnName, styles: { width: '11.0rem' } },
      { columnName: tableConfig.status.columnName, styles: { width: '11.0rem' } },
      { columnName: tableConfig.amount.columnName, styles: { width: '16.8rem' } },
      { columnName: tableConfig.discount.columnName, styles: { width: '16.8rem' } },
      { columnName: tableConfig.owed.columnName, styles: { width: '18.8rem' } },
      { columnName: tableConfig.amountApplied.columnName, styles: { width: '16.8rem' } },
    ],
  },
]);

export default getSupplierReturnPurchaseTableResponsiveConfig;
