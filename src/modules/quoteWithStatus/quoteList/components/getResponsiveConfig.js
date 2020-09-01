export const getResponsiveConfig = (tableConfig) => [
  {
    'max-width': '1050px',
    config: [
      {
        columnName: tableConfig.displayDate.columnName,
        styles: { width: '11rem' },
      },
      {
        columnName: tableConfig.referenceId.columnName,
        styles: { width: '12rem' },
      },
      {
        columnName: tableConfig.displayExpiryDate.columnName,
        styles: { width: '11rem' },
      },
    ],
  },
  {
    'min-width': '1050px',
    config: [
      {
        columnName: tableConfig.displayDate.columnName,
        styles: { width: '12rem' },
      },
      {
        columnName: tableConfig.referenceId.columnName,
        styles: { width: '14rem' },
      },
      {
        columnName: tableConfig.displayExpiryDate.columnName,
        styles: { width: '12rem' },
      },
    ],
  },
];

export default getResponsiveConfig;
