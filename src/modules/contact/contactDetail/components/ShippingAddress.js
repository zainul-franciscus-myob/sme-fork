import { connect } from 'react-redux';
import React from 'react';

import { getFormattedShippingAddress } from '../contactDetailSelectors';
import Address from './Address';
import AutocompleteAddress from './AutocompleteAddress';

const ShippingAddress = ({ isAutocompleteAddressEnabled, ...otherProps }) =>
  isAutocompleteAddressEnabled ? (
    <AutocompleteAddress
      title="Shipping address"
      {...otherProps}
      showSameAsBillingAddress
    />
  ) : (
    <Address title="Shipping address" {...otherProps} />
  );

const mapStateToProps = (state, { disabled }) =>
  getFormattedShippingAddress(state, { disabled });

export default connect(mapStateToProps)(ShippingAddress);
