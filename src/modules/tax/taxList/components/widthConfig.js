const widthConfig = ({
  taxCode,
  description,
  type,
  collectedAccountName,
  paidAccountName,
  rate,
}) => [
  {
    'min-width': '768px',
    config: [
      { columnName: taxCode.columnName, styles: { width: '9rem' } },
      { columnName: description.columnName, styles: { width: '15rem' } },
      { columnName: type.columnName, styles: { width: '12rem' } },
      {
        columnName: collectedAccountName.columnName,
        styles: { width: 'flex-1' },
      },
      { columnName: paidAccountName.columnName, styles: { width: 'flex-1' } },
      { columnName: rate.columnName, styles: { width: '9rem' } },
    ],
  },
  {
    'min-width': '992px',
    config: [
      { columnName: taxCode.columnName, styles: { width: '10rem' } },
      { columnName: description.columnName, styles: { width: '20rem' } },
      { columnName: type.columnName, styles: { width: '20rem' } },
    ],
  },
];

export default widthConfig;
