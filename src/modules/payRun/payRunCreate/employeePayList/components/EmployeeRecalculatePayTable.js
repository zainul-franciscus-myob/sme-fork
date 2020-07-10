import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsPayrollJobColumnEnabled } from '../EmployeePayListSelectors';
import EmployeeRecalculatePayDeductionPayItems from './EmployeeRecalculatePayDeductionPayItems';
import EmployeeRecalculatePayEmployerExpensePayItems from './EmployeeRecalculatePayEmployerExpensePayItems';
import EmployeeRecalculatePayLeavePayItems from './EmployeeRecalculatePayLeavePayItems';
import EmployeeRecalculatePayTaxPayItems from './EmployeeRecalculatePayTaxPayItems';
import EmployeeRecalculatePayWagePayItems from './EmployeeRecalculatePayWagePayItems';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  hours: { width: '20rem', valign: 'middle', align: 'right' },
  amount: { width: '20rem', valign: 'middle', align: 'right' },
  job: { width: '15rem', valign: 'middle', align: 'left' },
};

const EmployeeRecalculatePayTable = ({
  employeeId,
  employeeName,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  isPayrollJobColumnEnabled,
  onAddJob,
}) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>Pay items</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.hours}>Hours</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>Amount ($)</Table.HeaderItem>
      {isPayrollJobColumnEnabled && (
        <Table.HeaderItem {...tableConfig.job}>Job</Table.HeaderItem>
      )}
    </Table.Header>
    <Table.Body>
      <EmployeeRecalculatePayWagePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        isPayrollJobColumnEnabled={isPayrollJobColumnEnabled}
        onAddJob={onAddJob}
      />
      <EmployeeRecalculatePayDeductionPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        isPayrollJobColumnEnabled={isPayrollJobColumnEnabled}
        onAddJob={onAddJob}
      />
      <EmployeeRecalculatePayTaxPayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        isPayrollJobColumnEnabled={isPayrollJobColumnEnabled}
        onAddJob={onAddJob}
      />
      <EmployeeRecalculatePayLeavePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        isPayrollJobColumnEnabled={isPayrollJobColumnEnabled}
        onAddJob={onAddJob}
      />
      <EmployeeRecalculatePayEmployerExpensePayItems
        tableConfig={tableConfig}
        employeeId={employeeId}
        employeeName={employeeName}
        onEmployeePayItemChange={onEmployeePayItemChange}
        onEmployeePayItemBlur={onEmployeePayItemBlur}
        isPayrollJobColumnEnabled={isPayrollJobColumnEnabled}
        onAddJob={onAddJob}
      />
    </Table.Body>
  </Table>
);

const mapStateToProps = (state) => ({
  isPayrollJobColumnEnabled: getIsPayrollJobColumnEnabled(state),
});

export default connect(mapStateToProps)(EmployeeRecalculatePayTable);
