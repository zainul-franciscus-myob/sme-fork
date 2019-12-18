import { connect } from 'react-redux';
import React from 'react';

import {
  getLeavePayItemEntries, getShouldShowLeavePayItemTableRows,
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
  />
);

const mapStateToProps = (state, props) => ({
  entries: getLeavePayItemEntries(state, props),
  shouldShowTableRows: getShouldShowLeavePayItemTableRows(state, props),
});

export default connect(mapStateToProps)(EmployeeRecalculatePayLeavePayItems);
