const widthConfig = ({
  dateIssued,
  number,
  supplier,
  invoiceNumber,
  purchaseOrderAmount,
  promisedDate,
}) => [
  {
    'min-width': '1160px',
    config: [
      { columnName: dateIssued.columnName, styles: { width: '14rem' } },
      { columnName: number.columnName, styles: { width: '14rem' } },
      { columnName: supplier.columnName, styles: { width: 'flex-1' } },
      { columnName: invoiceNumber.columnName, styles: { width: '17rem' } },
      {
        columnName: purchaseOrderAmount.columnName,
        styles: { width: '12rem' },
      },
      { columnName: promisedDate.columnName, styles: { width: 'flex-1' } },
    ],
  },
];

export default widthConfig;
