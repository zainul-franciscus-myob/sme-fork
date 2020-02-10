import { connect } from 'react-redux';
import React from 'react';

import { getTaxTableRows } from '../../selectors/PayrollPayHistorySelectors';
import PayrollPayHistoryDetailsTableRowGroup from './PayrollPayHistoryDetailsTableRowGroup';

const PayrollPayHistoryDetailsTaxTableRowGroup = props => (
  <PayrollPayHistoryDetailsTableRowGroup name="taxes" title="Taxes" {...props} />
);

const mapStateToProps = state => getTaxTableRows(state);

export default connect(mapStateToProps)(PayrollPayHistoryDetailsTaxTableRowGroup);
