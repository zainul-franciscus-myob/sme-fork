import { connect } from 'react-redux';
import React from 'react';

import { getDeductionTableRows } from '../../selectors/PayrollStandardPaySelectors';
import PayrollStandardPayDetailsTableRows from './PayrollStandardPayDetailsTableRows';

const PayrollStandardPayDetailsDeductionTableRows = (props) => (
  <PayrollStandardPayDetailsTableRows
    name="deductions"
    title="Deductions"
    {...props}
  />
);

const mapStateToProps = (state) => getDeductionTableRows(state);

export default connect(mapStateToProps)(
  PayrollStandardPayDetailsDeductionTableRows
);
