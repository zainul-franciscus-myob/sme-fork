import {
  Columns,
  DatePicker,
  Input,
  RadioButtonGroup,
  Select,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceOptions,
} from '../invoiceItemSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import TaxState from '../enums/TaxState';
import styles from './InvoiceItemOptions.css';

const onTextInputChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const onSelectInputChange = onTextInputChange;

const onIssueDateChange = handler => ({ value }) => handler({
  key: 'issueDate',
  value,
});

const onCustomerChange = handler => ({ value }) => {
  handler({
    key: 'customerId',
    value,
  });
};

const onChangeTaxInclusive = handler => (e) => {
  const value = e.value === TaxState.taxInclusive;

  handler({
    key: 'isTaxInclusive',
    value,
  });
};

const onAmountInputChange = (name, handler) => (e) => {
  handler({
    key: name,
    value: e.target.rawValue,
  });
};

const InvoiceItemOptions = ({
  customers,
  purchaseOrderNumber,
  invoiceNumber,
  address,
  customerId,
  issueDate,
  expirationTerms,
  expirationTerm,
  note,
  taxInclusiveOption,
  expiredDate,
  expirationDays,
  isCreating,
  isTaxInclusiveDisabled,
  onUpdateInvoiceOption,
  onUpdateTaxInclusive,
}) => (
  <Columns type="three">
    <CustomerCombobox
      items={customers}
      selectedId={customerId}
      onChange={onCustomerChange(onUpdateInvoiceOption)}
      label="Customer"
      name="customerId"
      hideLabel={false}
      disabled={!isCreating}
    />

    <Input
      name="invoiceNumber"
      label="Invoice number"
      value={invoiceNumber}
      onChange={onTextInputChange(onUpdateInvoiceOption)}
    />

    <Input
      name="purchaseOrderNumber"
      label="Purchase order"
      value={purchaseOrderNumber}
      onChange={onTextInputChange(onUpdateInvoiceOption)}
      maxLength={20}
    />

    <div className={styles.address}>{address}</div>

    <DatePicker
      label="Date of issue"
      name="issueDate"
      value={issueDate}
      onSelect={onIssueDateChange(onUpdateInvoiceOption)}
    />

    <RadioButtonGroup
      label="Amounts are"
      name="taxInclusiveOption"
      value={taxInclusiveOption}
      options={[TaxState.taxInclusive, TaxState.taxExclusive]}
      onChange={onChangeTaxInclusive(onUpdateTaxInclusive)}
      disabled={isTaxInclusiveDisabled}
    />

    <Select
      name="expirationTerm"
      label="Expiration term"
      value={expirationTerm}
      onChange={onSelectInputChange(onUpdateInvoiceOption)}
    >
      {expirationTerms.map(({ name, value }) => (
        <Select.Option key={value} value={value} label={name} />
      ))}
    </Select>

    <AmountInput
      name="expirationDays"
      label="Expiration days"
      value={expirationDays}
      onChange={onAmountInputChange('expirationDays', onUpdateInvoiceOption)}
    />

    <Input
      name="expiredDate"
      label="Expired date"
      value={expiredDate}
      disabled
    />

    <TextArea
      value={note}
      resize="vertical"
      name="note"
      label="Notes to customer"
      onChange={onTextInputChange(onUpdateInvoiceOption)}
      maxLength={255}
    />
  </Columns>
);

const mapStateToProps = state => getInvoiceOptions(state);

export default connect(mapStateToProps)(InvoiceItemOptions);
