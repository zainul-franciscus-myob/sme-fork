import {
  Alert,
  DetailHeader,
  Input,
  RadioButtonGroup,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceDetailOptions,
  getIsPreConversion,
  getIsReadOnlyLayout,
  getReadOnlyMessage,
  getShowPreConversionAlert,
} from '../selectors/invoiceDetailSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import DatePicker from '../../../../components/DatePicker/DatePicker';
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
  onIssueDateBlur,
  onAddContactButtonClick,
  isReadOnlyLayout,
  readOnlyMessage,
  isPreConversion,
  showPreConversionAlert,
  onDismissPreConversionAlert,
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
        maxLength={13}
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
        value={issueDate}
        disabled={isReadOnlyLayout || isPreConversion}
        disabledMessage="You can't change the date of a historical invoice."
        onSelect={handleDateChange('issueDate', onUpdateHeaderOptions)}
        onBlur={onIssueDateBlur}
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
        disabled={isSubmitting || isReadOnlyLayout || isPreConversion}
      />
    </div>
  );

  const preConversionAlert = showPreConversionAlert && (
    <Alert type="info" onDismiss={onDismissPreConversionAlert}>
      {
        `Invoices dated before your opening balance month will not automatically update account balances.
        Remember to include the invoice amounts in the respective account's opening balance`
      }
    </Alert>
  );

  const readOnlyWarning = (
    <Alert type="info">
      {readOnlyMessage}
    </Alert>
  );

  return (
    <div className={styles.options}>
      {isReadOnlyLayout && readOnlyWarning}
      {preConversionAlert}
      <DetailHeader primary={primary} secondary={secondary} />
    </div>
  );
};

const mapStateToProps = state => ({
  ...getInvoiceDetailOptions(state),
  readOnlyMessage: getReadOnlyMessage(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
  isPreConversion: getIsPreConversion(state),
  showPreConversionAlert: getShowPreConversionAlert(state),
});

export default connect(mapStateToProps)(InvoiceDetailOptions);
