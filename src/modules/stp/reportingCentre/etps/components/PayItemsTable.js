import { Table } from '@myob/myob-widgets';
import React from 'react';

const tableConfig = {
  name: {
    columnName: 'Pay item', width: 'flex-2', valign: 'middle',
  },
  stpCategory: {
    columnName: 'ATO reporting category', width: 'flex-2', valign: 'middle',
  },
  payItemType: {
    columnName: 'Pay item type', width: 'flex-2', valign: 'middle',
  },
  amount: {
    columnName: 'Amount ($)', width: 'flex-2', valign: 'middle', align: 'right',
  },
};

const PayItemsTable = ({
  payItems,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        {tableConfig.name.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.stpCategory}>
        {tableConfig.stpCategory.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.payItemType}>
        {tableConfig.payItemType.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        {tableConfig.amount.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = payItems && payItems.map(row => (
    <Table.Row key={row.name} rowData={{ id: row.name }}>
      <Table.RowItem {...tableConfig.name}>
        {row.name}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.stpCategory}>
        {row.stpCategory}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.payItemType}>
        {row.type}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>
        {row.amount}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table>
      {header}
      {rows}
    </Table>
  );
};

export default PayItemsTable;
