import { Table } from '@myob/myob-widgets';
import React from 'react';

/* eslint-disable react/no-array-index-key */

function SpendMoneyTableRowView(entries, tableConfig, businessId) {
  return entries.map((entry, index) => (
    <Table.Row key={index}>
      <Table.RowItem {...tableConfig.date}>{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId}>
        <a href={`/#/${businessId}/spendMoney/${entry.id}`}>{entry.referenceId}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>{entry.description}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayAmount}>{entry.displayAmount}</Table.RowItem>
    </Table.Row>
  ));
}

export default SpendMoneyTableRowView;
