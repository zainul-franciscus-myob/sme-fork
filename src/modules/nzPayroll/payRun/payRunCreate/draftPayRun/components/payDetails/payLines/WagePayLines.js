import { connect } from 'react-redux';
import React from 'react';

import {
  getShouldShowWagePayLines,
  getWagePayLineEntries,
} from '../../../DraftPayRunSelectors';
import PayDetailsTableRows from '../PayDetailsTableRows';

const WagePayLines = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayLineChange,
  onEmployeePayLineBlur,
  shouldShowTableRows,
}) => (
  <PayDetailsTableRows
    name="wage"
    title="Wages"
    tableConfig={tableConfig}
    employeeId={employeeId}
    employeeName={employeeName}
    entries={entries}
    onChange={onEmployeePayLineChange}
    onBlur={onEmployeePayLineBlur}
    shouldShowTableRows={shouldShowTableRows}
  />
);

const mapStateToProps = (state, props) => ({
  entries: getWagePayLineEntries(state, props),
  shouldShowTableRows: getShouldShowWagePayLines(state, props),
});

export default connect(mapStateToProps)(WagePayLines);
