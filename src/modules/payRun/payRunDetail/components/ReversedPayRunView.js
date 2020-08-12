import { Button, Checkbox, Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../../../components/TableView/TableView';

const tableConfig = {
  checkbox: { width: '5rem' },
  employee: { width: 'flex-3', columnName: 'Employee' },
  netPay: { width: 'flex-3', columnName: 'Net pay ($)' },
  email: { width: 'flex-3', columnName: 'Email' },
};

const ReversedPayRunView = ({ employees, onEmployeeNameClick }) => {
  const selectedCount = employees.filter((e) => e.isSelected).length;

  const tableHeader = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.checkbox}>
        <Checkbox
          name="select-pay"
          label="select-pay"
          hideLabel
          disabled
          checked
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employee}>
        {tableConfig.employee.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.netPay}>
        <div style={{ display: 'flex' }}>
          {tableConfig.netPay.columnName}
          <Tooltip>{"This is your employee's take home pay"}</Tooltip>
        </div>
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.email}>
        {tableConfig.email.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = employees.map((employee) => (
    <Table.Row key={employee.id}>
      <Table.RowItem {...tableConfig.checkbox}>
        <Checkbox
          name={`${employee.id}-select`}
          label={`Select row ${employee.id}`}
          hideLabel
          disabled
          checked
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.employee}>
        <Button
          type="link"
          onClick={() => {
            onEmployeeNameClick(employee.transactionId, employee.name);
          }}
        >
          {employee.name}
        </Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.netPay}>{employee.netPay}</Table.RowItem>
      <Table.RowItem {...tableConfig.email}>{employee.email}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <>
      {selectedCount !== 0}
      <TableView header={tableHeader} isEmpty={employees.length === 0}>
        <Table.Body>{rows}</Table.Body>
      </TableView>
    </>
  );
};

export default ReversedPayRunView;
