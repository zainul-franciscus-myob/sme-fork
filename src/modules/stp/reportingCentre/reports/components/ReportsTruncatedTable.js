import { Card, Table } from '@myob/myob-widgets';
import React from 'react';

import ReportsEmpty from './ReportsEmpty';
import ReportsStatusLabel from './ReportsStatusLabel';
import TableView from '../../../../../components/TableView/TableView';

const ReportsTruncatedTable = ({
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
      <Table.HeaderItem {...tableConfig.recordedDate}>
        {tableConfig.recordedDate.columnName}
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
      <Table.RowItem {...tableConfig.recordedDate}>
        {row.recordedDate}
      </Table.RowItem>
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

export default ReportsTruncatedTable;
