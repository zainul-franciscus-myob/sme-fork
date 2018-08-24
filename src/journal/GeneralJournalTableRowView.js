import React from 'react';
import {Table} from '@myob/myob-widgets';

function GeneralJournalTableRowView(entries, tableConfig) {
  return entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.date} >{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId} >{entry.referenceId}</Table.RowItem>
      <Table.RowItem {...tableConfig.description} >{entry.description}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayAmount} >{entry.displayAmount}</Table.RowItem>
    </Table.Row>
  ));
}

export default GeneralJournalTableRowView;
