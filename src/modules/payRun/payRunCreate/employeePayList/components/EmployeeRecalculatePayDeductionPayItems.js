import { connect } from 'react-redux';
import React from 'react';

import {
  getDeductionPayItemEntries,
  getShouldShowDeductionPayItemTableRows,
} from '../EmployeePayListSelectors';
import EmployeeRecalculatePayTableRows from './EmployeeRecalculatePayTableRows';

const EmployeeRecalculatePayDeductionPayItems = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
}) => (
  <EmployeeRecalculatePayTableRows
    name="deductions"
    title="Deductions"
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
  entries: getDeductionPayItemEntries(state, props),
  shouldShowTableRows: getShouldShowDeductionPayItemTableRows(state, props),
});

export default connect(mapStateToProps)(EmployeeRecalculatePayDeductionPayItems);
