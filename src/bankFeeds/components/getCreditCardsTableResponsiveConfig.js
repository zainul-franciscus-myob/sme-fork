const getCreditCardsTableResponsiveConfig = tableConfig => ([
  {
    'min-width': '768px',
    config: [
      { columnName: tableConfig.linkedAccount.columnName, styles: { width: '15.0rem' } },
    ],
  },
  {
    'min-width': '1000px',
    config: [
      { columnName: tableConfig.financialInstitution.columnName, styles: { width: '21.0rem' } },
      { columnName: tableConfig.linkedAccount.columnName, styles: { width: '29.0rem' } },
      { columnName: tableConfig.status.columnName, styles: { width: '10.0rem' } },
    ],
  },
]);

export default getCreditCardsTableResponsiveConfig;
