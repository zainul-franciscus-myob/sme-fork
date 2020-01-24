import { connect } from 'react-redux';
import React from 'react';

import { getCombinedPayItemEntries, getShouldShowCombinedPayItemTableRows } from '../EmployeePayListSelectors';
import EmployeeRecalculatePayTableRows from './EmployeeRecalculatePayTableRows';

const EmployeeRecalculatePayCombinedPayItems = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
}) => (
  <EmployeeRecalculatePayTableRows
    name="combined"
    title="Wages, deductions and taxes"
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
  entries: getCombinedPayItemEntries(state, props),
  shouldShowTableRows: getShouldShowCombinedPayItemTableRows(),
});

export default connect(mapStateToProps)(EmployeeRecalculatePayCombinedPayItems);
