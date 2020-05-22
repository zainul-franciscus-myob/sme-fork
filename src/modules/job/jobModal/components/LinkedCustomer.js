import { connect } from 'react-redux';
import React from 'react';

import { getCustomerId, getCustomerOptions } from '../JobModalSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';

const handleCustomerComboboxChange = (key, handler) => (item) => {
  // Have to use custom handler because of mis-match between property names
  // in common handler, and property name expected by Customer Combobox.
  handler({ key, value: item.id });
};

const LinkedCustomer = ({
  customerId, customerOptions, onChange,
}) => (
  <CustomerCombobox
    label="Linked customer"
    selectedId={customerId}
    items={customerOptions}
    onChange={handleCustomerComboboxChange('customerId', onChange)}
    allowClear
  />
);

const mapStateToProps = state => ({
  customerId: getCustomerId(state),
  customerOptions: getCustomerOptions(state),
});

export default connect(mapStateToProps)(LinkedCustomer);
