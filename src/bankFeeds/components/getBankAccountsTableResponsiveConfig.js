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
      { columnName: tableConfig.financialInstitution.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.accountName.columnName, styles: { width: '18.0rem' } },
      { columnName: tableConfig.BSB.columnName, styles: { width: '10.0rem' } },
      { columnName: tableConfig.accountNumber.columnName, styles: { width: '14.0rem' } },
      { columnName: tableConfig.linkedAccount.columnName, styles: { width: '31.4rem' } },
      { columnName: tableConfig.status.columnName, styles: { width: '12.0rem' } },
    ],
  },
]);

export default getBankAccountsTableResponsiveConfig;
