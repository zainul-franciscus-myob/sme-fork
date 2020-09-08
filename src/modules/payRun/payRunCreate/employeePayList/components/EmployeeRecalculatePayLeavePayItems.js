import { connect } from 'react-redux';
import React from 'react';

import {
  getLeavePayItemEntries,
  getShouldShowLeavePayItemTableRows,
} from '../EmployeePayListSelectors';
import EmployeeRecalculatePayTableRows from './EmployeeRecalculatePayTableRows';

const EmployeeRecalculatePayLeavePayItems = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
  isPayrollJobColumnEnabled,
  onAddJob,
  featureToggles,
}) => (
  <EmployeeRecalculatePayTableRows
    name="leave"
    title="Leave accrual"
    tableConfig={tableConfig}
    employeeId={employeeId}
    employeeName={employeeName}
    entries={entries}
    onChange={onEmployeePayItemChange}
    onBlur={onEmployeePayItemBlur}
    shouldShowTableRows={shouldShowTableRows}
    isPayrollJobColumnEnabled={isPayrollJobColumnEnabled}
    onAddJob={onAddJob}
    featureToggles={featureToggles}
  />
);

const mapStateToProps = (state, props) => ({
  entries: getLeavePayItemEntries(state, props),
  shouldShowTableRows: getShouldShowLeavePayItemTableRows(state, props),
});

export default connect(mapStateToProps)(EmployeeRecalculatePayLeavePayItems);
