import { Table } from '@myob/myob-widgets';
import React from 'react';

const tableConfig = {
  payItems: { columnName: 'Pay items', width: 'flex-1', valign: 'middle' },
  hours: {
    columnName: 'Hours',
    width: '20rem',
    valign: 'middle',
    align: 'right',
  },
  amount: {
    columnName: 'Amount ($)',
    width: '20rem',
    valign: 'middle',
    align: 'right',
  },
};

const EmployeePayDetailModalTable = ({
  payItemGroups,
}) => {
  const rowSections = payItemGroups.map((payItemGroup) => {
    const sectionHeader = (
      <Table.Row key={payItemGroup.categoryName}>
        <Table.RowItem cellRole="heading">{payItemGroup.categoryName}</Table.RowItem>
      </Table.Row>
    );

    const sectionBody = payItemGroup.items.map(item => (
      <Table.Row key={item.payItemId}>
        <Table.RowItem {...tableConfig.payItems} indentLevel={1}>
          {item.name}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.hours}>
          {item.hours}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>
          {item.amount}
        </Table.RowItem>
      </Table.Row>
    ));

    return (
      <div key={payItemGroup.categoryName}>
        {sectionHeader}
        {sectionBody}
      </div>
    );
  });

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem
          {...tableConfig.payItems}
        >
          {tableConfig.payItems.columnName}
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.hours}>{tableConfig.hours.columnName}</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.amount}>{tableConfig.amount.columnName}</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        {rowSections}
      </Table.Body>
    </Table>
  );
};

export default EmployeePayDetailModalTable;
