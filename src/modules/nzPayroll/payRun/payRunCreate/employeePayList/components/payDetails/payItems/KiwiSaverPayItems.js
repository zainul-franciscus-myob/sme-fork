import { connect } from 'react-redux';
import React from 'react';

import {
  getKiwiSaverPayItemEntries,
  getShouldShowKiwiSaverPayItems,
} from '../../../EmployeePayListSelectors';
import PayDetailsTableRows from '../PayDetailsTableRows';

const KiwiSaverPayItems = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
}) => (
  <PayDetailsTableRows
    name="kiwiSaver"
    title="KiwiSaver"
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
  entries: getKiwiSaverPayItemEntries(state, props),
  shouldShowTableRows: getShouldShowKiwiSaverPayItems(state, props),
});

export default connect(mapStateToProps)(KiwiSaverPayItems);
