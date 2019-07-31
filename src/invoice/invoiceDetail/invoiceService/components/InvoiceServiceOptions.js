import {
  DatePicker, DetailHeader, Input, RadioButtonGroup, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getComments, getInvoiceOptions } from '../invoiceServiceSelectors';
import Combobox from '../../../../components/Feelix/ComboBox/Combobox';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import InvoiceDetailOnlinePaymentMethod from '../../components/InvoiceDetailOnlinePaymentMethod';
import InvoiceServicePaymentTerms from './InvoiceServicePaymentTerms';
import styles from './InvoiceServiceOptions.module.css';

const onComboBoxChange = handler => (option) => {
  const key = 'contactId';
  const { value } = option;

  handler({ key, value });
};

const handleInputChange = handler => (e) => {
  const { name, value } = e.target;

  handler({ key: name, value });
};

const handleIssueDateChange = handler => ({ value }) => {
  const key = 'issueDate';

  handler({ key, value });
};

const onChangeTaxInclusive = handler => (e) => {
  handler({
    key: 'taxInclusive',
    value: e.value === 'Tax inclusive',
  });
};

const onNoteChange = handler => ({ value }) => {
  handler({
    key: 'notes',
    value,
  });
};

const InvoiceServiceOptions = ({
  invoiceOptions: {
    contactOptions,
    contactId,
    number,
    address,
    orderNumber,
    issueDate,
    expirationTerm,
    expirationDays,
    taxInclusive,
    expirationTermOptions,
    setUpOnlinePaymentsLink,
    notes,
    isCreating,
    hasSetUpOnlinePayments,
    isAllowOnlinePayments,
  },
  onUpdateHeaderOptions,
  comments,
}) => {
  const primary = (
    <div>
      <CustomerCombobox
        items={contactOptions}
        selectedId={contactId}
        onChange={onComboBoxChange(onUpdateHeaderOptions)}
        label="Customer"
        name="contactId"
        hideLabel={false}
        disabled={!isCreating}
      />
      <span className={styles.address}>{address}</span>
      <Combobox
        name="note"
        label="Message to customer"
        hideLabel={false}
        metaData={[
          { columnName: 'value', showData: true },
        ]}
        items={comments}
        onChange={onNoteChange(onUpdateHeaderOptions)}
      />
      <TextArea
        value={notes}
        resize="vertical"
        name="notes"
        label="Notes to customer"
        hideLabel
        onChange={handleInputChange(onUpdateHeaderOptions)}
        maxLength={255}
      />
    </div>
  );

  const secondary = (
    <div>
      <Input
        name="number"
        label="Invoice number"
        value={number}
        onChange={handleInputChange(onUpdateHeaderOptions)}
      />
      <Input
        name="orderNumber"
        label="Purchase order"
        value={orderNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        maxLength={20}
      />
      <DatePicker
        label="Date of issue"
        name="issueDate"
        value={issueDate}
        onSelect={handleIssueDateChange(onUpdateHeaderOptions)}
      />

      <InvoiceServicePaymentTerms
        expirationTerm={expirationTerm}
        expirationTerms={expirationTermOptions}
        expirationDays={expirationDays}
        onUpdateInvoiceOption={onUpdateHeaderOptions}
      />

      <InvoiceDetailOnlinePaymentMethod
        hasSetUpOnlinePayments={hasSetUpOnlinePayments}
        isAllowOnlinePayments={isAllowOnlinePayments}
        setUpOnlinePaymentsLink={setUpOnlinePaymentsLink}
        onUpdateAllowOnlinePayments={onUpdateHeaderOptions}
      />

      <RadioButtonGroup
        label="Amounts are"
        name="taxInclusive"
        value={taxInclusive ? 'Tax inclusive' : 'Tax exclusive'}
        options={['Tax inclusive', 'Tax exclusive']}
        onChange={onChangeTaxInclusive(onUpdateHeaderOptions)}
      />
    </div>
  );

  return (
    <DetailHeader primary={primary} secondary={secondary} />
  );
};

const mapStateToProps = state => ({
  invoiceOptions: getInvoiceOptions(state),
  comments: getComments(state),
});

export default connect(mapStateToProps)(InvoiceServiceOptions);
