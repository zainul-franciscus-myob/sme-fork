import { connect } from 'react-redux';
import React from 'react';

import { getDeductionTableRows } from '../../selectors/PayrollPayHistorySelectors';
import PayrollPayHistoryDetailsTableRowGroup from './PayrollPayHistoryDetailsTableRowGroup';

const PayrollPayHistoryDetailsDeductionTableRowGroup = props => (
  <PayrollPayHistoryDetailsTableRowGroup name="deductions" title="Deductions" {...props} />
);

const mapStateToProps = state => getDeductionTableRows(state);

export default connect(mapStateToProps)(PayrollPayHistoryDetailsDeductionTableRowGroup);
