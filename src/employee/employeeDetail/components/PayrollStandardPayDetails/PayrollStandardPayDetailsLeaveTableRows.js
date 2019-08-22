import { connect } from 'react-redux';
import React from 'react';

import { getLeaveTableRows } from '../../selectors/PayrollStandardPaySelectors';
import PayrollStandardPayDetailsTableRows from './PayrollStandardPayDetailsTableRows';

const PayrollStandardPayDetailsLeaveTableRows = props => (
  <PayrollStandardPayDetailsTableRows name="leave" title="Leave" {...props} />
);

const mapStateToProps = state => getLeaveTableRows(state);

export default connect(mapStateToProps)(PayrollStandardPayDetailsLeaveTableRows);
