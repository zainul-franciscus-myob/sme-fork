import {
  Columns, DatePicker, Input, RadioButtonGroup, Select, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCustomerAddress,
  getCustomerId,
  getCustomers,
  getExpirationDays,
  getExpirationTerm,
  getExpirationTerms,
  getExpiredDate,
  getIsCalculating,
  getIsCreating,
  getIsTaxInclusive,
  getIssueDate,
  getNote,
  getPurchaseOrder,
  getQuoteNumber,
} from '../ItemQuoteSelectors';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import TaxState from '../TaxState';
import styles from './ItemQuoteOptions.css';

const onTextInputChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const onExpirationTermChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const onDateChange = (handler, key) => ({ value }) => handler({
  key,
  value,
});

const onCustomerChange = handler => (option) => {
  const key = 'customerId';
  const { id } = option;

  handler({
    key,
    value: id,
  });
};

const onChangeTaxInclusive = handler => (e) => {
  const value = e.value === TaxState.TAX_INCLUSIVE.toString();

  handler({
    key: 'isTaxInclusive',
    value,
  });
};

const ItemQuoteOptions = ({
  customers,
  customerId,
  customerAddress,
  quoteNumber,
  purchaseOrder,
  issueDate,
  isTaxInclusive,
  expirationTerms,
  expirationTerm,
  expirationDay,
  expiredDate,
  note,
  isCreating,
  isCalculating,
  onUpdateQuoteOption,
}) => (
  <Columns type="three">
    <ContactCombobox
      name="customerId"
      items={customers}
      selectedId={customerId}
      onChange={onCustomerChange(onUpdateQuoteOption)}
      label="Customer"
      hideLabel={false}
      disabled={!isCreating}
    />
    <Input
      name="quoteNumber"
      label="Quote number"
      value={quoteNumber}
      onChange={onTextInputChange(onUpdateQuoteOption)}
    />
    <Input
      name="purchaseOrder"
      label="Purchase order"
      value={purchaseOrder}
      onChange={onTextInputChange(onUpdateQuoteOption)}
      maxLength={20}
    />
    <div className={styles.address}>{customerAddress}</div>
    <DatePicker
      label="Date of issue"
      name="issueDate"
      value={issueDate}
      onSelect={onDateChange(onUpdateQuoteOption, 'issueDate')}
    />
    <RadioButtonGroup
      label="Amounts are"
      name="isTaxInclusive"
      value={isTaxInclusive}
      options={[TaxState.TAX_INCLUSIVE, TaxState.TAX_EXCLUSIVE]}
      onChange={onChangeTaxInclusive(onUpdateQuoteOption)}
      disabled={isCalculating}
    />
    <Select
      name="expirationTerm"
      label="Expiration term"
      value={expirationTerm}
      onChange={onExpirationTermChange(onUpdateQuoteOption)}
    >
      {expirationTerms.map(({ name, value }) => (
        <Select.Option key={value} value={value} label={name} />
      ))}
    </Select>
    <Input
      name="expirationDays"
      label="Expiration days"
      onChange={onTextInputChange(onUpdateQuoteOption)}
      value={expirationDay}
      type="number"
    />
    <DatePicker
      label="Expired date"
      name="expiredDate"
      value={expiredDate}
      disabled
    />
    <TextArea
      value={note}
      resize="vertical"
      name="note"
      label="Notes to customer"
      onChange={onTextInputChange(onUpdateQuoteOption)}
      maxLength={255}
    />
  </Columns>
);

const mapStateToProps = state => ({
  customers: getCustomers(state),
  quoteNumber: getQuoteNumber(state),
  purchaseOrder: getPurchaseOrder(state),
  customerId: getCustomerId(state),
  customerAddress: getCustomerAddress(state),
  issueDate: getIssueDate(state),
  expirationTerms: getExpirationTerms(state),
  expirationTerm: getExpirationTerm(state),
  expiredDate: getExpiredDate(state),
  expirationDay: getExpirationDays(state),
  note: getNote(state),
  isTaxInclusive: getIsTaxInclusive(state),
  isCreating: getIsCreating(state),
  isCalculating: getIsCalculating(state),
});

export default connect(mapStateToProps)(ItemQuoteOptions);
