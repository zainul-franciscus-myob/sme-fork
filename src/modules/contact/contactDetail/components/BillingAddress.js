import { connect } from 'react-redux';
import React from 'react';

import { getFormattedBillingAddress } from '../contactDetailSelectors';
import Address from './Address';

const BillingAddress = (props) => (
  <Address title="Billing address" {...props} />
);

const mapStateToProps = (state) => getFormattedBillingAddress(state);

export default connect(mapStateToProps)(BillingAddress);
