import { connect } from 'react-redux';
import React from 'react';

import {
  getShouldShowWagePayItems,
  getWagePayItemEntries,
} from '../../../EmployeePayListSelectors';
import PayDetailsTableRows from '../PayDetailsTableRows';

const WagePayItems = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
}) => (
  <PayDetailsTableRows
    name="wage"
    title="Wages"
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
  entries: getWagePayItemEntries(state, props),
  shouldShowTableRows: getShouldShowWagePayItems(state, props),
});

export default connect(mapStateToProps)(WagePayItems);
