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
  employee: { width: '30rem', columnName: 'Employee' },
  padding: { width: 'flex-1', columnName: '' },
  netPay: { width: '16rem', columnName: 'Net Pay ($)', align: 'right' },
  bankFile: { width: '16rem', columnName: 'Bank file', align: 'center' },
};

const PrintPaySlipsTab = ({
  employees,
  selectAll,
  selectItem,
}) => {
  const selectedCount = employees.filter(e => e.isSelected).length;

  const bulkActions = (
    <BulkActions>
      <Button type="secondary">View pay slips (PDF)</Button>
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
          name="bulk-select-print"
          label="bulk-select-print"
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
            {"This is your employees' take home pay"}
          </Tooltip>
        </div>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.padding}>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.bankFile}>
        {tableConfig.bankFile.columnName}
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
        <a href={employee.link}>{employee.name}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.netPay}>
        {employee.netPay}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.padding}>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.bankFile}>
        {employee.hasBankFile && <Icons.Tick />}
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

export default PrintPaySlipsTab;
