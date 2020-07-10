import { connect } from 'react-redux';
import React from 'react';

import { getWageTableRows } from '../../selectors/PayrollStandardPaySelectors';
import PayrollStandardPayDetailsTableRows from './PayrollStandardPayDetailsTableRows';

const PayrollStandardPayDetailsWageTableRows = (props) => (
  <PayrollStandardPayDetailsTableRows name="wages" title="Wages" {...props} />
);

const mapStateToProps = (state) => getWageTableRows(state);

export default connect(mapStateToProps)(PayrollStandardPayDetailsWageTableRows);
