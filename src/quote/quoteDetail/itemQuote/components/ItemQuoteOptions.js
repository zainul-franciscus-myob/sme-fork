import {
  Combobox, DatePicker, DetailHeader, Input, RadioButtonGroup, ReadOnly, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import {
  getComments,
  getCustomerAddress,
  getCustomerId,
  getCustomerLink,
  getCustomerName,
  getCustomers,
  getDisplayDaysForMonth,
  getExpirationDays,
  getExpirationTerm,
  getExpirationTerms,
  getExpirationTermsLabel,
  getExpiredDate,
  getIsCalculating,
  getIsCreating,
  getIsTaxInclusive,
  getIssueDate,
  getNote,
  getPopoverLabel,
  getPurchaseOrder,
  getQuoteNumber,
  getShowExpirationDaysAmountInput,
  getShowExpiryDaysOptions,
} from '../ItemQuoteSelectors';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import ExpiryDate from '../../components/ExpiryDate';
import TaxState from '../TaxState';
import styles from './ItemQuoteOptions.module.css';

const onTextInputChange = handler => e => handler({
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

const onNoteChange = handler => ({ value }) => {
  handler({
    key: 'note',
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
  expirationDays,
  note,
  isCreating,
  isCalculating,
  onUpdateQuoteOption,
  comments,
  showExpiryDaysOptions,
  expirationTermsLabel,
  showExpirationDaysAmountInput,
  displayDaysForMonth,
  popoverLabel,
  customerLink,
  customerName,
}) => {
  const customer = isCreating
    ? (
      <ContactCombobox
        name="customerId"
        items={customers}
        selectedId={customerId}
        onChange={onCustomerChange(onUpdateQuoteOption)}
        label="Customer"
        hideLabel={false}
      />
    )
    : <ReadOnly name="customer" label="Customer"><a href={customerLink}>{customerName}</a></ReadOnly>;

  const primary = (
    <Fragment>
      {customer}
      <div className={styles.address}>{customerAddress}</div>
      <Combobox
        name="note"
        label="Message to customer"
        hideLabel={false}
        metaData={[
          { columnName: 'value', showData: true },
        ]}
        items={comments}
        onChange={onNoteChange(onUpdateQuoteOption)}
      />
      <TextArea
        value={note}
        resize="vertical"
        name="note"
        label="Message to customer"
        hideLabel
        onChange={onTextInputChange(onUpdateQuoteOption)}
        maxLength={255}
      />
    </Fragment>
  );

  const secondary = (
    <Fragment>
      <Input
        name="quoteNumber"
        label="Quote number"
        value={quoteNumber}
        onChange={onTextInputChange(onUpdateQuoteOption)}
      />
      <Input
        name="purchaseOrder"
        label="Customer PO number"
        value={purchaseOrder}
        onChange={onTextInputChange(onUpdateQuoteOption)}
        maxLength={20}
      />
      <DatePicker
        label="Issue date"
        name="issueDate"
        value={issueDate}
        onSelect={onDateChange(onUpdateQuoteOption, 'issueDate')}
      />
      <ExpiryDate
        expirationTerm={expirationTerm}
        expirationTerms={expirationTerms}
        expirationDays={expirationDays}
        popoverLabel={popoverLabel}
        onChange={onUpdateQuoteOption}
        showExpiryDaysOptions={showExpiryDaysOptions}
        expirationTermsLabel={expirationTermsLabel}
        showExpirationDaysAmountInput={showExpirationDaysAmountInput}
        displayDaysForMonth={displayDaysForMonth}
      />
      <RadioButtonGroup
        label="Amounts are"
        name="isTaxInclusive"
        value={isTaxInclusive}
        options={[TaxState.TAX_INCLUSIVE, TaxState.TAX_EXCLUSIVE]}
        onChange={onChangeTaxInclusive(onUpdateQuoteOption)}
        disabled={isCalculating}
      />
    </Fragment>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

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
  expirationDays: getExpirationDays(state),
  note: getNote(state),
  isTaxInclusive: getIsTaxInclusive(state),
  isCreating: getIsCreating(state),
  isCalculating: getIsCalculating(state),
  comments: getComments(state),
  showExpiryDaysOptions: getShowExpiryDaysOptions(state),
  expirationTermsLabel: getExpirationTermsLabel(state),
  showExpirationDaysAmountInput: getShowExpirationDaysAmountInput(state),
  displayDaysForMonth: getDisplayDaysForMonth(state),
  popoverLabel: getPopoverLabel(state),
  customerLink: getCustomerLink(state),
  customerName: getCustomerName(state),
});

export default connect(mapStateToProps)(ItemQuoteOptions);
