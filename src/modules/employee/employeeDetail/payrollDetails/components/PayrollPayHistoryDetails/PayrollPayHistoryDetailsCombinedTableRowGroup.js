import { connect } from 'react-redux';
import React from 'react';

import { getCombinedTableRows } from '../../selectors/PayrollPayHistorySelectors';
import PayrollPayHistoryDetailsTableRowGroup from './PayrollPayHistoryDetailsTableRowGroup';

const PayrollPayHistoryDetailsCombinedTableRowGroup = props => (
  <PayrollPayHistoryDetailsTableRowGroup name="combined" title="Wages, deductions and taxes" {...props} />
);

const mapStateToProps = state => getCombinedTableRows(state);

export default connect(mapStateToProps)(PayrollPayHistoryDetailsCombinedTableRowGroup);
