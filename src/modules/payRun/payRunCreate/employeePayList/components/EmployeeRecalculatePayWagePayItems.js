import { connect } from 'react-redux';
import React from 'react';

import {
  getShouldShowWagePayItemTableRows,
  getWagePayItemEntries,
} from '../EmployeePayListSelectors';
import EmployeeRecalculatePayTableRows from './EmployeeRecalculatePayTableRows';

const EmployeeRecalculatePayWagePayItems = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
  isPayrollJobColumnEnabled,
  onAddJob,
}) => (
  <EmployeeRecalculatePayTableRows
    name="wage"
    title="Wages"
    tableConfig={tableConfig}
    employeeId={employeeId}
    employeeName={employeeName}
    entries={entries}
    onChange={onEmployeePayItemChange}
    onBlur={onEmployeePayItemBlur}
    shouldShowTableRows={shouldShowTableRows}
    isPayrollJobColumnEnabled={isPayrollJobColumnEnabled}
    onAddJob={onAddJob}
  />
);

const mapStateToProps = (state, props) => ({
  entries: getWagePayItemEntries(state, props),
  shouldShowTableRows: getShouldShowWagePayItemTableRows(state, props),
});

export default connect(mapStateToProps)(EmployeeRecalculatePayWagePayItems);
