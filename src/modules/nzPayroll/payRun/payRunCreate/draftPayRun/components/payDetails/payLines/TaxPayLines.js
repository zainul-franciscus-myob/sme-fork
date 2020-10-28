import { connect } from 'react-redux';
import React from 'react';

import {
  getShouldShowTaxPayLines,
  getTaxPayLineEntries,
} from '../../../DraftPayRunSelectors';
import PayDetailsTableRows from '../PayDetailsTableRows';

const TaxPayLines = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayLineChange,
  onEmployeePayLineBlur,
  shouldShowTableRows,
}) => (
  <PayDetailsTableRows
    name="tax"
    title="Taxes"
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
  entries: getTaxPayLineEntries(state, props),
  shouldShowTableRows: getShouldShowTaxPayLines(state, props),
});

export default connect(mapStateToProps)(TaxPayLines);
