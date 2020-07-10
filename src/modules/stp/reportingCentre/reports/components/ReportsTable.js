import { Card, Table } from '@myob/myob-widgets';
import React from 'react';

import ReportsEmpty from './ReportsEmpty';
import ReportsStatusLabel from './ReportsStatusLabel';
import TableView from '../../../../../components/TableView/TableView';

const ReportsTable = ({
  tableConfig,
  isTableLoading,
  payEvents,
  onRowSelect,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.payPeriod}>
        {tableConfig.payPeriod.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.paymentDate}>
        {tableConfig.paymentDate.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.recordedDate}>
        {tableConfig.recordedDate.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employeeCount}>
        {tableConfig.employeeCount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.gross}>
        {tableConfig.gross.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.tax}>
        {tableConfig.tax.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        {tableConfig.status.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = payEvents.map((row) => (
    <Table.Row
      key={row.id}
      rowData={{ id: row.id }}
      isSelected={row.isSelected}
      isActive={row.isSelected}
      onRowSelect={onRowSelect}
    >
      <Table.RowItem {...tableConfig.payPeriod}>{row.payPeriod}</Table.RowItem>
      <Table.RowItem {...tableConfig.paymentDate}>
        {row.paymentDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.recordedDate}>
        {row.recordedDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employeeCount}>
        {row.employeeCount}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.gross}>{row.gross}</Table.RowItem>
      <Table.RowItem {...tableConfig.tax}>{row.tax}</Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        <ReportsStatusLabel status={row.status} />
      </Table.RowItem>
    </Table.Row>
  ));

  const table = (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={payEvents.length === 0}
      emptyView={<ReportsEmpty />}
    >
      <Table.Body>{rows}</Table.Body>
    </TableView>
  );

  return <Card body={table} />;
};

export default ReportsTable;
