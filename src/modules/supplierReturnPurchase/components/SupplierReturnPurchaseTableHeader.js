import { Table } from '@myob/myob-widgets';
import React from 'react';

const SupplierReturnPurchaseTableHeader = ({ tableConfig }) => (
  <Table.Header>
    <Table.HeaderItem {...tableConfig.date}>
      {tableConfig.date.columnName}
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.purchaseNumber}>
      {tableConfig.purchaseNumber.columnName}
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.status}>
      {tableConfig.status.columnName}
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.amount}>
      {tableConfig.amount.columnName}
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.discount}>
      {tableConfig.discount.columnName}
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.owed}>
      {tableConfig.owed.columnName}
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.amountApplied}>
      {tableConfig.amountApplied.columnName}
    </Table.HeaderItem>
  </Table.Header>
);

export default SupplierReturnPurchaseTableHeader;
