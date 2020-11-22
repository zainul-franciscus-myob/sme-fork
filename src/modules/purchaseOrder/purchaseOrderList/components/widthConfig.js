const widthConfig = ({
  dateIssued,
  number,
  supplier,
  invoiceNumber,
  purchaseOrderAmount,
  promisedDate,
}) => [
  {
    'min-width': '768px',
    config: [
      { columnName: dateIssued.columnName, styles: { width: '18rem' } },
      { columnName: number.columnName, styles: { width: '18rem' } },
      { columnName: supplier.columnName, styles: { width: 'flex-1' } },
      { columnName: invoiceNumber.columnName, styles: { width: '24rem' } },
      {
        columnName: purchaseOrderAmount.columnName,
        styles: { width: '13rem' },
      },
      { columnName: promisedDate.columnName, styles: { width: '12rem' } },
    ],
  },
];

export default widthConfig;
