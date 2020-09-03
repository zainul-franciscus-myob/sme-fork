export const withStatus = ({
  accountNumber,
  status,
  type,
  taxCode,
  linked,
  level,
  openingBalance,
  balance,
}) => [
  {
    'min-width': '768px',
    config: [
      { columnName: status.columnName, styles: { width: '9rem' } },
      { columnName: taxCode.columnName, styles: { width: '5.4rem' } },
      { columnName: linked.columnName, styles: { width: '7rem' } },
      { columnName: level.columnName, styles: { width: '6rem' } },
      { columnName: openingBalance.columnName, styles: { width: '16.2rem' } },
      { columnName: balance.columnName, styles: { width: '16.1rem' } },
    ],
  },
  {
    'min-width': '950px',
    config: [
      { columnName: accountNumber.columnName, styles: { width: '14rem' } },
      { columnName: type.columnName, styles: { width: '11.5rem' } },
      { columnName: level.columnName, styles: { width: '10rem' } },
      { columnName: taxCode.columnName, styles: { width: '8.5rem' } },
    ],
  },
  {
    'min-width': '1100px',
    config: [
      { columnName: type.columnName, styles: { width: '15.8rem' } },
      { columnName: taxCode.columnName, styles: { width: '10rem' } },
      { columnName: linked.columnName, styles: { width: '10rem' } },
      { columnName: openingBalance.columnName, styles: { width: '18rem' } },
      { columnName: balance.columnName, styles: { width: '18rem' } },
    ],
  },
];

export const withoutStatus = ({
  accountNumber,
  type,
  taxCode,
  linked,
  level,
  openingBalance,
  balance,
}) => [
  {
    'min-width': '768px',
    config: [
      { columnName: taxCode.columnName, styles: { width: '5.4rem' } },
      { columnName: linked.columnName, styles: { width: '7rem' } },
      { columnName: level.columnName, styles: { width: '6rem' } },
      { columnName: openingBalance.columnName, styles: { width: '16.2rem' } },
      { columnName: balance.columnName, styles: { width: '16.1rem' } },
    ],
  },
  {
    'min-width': '860px',
    config: [
      { columnName: accountNumber.columnName, styles: { width: '14rem' } },
      { columnName: type.columnName, styles: { width: '11.5rem' } },
      { columnName: level.columnName, styles: { width: '10rem' } },
      { columnName: taxCode.columnName, styles: { width: '8.5rem' } },
    ],
  },
  {
    'min-width': '1100px',
    config: [
      { columnName: type.columnName, styles: { width: '15.8rem' } },
      { columnName: taxCode.columnName, styles: { width: '10rem' } },
      { columnName: linked.columnName, styles: { width: '10rem' } },
      { columnName: openingBalance.columnName, styles: { width: '18rem' } },
      { columnName: balance.columnName, styles: { width: '18rem' } },
    ],
  },
];
