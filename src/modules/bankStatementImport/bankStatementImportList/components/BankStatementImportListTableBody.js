import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEntries, getIsSubmitting } from '../BankStatementImportListSelectors';

const BankStatementImportListTableBody = ({
  entries,
  isSubmitting,
  tableConfig,
  onDeleteButtonClick,
}) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.importedDate}>
        {entry.importedDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.fileName}>
        {entry.fileName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.firstTransactionDate}>
        {entry.firstTransactionDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.lastTransactionDate}>
        {entry.lastTransactionDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.importedBy}>
        {entry.importedBy}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.remove} cellRole="actions">
        <Button
          type="clear"
          icon={<Icons.Remove />}
          aria-label="Delete imported statement"
          size="xs"
          onClick={() => onDeleteButtonClick(entry.id)}
          disabled={isSubmitting}
        />
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getEntries(state),
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(BankStatementImportListTableBody);
