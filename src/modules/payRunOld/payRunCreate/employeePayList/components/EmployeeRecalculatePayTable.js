import { Table } from '@myob/myob-widgets';
import React from 'react';

import EmployeeRecalculatePayDeductionPayItems from './EmployeeRecalculatePayDeductionPayItems';
import EmployeeRecalculatePayEmployerExpensePayItems from './EmployeeRecalculatePayEmployerExpensePayItems';
import EmployeeRecalculatePayLeavePayItems from './EmployeeRecalculatePayLeavePayItems';
import EmployeeRecalculatePayTaxPayItems from './EmployeeRecalculatePayTaxPayItems';
import EmployeeRecalculatePayWagePayItems from './EmployeeRecalculatePayWagePayItems';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  hours: { width: '20rem', valign: 'middle', align: 'right' },
  amount: { width: '20rem', valign: 'middle', align: 'right' },
};

const EmployeeRecalculatePayTable = ({
  employeeId,
  employeeName,
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
      <EmployeeRecalculatePayWagePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
      <EmployeeRecalculatePayDeductionPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
      <EmployeeRecalculatePayTaxPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
      <EmployeeRecalculatePayLeavePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
      <EmployeeRecalculatePayEmployerExpensePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
      />
    </Table.Body>
  </Table>
);

export default EmployeeRecalculatePayTable;
