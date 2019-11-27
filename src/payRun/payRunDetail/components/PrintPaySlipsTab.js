import {
  Button,
  Icons,
  Table,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  employee: { width: '30rem', columnName: 'Employee' },
  padding: { width: 'flex-1', columnName: '' },
  netPay: { width: '16rem', columnName: 'Net pay ($)', align: 'right' },
  bankFile: { width: '16rem', columnName: 'Bank file', align: 'center' },
  viewPaySlip: { columnName: 'View PDF', align: 'center' },
};

const PrintPaySlipsTab = ({
  employees,
  onEmployeeNameClick,
  exportPdf,
}) => {
  const tableHeader = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.employee}>
        {tableConfig.employee.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.netPay}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {tableConfig.netPay.columnName}
          <Tooltip>
            {"This is your employee's take home pay"}
          </Tooltip>
        </div>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.padding}>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.bankFile}>
        {tableConfig.bankFile.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.viewPaySlip}>
        {tableConfig.viewPaySlip.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = employees.map(employee => (
    <Table.Row key={employee.id}>
      <Table.RowItem {...tableConfig.employee}>
        <Button type="link" onClick={() => { onEmployeeNameClick(employee.transactionId, employee.name); }}>{employee.name}</Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.netPay}>
        {employee.netPay}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.padding}>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.bankFile}>
        {employee.hasBankFile && <Icons.Tick />}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.viewPaySlip}>
        <Button type="link" icon={<Icons.GenericDocument />} onClick={() => { exportPdf(employee.transactionId); }} />
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <>
      <TableView
        header={tableHeader}
        isEmpty={employees.length === 0}
      >
        <Table.Body>
          {rows}
        </Table.Body>
      </TableView>
    </>
  );
};

export default PrintPaySlipsTab;
