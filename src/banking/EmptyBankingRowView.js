import { Table } from '@myob/myob-widgets';
import React from 'react';

const EmptyBankingRowView = () => (
  <Table.Row>
    <Table.RowItem valign="top" align="center" width="flex-1">There are no transactions to display</Table.RowItem>
  </Table.Row>
);

export default EmptyBankingRowView;
