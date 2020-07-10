import { connect } from 'react-redux';
import React from 'react';

import { getLeaveTableRows } from '../../selectors/PayrollPayHistorySelectors';
import PayrollPayHistoryDetailsTableRowGroup from './PayrollPayHistoryDetailsTableRowGroup';

const PayrollPayHistoryDetailsLeaveTableRowGroup = (props) => (
  <PayrollPayHistoryDetailsTableRowGroup
    name="leave"
    title="Leave"
    {...props}
  />
);

const mapStateToProps = (state) => getLeaveTableRows(state);

export default connect(mapStateToProps)(
  PayrollPayHistoryDetailsLeaveTableRowGroup
);
