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
  job: { width: '17rem', valign: 'middle', align: 'left' },
};

const EmployeeRecalculatePayTable = ({
  employeeId,
  employeeName,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  onAddJob,
  featureToggles,
}) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>Pay items</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.hours}>Hours</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>Amount ($)</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.job}>Job</Table.HeaderItem>
    </Table.Header>
    <Table.Body>
      <EmployeeRecalculatePayWagePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        onAddJob={onAddJob}
        featureToggles={featureToggles}
      />
      <EmployeeRecalculatePayDeductionPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        onAddJob={onAddJob}
        featureToggles={featureToggles}
      />
      <EmployeeRecalculatePayTaxPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        onAddJob={onAddJob}
        featureToggles={featureToggles}
      />
      <EmployeeRecalculatePayLeavePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        onAddJob={onAddJob}
        featureToggles={featureToggles}
      />
      <EmployeeRecalculatePayEmployerExpensePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        onAddJob={onAddJob}
        featureToggles={featureToggles}
      />
    </Table.Body>
  </Table>
);

export default EmployeeRecalculatePayTable;
