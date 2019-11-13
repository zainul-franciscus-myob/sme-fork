import { connect } from 'react-redux';
import React from 'react';

import { getContactModalShippingAddress } from '../../ContactModalSelectors';
import Address from './Address';

const ShippingAddress = props => (
  <Address
    title="Shipping address"
    toggleLabel="Add shipping address"
    {...props}
  />
);

const mapStateToProps = state => getContactModalShippingAddress(state);

export default connect(mapStateToProps)(ShippingAddress);
