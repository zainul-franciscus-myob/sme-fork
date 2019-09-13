import { Table } from '@myob/myob-widgets';
import React from 'react';

import EmployeeRecalculatePayCombinedPayItems from './EmployeeRecalculatePayCombinedPayItems';
import EmployeeRecalculatePayEmployerExpensePayItems from './EmployeeRecalculatePayEmployerExpensePayItems';
import EmployeeRecalculatePayLeavePayItems from './EmployeeRecalculatePayLeavePayItems';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  hours: { width: '20rem', valign: 'middle', align: 'right' },
  amount: { width: '20rem', valign: 'middle', align: 'right' },
};

const EmployeeRecalculatePayTable = ({
  employeeId,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
}) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>Pay items</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.hours}>Hours</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>Amount ($)</Table.HeaderItem>
    </Table.Header>
    <Table.Body>
      <EmployeeRecalculatePayCombinedPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
      <EmployeeRecalculatePayLeavePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
      <EmployeeRecalculatePayEmployerExpensePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
    </Table.Body>
  </Table>
);

export default EmployeeRecalculatePayTable;
