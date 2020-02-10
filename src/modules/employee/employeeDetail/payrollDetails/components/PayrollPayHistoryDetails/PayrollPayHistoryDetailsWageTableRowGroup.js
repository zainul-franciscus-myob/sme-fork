import { connect } from 'react-redux';
import React from 'react';

import { getWageTableRows } from '../../selectors/PayrollPayHistorySelectors';
import PayrollPayHistoryDetailsTableRowGroup from './PayrollPayHistoryDetailsTableRowGroup';


const PayrollPayHistoryDetailsWageTableRowGroup = props => (
  <PayrollPayHistoryDetailsTableRowGroup name="wages" title="Wages" {...props} />
);


const mapStateToProps = state => getWageTableRows(state);

export default connect(mapStateToProps)(PayrollPayHistoryDetailsWageTableRowGroup);
