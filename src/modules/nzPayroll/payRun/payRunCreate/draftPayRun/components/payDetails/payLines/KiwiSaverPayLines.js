import { connect } from 'react-redux';
import React from 'react';

import {
  getKiwiSaverPayLineEntries,
  getShouldShowKiwiSaverPayLines,
} from '../../../DraftPayRunSelectors';
import PayDetailsTableRows from '../PayDetailsTableRows';

const KiwiSaverPayLines = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayLineChange,
  onEmployeePayLineBlur,
  shouldShowTableRows,
}) => (
  <PayDetailsTableRows
    name="kiwiSaver"
    title="KiwiSaver"
    tableConfig={tableConfig}
    employeeId={employeeId}
    employeeName={employeeName}
    entries={entries}
    onChange={onEmployeePayLineChange}
    onBlur={onEmployeePayLineBlur}
    shouldShowTableRows={shouldShowTableRows}
    disableAmountInput
  />
);

const mapStateToProps = (state, props) => ({
  entries: getKiwiSaverPayLineEntries(state, props),
  shouldShowTableRows: getShouldShowKiwiSaverPayLines(state, props),
});

export default connect(mapStateToProps)(KiwiSaverPayLines);
