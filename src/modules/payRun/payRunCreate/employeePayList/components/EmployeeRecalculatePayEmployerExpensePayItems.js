import { connect } from 'react-redux';
import React from 'react';

import {
  getEmployerExpensePayItemEntries,
  getShouldShowExpensePayItemTableRows,
} from '../EmployeePayListSelectors';
import EmployeeRecalculatePayTableRows from './EmployeeRecalculatePayTableRows';

const EmployeeRecalculatePayEmployerExpensePayItems = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
  onAddJob,
}) => (
  <EmployeeRecalculatePayTableRows
    name="employerExpenses"
    title="Employer expenses"
    tableConfig={tableConfig}
    employeeId={employeeId}
    employeeName={employeeName}
    entries={entries}
    onChange={onEmployeePayItemChange}
    onBlur={onEmployeePayItemBlur}
    shouldShowTableRows={shouldShowTableRows}
    onAddJob={onAddJob}
  />
);

const mapStateToProps = (state, props) => ({
  entries: getEmployerExpensePayItemEntries(state, props),
  shouldShowTableRows: getShouldShowExpensePayItemTableRows(state, props),
});

export default connect(mapStateToProps)(
  EmployeeRecalculatePayEmployerExpensePayItems
);
