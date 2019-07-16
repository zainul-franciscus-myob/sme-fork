import {
  Checkbox, CheckboxGroup, Columns, DatePicker, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsCreating, getOptions } from '../invoicePaymentDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../components/combobox/ContactCombobox';
import styles from './InvoicePaymentDetailOptions.module.css';

const InvoicePaymentDetailOptions = ({
  customers,
  customerId,
  accounts,
  accountId,
  referenceId,
  description,
  date,
  isCreating,
  showPaidInvoices,
  onUpdateInvoicePaymentDetails,
  onUpdateShowPaidInvoices,
  onUpdateCustomer,
}) => {
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    onUpdateInvoicePaymentDetails(name, value);
  };

  const handleDateChange = ({ value }) => onUpdateInvoicePaymentDetails('date', value);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    onUpdateShowPaidInvoices(checked);
  };

  const handleComboBoxChange = key => ({ id }) => {
    onUpdateInvoicePaymentDetails(key, id);
  };

  const handleCustomerComboBoxChange = ({ id }) => {
    onUpdateCustomer(id);
  };

  return (
    <Columns type="three">
      <ContactCombobox
        label="Customer"
        name="customer"
        hideLabel={false}
        items={customers}
        selectedId={customerId}
        onChange={handleCustomerComboBoxChange}
        disabled={!isCreating}
      />
      <AccountCombobox
        label="Deposit into"
        hideLabel={false}
        onChange={handleComboBoxChange('accountId')}
        selectedId={accountId}
        items={accounts}
      />
      <TextArea
        label="Description"
        name="description"
        autoSize
        placeholder="Max 255 characters"
        resize="vertical"
        value={description}
        onChange={handleInputChange}
      />
      <Input
        label="Reference"
        name="referenceId"
        value={referenceId}
        onChange={handleInputChange}
      />
      <DatePicker
        label="Date"
        name="date"
        value={date}
        onSelect={handleDateChange}
      />
      {isCreating && (
        <CheckboxGroup
          className={styles.checkbox}
          renderCheckbox={() => (
            <Checkbox
              name="showPaidInvoices"
              label="Show paid invoices"
              checked={showPaidInvoices}
              onChange={handleCheckboxChange}
            />)
          }
        />
      )}
    </Columns>
  );
};

InvoicePaymentDetailOptions.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  customerId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isCreating: PropTypes.bool.isRequired,
  showPaidInvoices: PropTypes.bool.isRequired,
  onUpdateInvoicePaymentDetails: PropTypes.func.isRequired,
  onUpdateShowPaidInvoices: PropTypes.func.isRequired,
  onUpdateCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...getOptions(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailOptions);
