import { connect } from 'react-redux';
import React from 'react';

import { getExpenseTableRows } from '../../selectors/PayrollStandardPaySelectors';
import PayrollStandardPayDetailsTableRows from './PayrollStandardPayDetailsTableRows';

const PayrollStandardPayDetailsExpenseTableRows = (props) => (
  <PayrollStandardPayDetailsTableRows
    name="expense"
    title="Expense"
    {...props}
  />
);

const mapStateToProps = (state) => getExpenseTableRows(state);

export default connect(mapStateToProps)(
  PayrollStandardPayDetailsExpenseTableRows
);
