import {
  Combobox, DatePicker, DetailHeader, Input, RadioButtonGroup, ReadOnly, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getQuoteOptions } from '../ServiceQuoteSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import ExpiryDate from '../../components/ExpiryDate';
import styles from './ServiceQuoteOptions.module.css';

const onComboBoxChange = handler => (option) => {
  const key = 'customerId';
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

const handleNoteChange = handler => ({ value }) => {
  handler({
    key: 'notesToCustomer',
    value,
  });
};

const handleTaxInclusiveChange = handler => (e) => {
  const value = e.value === 'Tax inclusive';

  handler({
    key: 'taxInclusive',
    value,
  });
};

const ServiceQuoteOptions = (props) => {
  const {
    customerOptions,
    customerId,
    quoteNumber,
    address,
    purchaseOrderNumber,
    issueDate,
    expirationTerm,
    expirationDays,
    taxInclusive,
    expirationTerms,
    notesToCustomer,
    onUpdateHeaderOptions,
    isCreating,
    comments,
    showExpiryDaysOptions,
    expirationTermsLabel,
    showExpirationDaysAmountInput,
    displayDaysForMonth,
    popoverLabel,
    customerLink,
    customerName,
    isCustomerLoading,
    onAddCustomerButtonClick,
  } = props;

  const customer = isCreating
    ? (
      <CustomerCombobox
        items={customerOptions}
        selectedId={customerId}
        onChange={onComboBoxChange(onUpdateHeaderOptions)}
        label="Customer"
        name="customerId"
        hideLabel={false}
        disabled={isCustomerLoading}
        addNewItem={{
          label: 'Create customer',
          onAddNew: onAddCustomerButtonClick,
        }}
      />
    )
    : <ReadOnly name="customer" label="Customer"><a href={customerLink}>{customerName}</a></ReadOnly>;

  const primary = (
    <Fragment>
      {customer}
      <span className={styles.address}>{address}</span>
      <Combobox
        name="note"
        label="Message to customer"
        hideLabel={false}
        metaData={[
          { columnName: 'value', showData: true },
        ]}
        items={comments}
        onChange={handleNoteChange(onUpdateHeaderOptions)}
      />
      <TextArea
        value={notesToCustomer}
        resize="vertical"
        name="notesToCustomer"
        label="Message to customer"
        hideLabel
        onChange={handleInputChange(onUpdateHeaderOptions)}
      />
    </Fragment>
  );

  const secondary = (
    <Fragment>
      <Input
        name="quoteNumber"
        label="Quote number"
        value={quoteNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
      />
      <Input
        name="purchaseOrderNumber"
        label="Customer PO number"
        value={purchaseOrderNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
      />
      <DatePicker
        label="Issue date"
        name="issueDate"
        value={issueDate}
        onSelect={handleIssueDateChange(onUpdateHeaderOptions)}
      />
      <ExpiryDate
        expirationTerm={expirationTerm}
        expirationTerms={expirationTerms}
        expirationDays={expirationDays}
        popoverLabel={popoverLabel}
        onChange={onUpdateHeaderOptions}
        showExpiryDaysOptions={showExpiryDaysOptions}
        expirationTermsLabel={expirationTermsLabel}
        showExpirationDaysAmountInput={showExpirationDaysAmountInput}
        displayDaysForMonth={displayDaysForMonth}
      />
      <RadioButtonGroup
        label="Amounts are"
        name="taxInclusive"
        value={taxInclusive}
        options={['Tax inclusive', 'Tax exclusive']}
        onChange={handleTaxInclusiveChange(onUpdateHeaderOptions)}
      />
    </Fragment>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = state => getQuoteOptions(state);

export default connect(mapStateToProps)(ServiceQuoteOptions);
