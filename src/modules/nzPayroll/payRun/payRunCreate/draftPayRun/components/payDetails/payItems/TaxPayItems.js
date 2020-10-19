import { connect } from 'react-redux';
import React from 'react';

import {
  getShouldShowTaxPayItems,
  getTaxPayItemEntries,
} from '../../../DraftPayRunSelectors';
import PayDetailsTableRows from '../PayDetailsTableRows';

const TaxPayItems = ({
  tableConfig,
  employeeId,
  employeeName,
  entries,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  shouldShowTableRows,
}) => (
  <PayDetailsTableRows
    name="tax"
    title="Taxes"
    tableConfig={tableConfig}
    employeeId={employeeId}
    employeeName={employeeName}
    entries={entries}
    onChange={onEmployeePayItemChange}
    onBlur={onEmployeePayItemBlur}
    shouldShowTableRows={shouldShowTableRows}
    disableAmountInput
  />
);

const mapStateToProps = (state, props) => ({
  entries: getTaxPayItemEntries(state, props),
  shouldShowTableRows: getShouldShowTaxPayItems(state, props),
});

export default connect(mapStateToProps)(TaxPayItems);
