const WidthConfig = ({
  importedDate,
  fileName,
  firstTransactionDate,
  lastTransactionDate,
  importedBy,
  remove,
}) => [
  {
    'min-width': '768px',
    config: [
      { columnName: importedDate.columnName, styles: { width: 'flex-1' } },
      { columnName: fileName.columnName, styles: { width: 'flex-1' } },
      { columnName: firstTransactionDate.columnName, styles: { width: 'flex-1' } },
      { columnName: lastTransactionDate.columnName, styles: { width: 'flex-1' } },
      { columnName: importedBy.columnName, styles: { width: 'flex-1' } },
      { columnName: remove.columnName, styles: { width: '7.5rem' } },
    ],
  },
  {
    'min-width': '1024px',
    config: [
      { columnName: importedDate.columnName, styles: { width: '14.2rem' } },
      { columnName: fileName.columnName, styles: { width: 'flex-1' } },
      { columnName: firstTransactionDate.columnName, styles: { width: '18.8rem' } },
      { columnName: lastTransactionDate.columnName, styles: { width: '18.8rem' } },
      { columnName: importedBy.columnName, styles: { width: '20.8rem' } },
      { columnName: remove.columnName, styles: { width: '7.5rem' } },
    ],
  },
];

export default WidthConfig;
