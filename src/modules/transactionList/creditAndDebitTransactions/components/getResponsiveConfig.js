export const getResponsiveConfig = tableConfig => ([
  {
    'min-width': '768px',
    config: [
      { columnName: tableConfig.date.columnName, styles: { width: '11rem' } },
      { columnName: tableConfig.referenceId.columnName, styles: { width: '11rem' } },
      { columnName: tableConfig.description.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.displayAccountName.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.sourceJournal.columnName, styles: { width: '12.4rem' } },
      { columnName: tableConfig.displayDebit.columnName, styles: { width: '12.4rem' } },
      { columnName: tableConfig.displayCredit.columnName, styles: { width: '12.4rem' } },
    ],
  },
  {
    'min-width': '1024px',
    config: [
      { columnName: tableConfig.date.columnName, styles: { width: '11rem' } },
      { columnName: tableConfig.referenceId.columnName, styles: { width: '13rem' } },
      { columnName: tableConfig.description.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.displayAccountName.columnName, styles: { width: 'flex-1' } },
      { columnName: tableConfig.sourceJournal.columnName, styles: { width: '14.4rem' } },
      { columnName: tableConfig.displayDebit.columnName, styles: { width: '12.4rem' } },
      { columnName: tableConfig.displayCredit.columnName, styles: { width: '12.4rem' } },
    ],
  },
]);

export default getResponsiveConfig;
