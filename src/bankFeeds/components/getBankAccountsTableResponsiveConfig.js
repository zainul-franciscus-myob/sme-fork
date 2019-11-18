const getBankAccountsTableResponsiveConfig = tableConfig => ([
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
      { columnName: tableConfig.accountNumber.columnName, styles: { width: '19.0rem' } },
      { columnName: tableConfig.linkedAccount.columnName, styles: { width: '29.0rem' } },
    ],
  },
]);

export default getBankAccountsTableResponsiveConfig;
