const widthConfig = ({
  dateIssued,
  number,
  supplier,
  invoiceNumber,
  billAmount,
  balanceDue,
  dateDue,
  attachment,
  status,
}) => [
  {
    'min-width': '1160px',
    config: [
      { columnName: dateIssued.columnName, styles: { width: '12rem' } },
      { columnName: number.columnName, styles: { width: '12rem' } },
      { columnName: supplier.columnName, styles: { width: 'flex-1' } },
      { columnName: invoiceNumber.columnName, styles: { width: '17rem' } },
      { columnName: billAmount.columnName, styles: { width: '12.4rem' } },
      { columnName: balanceDue.columnName, styles: { width: '14.8rem' } },
      { columnName: dateDue.columnName, styles: { width: '11rem' } },
      { columnName: attachment.columnName, styles: { width: '10.3rem' } },
      { columnName: status.columnName, styles: { width: '9.5rem' } },
    ],
  },
];

export default widthConfig;
