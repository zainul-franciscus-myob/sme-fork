import { connect } from 'react-redux';
import React from 'react';

import {
  getShouldShowTaxPayItemTableRows,
  getTaxPayItemEntries,
} from '../EmployeePayListSelectors';
import EmployeeRecalculatePayTableRows from './EmployeeRecalculatePayTableRows';

const EmployeeRecalculatePayTaxPayItems = ({
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
    name="tax"
    title="Taxes"
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
  entries: getTaxPayItemEntries(state, props),
  shouldShowTableRows: getShouldShowTaxPayItemTableRows(state, props),
});

export default connect(mapStateToProps)(EmployeeRecalculatePayTaxPayItems);
