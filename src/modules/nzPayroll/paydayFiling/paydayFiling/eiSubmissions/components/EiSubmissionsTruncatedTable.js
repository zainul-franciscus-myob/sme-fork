import { Card, Table } from '@myob/myob-widgets';
import React from 'react';

import EiSubmissionsEmptyTable from './EiSubmissionsEmptyTable';
import EiSubmissionsStatusLabel from './EiSubmissionsStatusLabel';
import TableView from '../../../../../../components/TableView/TableView';

const EiSubmissionsTruncatedTable = ({
  tableConfig,
  isTableLoading,
  payRuns,
  onRowSelect,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.payPeriod}>
        {tableConfig.payPeriod.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.dateRecorded}>
        {tableConfig.dateRecorded.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        {tableConfig.status.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = payRuns.map((row) => (
    <Table.Row
      key={row.id}
      rowData={{ id: row.id }}
      isSelected={row.isSelected}
      isActive={row.isSelected}
      onRowSelect={onRowSelect}
    >
      <Table.RowItem {...tableConfig.payPeriod}>{row.payPeriod}</Table.RowItem>
      <Table.RowItem {...tableConfig.dateRecorded}>
        {row.dateRecorded}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        <EiSubmissionsStatusLabel status={row.status} />
      </Table.RowItem>
    </Table.Row>
  ));

  const table = (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={payRuns.length === 0}
      emptyView={<EiSubmissionsEmptyTable />}
    >
      <Table.Body>{rows}</Table.Body>
    </TableView>
  );

  return <Card body={table} />;
};

export default EiSubmissionsTruncatedTable;
