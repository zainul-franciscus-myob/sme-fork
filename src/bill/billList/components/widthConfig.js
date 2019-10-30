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
      { columnName: dateIssued.columnName, styles: { width: '11rem' } },
      { columnName: number.columnName, styles: { width: '11rem' } },
      { columnName: supplier.columnName, styles: { width: 'flex-1' } },
      { columnName: invoiceNumber.columnName, styles: { width: '11rem' } },
      { columnName: billAmount.columnName, styles: { width: '12.4rem' } },
      { columnName: balanceDue.columnName, styles: { width: '12.4rem' } },
      { columnName: dateDue.columnName, styles: { width: '11rem' } },
      { columnName: attachment.columnName, styles: { width: '9.4rem' } },
      { columnName: status.columnName, styles: { width: '9rem' } },
    ],
  },
];

export default widthConfig;
