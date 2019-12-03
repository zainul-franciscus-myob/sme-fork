import {
  BulkActions,
  Button,
  Checkbox,
  Icons,
  Table,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  checkbox: { width: '5rem' },
  employee: { width: 'flex-3', columnName: 'Employee' },
  netPay: { width: 'flex-2', columnName: 'Net pay ($)', align: 'right' },
  email: { width: 'flex-3', columnName: 'Email' },
  paySlipEmailed: { width: 'flex-2', columnName: 'Pay slip emailed', align: 'center' },
  bankFile: { width: 'flex-1', columnName: 'Bank file', align: 'center' },
  viewPaySlip: { width: 'flex-1', columnName: 'View PDF', align: 'center' },
};

const EmailPaySlipsTab = ({
  employees,
  selectAll,
  selectItem,
  onEmployeeNameClick,
  exportPdf,
  onEmailClick,
}) => {
  const selectedCount = employees.filter(e => e.isSelected).length;

  const bulkActions = (
    <BulkActions>
      <Button type="secondary" onClick={onEmailClick}>Email</Button>
      <BulkActions.Counter
        count={selectedCount}
        label={selectedCount > 1 ? 'employees selected' : 'employee selected'}
      />
    </BulkActions>
  );

  const tableHeader = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.checkbox}>
        <Checkbox
          name="bulk-select-email"
          label="bulk-select-email"
          hideLabel
          onChange={e => selectAll(e.target.checked)}
          checked={
            employees.length !== 0 && selectedCount === employees.length
          }
          indeterminate={
            selectedCount > 0 && selectedCount !== employees.length
          }
        />
      </Table.HeaderItem>
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
      <Table.HeaderItem {...tableConfig.email}>
        {tableConfig.email.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.paySlipEmailed}>
        {tableConfig.paySlipEmailed.columnName}
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
      <Table.RowItem {...tableConfig.checkbox}>
        <Checkbox
          name={`${employee.id}-select`}
          label={`Select row ${employee.id}`}
          hideLabel
          onChange={e => selectItem(employee, e.target.checked)}
          checked={employee.isSelected}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employee}>
        <Button type="link" onClick={() => { onEmployeeNameClick(employee.transactionId, employee.name); }}>{employee.name}</Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.netPay}>
        {employee.netPay}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.email}>
        {employee.email}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.paySlipEmailed}>
        {employee.hasPaySlipEmailSent && <Icons.Tick />}
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
      {(selectedCount !== 0) && bulkActions}
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

export default EmailPaySlipsTab;
