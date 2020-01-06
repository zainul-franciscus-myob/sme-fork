import {
  DatePicker, DetailHeader, Input, ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getQuoteDetailOptions } from '../selectors/QuoteDetailSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './QuoteDetailOptions.module.css';

const onComboBoxChange = handler => (option) => {
  const key = 'contactId';
  const { value } = option;

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
        disabled={isCustomerDisabled}
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
        requiredLabel={requiredLabel}
      />
      <PaymentTerms
        onChange={onUpdateHeaderOptions}
        issueDate={issueDate}
        expirationTermOptions={expirationTermOptions}
        expirationDays={expirationDays}
        expirationTerm={expirationTerm}
        label="Expiry date"
        requiredLabel={requiredLabel}
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
    </Fragment>
  );

  return (
    <div className={styles.options}>
      <DetailHeader primary={primary} secondary={secondary} />
    </div>
  );
};

const mapStateToProps = state => getQuoteDetailOptions(state);

export default connect(mapStateToProps)(QuoteDetailOptions);
