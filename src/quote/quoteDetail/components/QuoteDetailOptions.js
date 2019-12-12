import {
  Combobox, DatePicker, DetailHeader, Input, RadioButton, RadioButtonGroup, ReadOnly, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getQuoteDetailOptions } from '../selectors/QuoteDetailSelectors';
import BooleanRadioButtonGroup from '../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import PaymentTerms from '../../../components/PaymentTerms/PaymentTerms';
import QuoteLayout from '../QuoteLayout';
import handleDateChange from '../../../components/handlers/handleDateChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import styles from './QuoteDetailOptions.module.css';

const onComboBoxChange = handler => (option) => {
  const key = 'contactId';
  const { value } = option;

  handler({ key, value });
};

const handleNoteChange = handler => ({ value }) => {
  handler({
    key: 'note',
    value,
  });
};

const QuoteDetailOptions = (props) => {
  const {
    layout,
    contactId,
    contactName,
    address,
    quoteNumber,
    purchaseOrderNumber,
    issueDate,
    expirationTerm,
    expirationDays,
    expirationTermOptions,
    isTaxInclusive,
    note,
    contactOptions,
    commentOptions,
    isCreating,
    isCalculating,
    isContactLoading,
    contactLink,
    taxInclusiveLabel,
    taxExclusiveLabel,
    onUpdateHeaderOptions,
    onUpdateLayout,
    onAddCustomerButtonClick,
  } = props;

  const customer = isCreating
    ? (
      <CustomerCombobox
        items={contactOptions}
        selectedId={contactId}
        onChange={onComboBoxChange(onUpdateHeaderOptions)}
        label="Customer"
        name="contactId"
        hideLabel={false}
        disabled={isContactLoading}
        addNewItem={{
          label: 'Create customer',
          onAddNew: onAddCustomerButtonClick,
        }}
      />
    )
    : <ReadOnly name="customer" label="Customer"><a href={contactLink}>{contactName}</a></ReadOnly>;

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
        items={commentOptions}
        onChange={handleNoteChange(onUpdateHeaderOptions)}
      />
      <TextArea
        value={note}
        resize="vertical"
        name="note"
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
        onSelect={handleDateChange('issueDate', onUpdateHeaderOptions)}
      />
      <PaymentTerms
        onChange={onUpdateHeaderOptions}
        issueDate={issueDate}
        expirationTermOptions={expirationTermOptions}
        expirationDays={expirationDays}
        expirationTerm={expirationTerm}
      />
      <BooleanRadioButtonGroup
        name="isTaxInclusive"
        label="Amounts are"
        value={isTaxInclusive}
        trueLabel={taxInclusiveLabel}
        falseLabel={taxExclusiveLabel}
        handler={onUpdateHeaderOptions}
        disabled={isCalculating}
      />
      <RadioButtonGroup
        name="layout"
        label="Layout"
        value={layout}
        disabled={isCalculating}
        onChange={handleRadioButtonChange('layout', onUpdateLayout)}
        renderRadios={({ value, ...feelixProps }) => [
          <RadioButton
            {...feelixProps}
            checked={value === QuoteLayout.SERVICE}
            value={QuoteLayout.SERVICE}
            label="Service"
          />,
          <RadioButton
            {...feelixProps}
            checked={value === QuoteLayout.ITEM_AND_SERVICE}
            value={QuoteLayout.ITEM_AND_SERVICE}
            label="Item + Service"
          />,
        ]}
      />
    </Fragment>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = state => getQuoteDetailOptions(state);

export default connect(mapStateToProps)(QuoteDetailOptions);
