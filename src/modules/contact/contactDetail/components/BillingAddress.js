import { connect } from 'react-redux';
import React from 'react';

import { getFormattedBillingAddress } from '../contactDetailSelectors';
import Address from './Address';
import AutocompleteAddress from './AutocompleteAddress';

const BillingAddress = ({ isAutocompleteAddressEnabled, ...otherProps }) =>
  isAutocompleteAddressEnabled ? (
    <AutocompleteAddress
      title="Billing address"
      {...otherProps}
      showSameAsBillingAddress={false}
    />
  ) : (
    <Address title="Billing address" {...otherProps} />
  );

const mapStateToProps = (state, { disabled }) =>
  getFormattedBillingAddress(state, { disabled });

export default connect(mapStateToProps)(BillingAddress);
