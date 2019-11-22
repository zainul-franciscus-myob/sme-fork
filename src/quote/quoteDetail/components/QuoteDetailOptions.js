import {
  Combobox, DatePicker, DetailHeader, Input, ReadOnly, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getQuoteDetailOptions } from '../selectors/QuoteDetailSelectors';
import BooleanRadioButtonGroup from '../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import QuoteDetailOnlinePaymentMethod from './QuoteDetailOnlinePaymentMethod';
import handleDateChange from '../../../components/handlers/handleDateChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
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
    contactId,
    contactName,
    address,
    quoteNumber,
    purchaseOrderNumber,
    issueDate,
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
      <QuoteDetailOnlinePaymentMethod onChange={onUpdateHeaderOptions} />
      <BooleanRadioButtonGroup
        name="isTaxInclusive"
        label="Amounts are"
        value={isTaxInclusive}
        trueLabel={taxInclusiveLabel}
        falseLabel={taxExclusiveLabel}
        handler={onUpdateHeaderOptions}
        disabled={isCalculating}
      />
    </Fragment>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = state => getQuoteDetailOptions(state);

export default connect(mapStateToProps)(QuoteDetailOptions);
