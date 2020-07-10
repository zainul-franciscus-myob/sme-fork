import { connect } from 'react-redux';
import React from 'react';

import { getFormattedShippingAddress } from '../contactDetailSelectors';
import Address from './Address';

const ShippingAddress = (props) => (
  <Address title="Shipping address" {...props} />
);

const mapStateToProps = (state) => getFormattedShippingAddress(state);

export default connect(mapStateToProps)(ShippingAddress);
