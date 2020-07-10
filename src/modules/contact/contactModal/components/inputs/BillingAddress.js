import { connect } from 'react-redux';
import React from 'react';

import { getContactModalBillingAddress } from '../../ContactModalSelectors';
import Address from './Address';

const BillingAddress = (props) => (
  <Address
    title="Billing address"
    toggleLabel="Add billing address"
    {...props}
  />
);

const mapStateToProps = (state) => getContactModalBillingAddress(state);

export default connect(mapStateToProps)(BillingAddress);
