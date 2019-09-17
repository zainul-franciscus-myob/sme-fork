import { connect } from 'react-redux';
import React from 'react';

import { getExpenseTableRows } from '../../selectors/PayrollPayHistorySelectors';
import PayrollPayHistoryDetailsTableRowGroup from './PayrollPayHistoryDetailsTableRowGroup';

const PayrollPayHistoryDetailsExpenseTableRowGroup = props => (
  <PayrollPayHistoryDetailsTableRowGroup name="expense" title="Expense" {...props} />
);

const mapStateToProps = state => getExpenseTableRows(state);

export default connect(mapStateToProps)(PayrollPayHistoryDetailsExpenseTableRowGroup);
