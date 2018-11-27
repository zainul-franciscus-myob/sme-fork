import { Table } from '@myob/myob-widgets';
import React from 'react';

function GeneralJournalTableRowView(entries, tableConfig, businessId) {
  return entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.date}>{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId}>
        <a href={`/#/${businessId}/generalJournal/${entry.id}`}>{entry.referenceId}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>{entry.description}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayAmount}>{entry.displayAmount}</Table.RowItem>
    </Table.Row>
  ));
}

export default GeneralJournalTableRowView;
