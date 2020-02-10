import { connect } from 'react-redux';
import React from 'react';

import { getTaxTableRows } from '../../selectors/PayrollStandardPaySelectors';
import PayrollStandardPayDetailsTableRows from './PayrollStandardPayDetailsTableRows';

const PayrollStandardPayDetailsTaxTableRows = props => (
  <PayrollStandardPayDetailsTableRows name="taxes" title="Taxes" {...props} />
);

const mapStateToProps = state => getTaxTableRows(state);

export default connect(mapStateToProps)(PayrollStandardPayDetailsTaxTableRows);
