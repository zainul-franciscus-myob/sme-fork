import {
  Alert,
  DatePicker,
  DetailHeader,
  Input,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getIsReadOnlyLayout, getQuoteDetailOptions, getReadOnlyMessage } from '../selectors/QuoteDetailSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './QuoteDetailOptions.module.css';

const onComboBoxChange = handler => (option) => {
  const key = 'contactId';
  const { id: value } = option;

  handler({ key, value });
};

const requiredLabel = 'Required';

const QuoteDetailOptions = (props) => {
  const {
    contactId,
    address,
    quoteNumber,
    purchaseOrderNumber,
    issueDate,
    expirationTerm,
    expirationDays,
    expirationTermOptions,
    isTaxInclusive,
    contactOptions,
    isCalculating,
    isCustomerDisabled,
    isReadOnlyLayout,
    readOnlyMessage,
    taxInclusiveLabel,
    taxExclusiveLabel,
    onUpdateHeaderOptions,
    onAddCustomerButtonClick,
  } = props;

  const primary = (
    <Fragment>
      <CustomerCombobox
        items={contactOptions}
        selectedId={contactId}
        onChange={onComboBoxChange(onUpdateHeaderOptions)}
        label="Customer"
        name="contactId"
        hideLabel={false}
        disabled={isCustomerDisabled || isReadOnlyLayout}
        addNewItem={{
          label: 'Create customer',
          onAddNew: onAddCustomerButtonClick,
        }}
        requiredLabel={requiredLabel}
      />
      { address && <ReadOnly className={styles.address} label="Billing address">{address}</ReadOnly> }
    </Fragment>
  );

  const secondary = (
    <Fragment>
      <Input
        name="quoteNumber"
        label="Quote number"
        value={quoteNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        requiredLabel={requiredLabel}
        disabled={isReadOnlyLayout}
      />
      <Input
        name="purchaseOrderNumber"
        label="Customer PO number"
        value={purchaseOrderNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        disabled={isReadOnlyLayout}
      />
      <DatePicker
        label="Issue date"
        name="issueDate"
        value={issueDate}
        onSelect={handleDateChange('issueDate', onUpdateHeaderOptions)}
        requiredLabel={requiredLabel}
        disabled={isReadOnlyLayout}
      />
      <PaymentTerms
        onChange={onUpdateHeaderOptions}
        issueDate={issueDate}
        expirationTermOptions={expirationTermOptions}
        expirationDays={expirationDays}
        expirationTerm={expirationTerm}
        label="Expiry date"
        popoverLabel="Quote expires"
        requiredLabel={requiredLabel}
        disabled={isReadOnlyLayout}
      />
      <BooleanRadioButtonGroup
        name="isTaxInclusive"
        label="Amounts are"
        value={isTaxInclusive}
        trueLabel={taxInclusiveLabel}
        falseLabel={taxExclusiveLabel}
        handler={onUpdateHeaderOptions}
        disabled={isCalculating || isReadOnlyLayout}
      />
    </Fragment>
  );

  const readOnlyWarning = (
    <Alert type="info">
      {readOnlyMessage}
    </Alert>
  );

  return (
    <div className={styles.options}>
      { isReadOnlyLayout && readOnlyWarning }
      <DetailHeader primary={primary} secondary={secondary} />
    </div>
  );
};

const mapStateToProps = state => ({
  ...getQuoteDetailOptions(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
  readOnlyMessage: getReadOnlyMessage(state),
});

export default connect(mapStateToProps)(QuoteDetailOptions);
