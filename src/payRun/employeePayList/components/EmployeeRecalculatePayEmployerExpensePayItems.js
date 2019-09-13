import { connect } from 'react-redux';
import React from 'react';

import { getEmployerExpensePayItemEntries, getShouldShowExpensePayItemTableRows } from '../EmployeePayListSelectors';
import EmployeeRecalculatePayTableRows from './EmployeeRecalculatePayTableRows';

const EmployeeRecalculatePayEmployerExpensePayItems = ({
  tableConfig,
  employeeId,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
}) => (
  <EmployeeRecalculatePayTableRows
    name="employerExpenses"
    title="Employer expenses"
    tableConfig={tableConfig}
    employeeId={employeeId}
    entries={entries}
    onChange={onEmployeePayItemChange}
    onBlur={onEmployeePayItemBlur}
    shouldShowTableRows={shouldShowTableRows}
  />
);

const mapStateToProps = (state, props) => ({
  entries: getEmployerExpensePayItemEntries(state, props),
  shouldShowTableRows: getShouldShowExpensePayItemTableRows(state, props),
});

export default connect(mapStateToProps)(EmployeeRecalculatePayEmployerExpensePayItems);
