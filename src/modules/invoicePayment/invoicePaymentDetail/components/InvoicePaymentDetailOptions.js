import {
  DatePicker, DetailHeader, Input, TextArea,
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
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleDatePickerChange from '../../../../components/handlers/handleDatePickerChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const requiredLabel = 'Required';

const handleCustomerComboBoxChange = handler => ({ id }) => handler(id);

const InvoicePaymentDetailOptions = ({
  customers,
  customerId,
  accounts,
  accountId,
  referenceId,
  description,
  date,
  isCreating,
  onUpdateInvoicePaymentDetails,
  onUpdateCustomer,
  wasRedirectedFromInvoiceDetail,
}) => {
  const primary = (
    <div>
      <ContactCombobox
        label="Customer"
        name="customer"
        hideLabel={false}
        requiredLabel={isCreating ? requiredLabel : ''}
        items={customers}
        selectedId={customerId}
        onChange={handleCustomerComboBoxChange(onUpdateCustomer)}
        disabled={!isCreating || wasRedirectedFromInvoiceDetail}
      />
      <AccountCombobox
        label="Bank account"
        hideLabel={false}
        onChange={handleComboboxChange('accountId', onUpdateInvoicePaymentDetails)}
        selectedId={accountId}
        items={accounts}
      />
      <TextArea
        label="Description of transaction"
        name="description"
        autoSize
        resize="vertical"
        value={description}
        rows={1}
        onChange={handleInputChange(onUpdateInvoicePaymentDetails)}
      />
    </div>
  );

  const secondary = (
    <div>
      <Input
        label="Reference number"
        requiredLabel={requiredLabel}
        name="referenceId"
        maxLength={8}
        value={referenceId}
        onChange={handleInputChange(onUpdateInvoicePaymentDetails)}
      />
      <DatePicker
        label="Date"
        requiredLabel={requiredLabel}
        name="date"
        value={date}
        onSelect={handleDatePickerChange(onUpdateInvoicePaymentDetails, 'date')}
      />
    </div>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = state => ({
  ...getOptions(state),
  isCreating: getIsCreating(state),
  wasRedirectedFromInvoiceDetail: getWasRedirectedFromInvoiceDetail(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailOptions);
