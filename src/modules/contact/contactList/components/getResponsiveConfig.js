export const getResponsiveConfig = (tableConfig) => [
  {
    'min-width': '768px',
    config: [
      {
        columnName: tableConfig.isActive.columnName,
        styles: { width: '8.1rem' },
      },
      {
        columnName: tableConfig.referenceId.columnName,
        styles: { width: '9rem' },
      },
      { columnName: tableConfig.type.columnName, styles: { width: '6.5rem' } },
      {
        columnName: tableConfig.phoneNumber.columnName,
        styles: { width: '8.2rem' },
      },
      { columnName: tableConfig.email.columnName, styles: { width: '8rem' } },
      {
        columnName: tableConfig.outstandingBalance.columnName,
        styles: { width: '8.2rem' },
      },
      {
        columnName: tableConfig.overdue.columnName,
        styles: { width: '8.6rem' },
      },
    ],
  },
  {
    'min-width': '820px',
    config: [
      {
        columnName: tableConfig.isActive.columnName,
        styles: { width: '8.4rem' },
      },
      {
        columnName: tableConfig.referenceId.columnName,
        styles: { width: '9rem' },
      },
      { columnName: tableConfig.type.columnName, styles: { width: '7.5rem' } },
      {
        columnName: tableConfig.phoneNumber.columnName,
        styles: { width: '8.2rem' },
      },
      { columnName: tableConfig.email.columnName, styles: { width: '9rem' } },
      {
        columnName: tableConfig.outstandingBalance.columnName,
        styles: { width: '9rem' },
      },
      {
        columnName: tableConfig.overdue.columnName,
        styles: { width: '9.2rem', display: 'none' },
      },
    ],
  },
  {
    'min-width': '900px',
    config: [
      {
        columnName: tableConfig.isActive.columnName,
        styles: { width: '10rem' },
      },
      {
        columnName: tableConfig.referenceId.columnName,
        styles: { width: '10rem' },
      },
      { columnName: tableConfig.type.columnName, styles: { width: '7.5rem' } },
      {
        columnName: tableConfig.phoneNumber.columnName,
        styles: { width: '10rem' },
      },
      { columnName: tableConfig.email.columnName, styles: { width: '13rem' } },
      {
        columnName: tableConfig.outstandingBalance.columnName,
        styles: { width: '11rem' },
      },
      {
        columnName: tableConfig.overdue.columnName,
        styles: { width: '11rem' },
      },
    ],
  },
  {
    'min-width': '1000px',
    config: [
      {
        columnName: tableConfig.isActive.columnName,
        styles: { width: '10rem' },
      },
      {
        columnName: tableConfig.referenceId.columnName,
        styles: { width: '11rem' },
      },
      { columnName: tableConfig.type.columnName, styles: { width: '9rem' } },
      {
        columnName: tableConfig.phoneNumber.columnName,
        styles: { width: '13rem' },
      },
      {
        columnName: tableConfig.email.columnName,
        styles: { width: '15rem' },
      },
      {
        columnName: tableConfig.outstandingBalance.columnName,
        styles: { width: '14.7rem' },
      },
      {
        columnName: tableConfig.overdue.columnName,
        styles: { width: '13rem' },
      },
    ],
  },
  {
    'min-width': '1200px',
    config: [
      { columnName: tableConfig.email.columnName, styles: { width: '24rem' } },
      {
        columnName: tableConfig.phoneNumber.columnName,
        styles: { width: '14rem' },
      },
      {
        columnName: tableConfig.referenceId.columnName,
        styles: { width: '12rem' },
      },
    ],
  },
];

export default getResponsiveConfig;
