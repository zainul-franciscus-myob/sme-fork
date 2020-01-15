import {
  DatePicker,
  DetailHeader,
  Input,
  RadioButtonGroup,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailOptions } from '../selectors/invoiceDetailSelectors';
import CustomerAutoComplete from '../../../../components/AutoComplete/CustomerAutoComplete';
import InvoiceDetailOnlinePaymentMethod from './InvoiceDetailOnlinePaymentMethod';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './InvoiceDetailOptions.module.css';

const InvoiceDetailOptions = ({
  invoiceNumber,
  address,
  purchaseOrderNumber,
  issueDate,
  expirationTerm,
  expirationDays,
  expirationTermOptions,
  isTaxInclusive,
  isCustomerDisabled,
  isSubmitting,
  showOnlinePayment,
  taxInclusiveLabel,
  taxExclusiveLabel,
  selectedContact,
  onUpdateHeaderOptions,
  onAddContactButtonClick,
  onLoadContacts,
}) => {
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
      <CustomerAutoComplete
        selectedItem={selectedContact}
        onChange={handleAutoCompleteChange('contactId', onUpdateHeaderOptions)}
        onLoad={onLoadContacts}
        addNewCustomer={onAddContactButtonClick}
        label="Customer"
        name="contactId"
        hideLabel={false}
        disabled={isCustomerDisabled}
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
      />
      <Input
        name="purchaseOrderNumber"
        label="Customer PO Number"
        value={purchaseOrderNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        maxLength={20}
      />
      <DatePicker
        label="Issue date"
        requiredLabel={requiredLabel}
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
      {showOnlinePayment && (
        <InvoiceDetailOnlinePaymentMethod
          onUpdateAllowOnlinePayments={onUpdateHeaderOptions}
        />
      )}
      <RadioButtonGroup
        label="Amounts are"
        name="isTaxInclusive"
        value={isTaxInclusive ? taxInclusiveLabel : taxExclusiveLabel}
        options={[taxInclusiveLabel, taxExclusiveLabel]}
        onChange={onIsTaxInclusiveChange(onUpdateHeaderOptions)}
        disabled={isSubmitting}
      />
    </div>
  );

  return (
    <div className={styles.options}>
      <DetailHeader primary={primary} secondary={secondary} />
    </div>
  );
};

const mapStateToProps = state => getInvoiceDetailOptions(state);

export default connect(mapStateToProps)(InvoiceDetailOptions);
