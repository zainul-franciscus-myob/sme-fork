import {
  Alert,
  DatePicker,
  DetailHeader,
  Input,
  RadioButtonGroup,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailOptions, getIsReadOnlyLayout, getReadOnlyMessage } from '../selectors/invoiceDetailSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import InvoiceDetailOnlinePaymentMethod from './InvoiceDetailOnlinePaymentMethod';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './InvoiceDetailOptions.module.css';

const InvoiceDetailOptions = ({
  contactId,
  invoiceNumber,
  address,
  purchaseOrderNumber,
  issueDate,
  expirationTerm,
  expirationDays,
  expirationTermOptions,
  isTaxInclusive,
  contactOptions,
  isCustomerDisabled,
  isSubmitting,
  showOnlinePayment,
  taxInclusiveLabel,
  taxExclusiveLabel,
  onUpdateHeaderOptions,
  onAddContactButtonClick,
  isReadOnlyLayout,
  readOnlyMessage,
}) => {
  const onComboBoxChange = handler => (option) => {
    const key = 'contactId';
    const { id: value } = option;

    handler({ key, value });
  };

  const onIsTaxInclusiveChange = handler => (e) => {
    handler({ key: 'isTaxInclusive', value: e.value === taxInclusiveLabel });
  };

  const requiredLabel = 'This is required';

  const billingAddress = address && (
    <ReadOnly label="Billing address" className={styles.address}>
      {address}
    </ReadOnly>
  );

  const primary = (
    <div>
      <CustomerCombobox
        items={contactOptions}
        selectedId={contactId}
        onChange={onComboBoxChange(onUpdateHeaderOptions)}
        addNewItem={{
          label: 'Create customer',
          onAddNew: onAddContactButtonClick,
        }}
        label="Customer"
        name="contactId"
        hideLabel={false}
        disabled={isCustomerDisabled || isReadOnlyLayout}
        requiredLabel={requiredLabel}
      />
      {billingAddress}
    </div>
  );

  const secondary = (
    <div>
      <Input
        name="invoiceNumber"
        label="Invoice number"
        value={invoiceNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        requiredLabel={requiredLabel}
        disabled={isReadOnlyLayout}
      />
      <Input
        name="purchaseOrderNumber"
        label="Customer PO number"
        value={purchaseOrderNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        maxLength={20}
        disabled={isReadOnlyLayout}
      />
      <DatePicker
        label="Issue date"
        requiredLabel={requiredLabel}
        name="issueDate"
        value={issueDate}
        disabled={isReadOnlyLayout}
        onSelect={handleDateChange('issueDate', onUpdateHeaderOptions)}
      />
      <PaymentTerms
        disabled={isReadOnlyLayout}
        onChange={onUpdateHeaderOptions}
        issueDate={issueDate}
        expirationTermOptions={expirationTermOptions}
        expirationDays={expirationDays}
        expirationTerm={expirationTerm}
      />
      {showOnlinePayment && (
        <InvoiceDetailOnlinePaymentMethod
          disabled={isReadOnlyLayout}
          onUpdateAllowOnlinePayments={onUpdateHeaderOptions}
        />
      )}
      <RadioButtonGroup
        label="Amounts are"
        name="isTaxInclusive"
        value={isTaxInclusive ? taxInclusiveLabel : taxExclusiveLabel}
        options={[taxInclusiveLabel, taxExclusiveLabel]}
        onChange={onIsTaxInclusiveChange(onUpdateHeaderOptions)}
        disabled={isSubmitting || isReadOnlyLayout}
      />
    </div>
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
  ...getInvoiceDetailOptions(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
  readOnlyMessage: getReadOnlyMessage(state),
});

export default connect(mapStateToProps)(InvoiceDetailOptions);
