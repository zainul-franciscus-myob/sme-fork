import {
  Checkbox, CheckboxGroup, Columns, DatePicker, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreating,
  getOptions,
  getWasRedirectedFromInvoiceDetail,
} from '../invoicePaymentDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
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
  wasRedirectedFromInvoiceDetail,
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
        disabled={!isCreating || wasRedirectedFromInvoiceDetail}
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

const mapStateToProps = state => ({
  ...getOptions(state),
  isCreating: getIsCreating(state),
  wasRedirectedFromInvoiceDetail: getWasRedirectedFromInvoiceDetail(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailOptions);