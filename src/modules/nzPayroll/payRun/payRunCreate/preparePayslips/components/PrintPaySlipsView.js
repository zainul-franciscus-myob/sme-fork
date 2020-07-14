import { Table } from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../../../../../components/TableView/TableView';

const tableConfig = {
  employee: { width: '30rem', columnName: 'Employee' },
  padding: { width: 'flex-1', columnName: '' },
  takeHomePay: {
    width: '16rem',
    columnName: 'Take home pay ($)',
    align: 'right',
  },
};

const PrintPaySlipsView = ({ employees }) => {
  const tableHeader = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.employee}>
        {tableConfig.employee.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.padding}></Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.takeHomePay}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {tableConfig.takeHomePay.columnName}
        </div>
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = employees.map((employee) => (
    <Table.Row key={employee.transactionId}>
      <Table.RowItem {...tableConfig.employee}>{employee.name}</Table.RowItem>
      <Table.RowItem {...tableConfig.padding}></Table.RowItem>
      <Table.RowItem {...tableConfig.takeHomePay}>
        {employee.takeHomePay}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <>
      <TableView header={tableHeader} isEmpty={employees.length === 0}>
        <Table.Body>{rows}</Table.Body>
      </TableView>
    </>
  );
};

export default PrintPaySlipsView;
