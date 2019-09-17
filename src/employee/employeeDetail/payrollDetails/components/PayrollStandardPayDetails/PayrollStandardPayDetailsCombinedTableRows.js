import { connect } from 'react-redux';
import React from 'react';

import { getCombinedTableRows } from '../../selectors/PayrollStandardPaySelectors';
import PayrollStandardPayDetailsTableRows from './PayrollStandardPayDetailsTableRows';

const PayrollStandardPayDetailsCombinedTableRows = props => (
  <PayrollStandardPayDetailsTableRows name="combined" title="Wages, deductions and taxes" {...props} />
);

const mapStateToProps = state => getCombinedTableRows(state);

export default connect(mapStateToProps)(PayrollStandardPayDetailsCombinedTableRows);
