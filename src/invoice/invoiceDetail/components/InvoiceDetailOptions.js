import {
  Combobox, DatePicker, DetailHeader, Input, RadioButton, RadioButtonGroup, ReadOnly, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailOptions } from '../selectors/invoiceDetailSelectors';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import InvoiceDetailOnlinePaymentMethod from './InvoiceDetailOnlinePaymentMethod';
import InvoiceDetailOptionsPaymentTerms from './InvoiceDetailOptionsPaymentTerms';
import InvoiceLayout from '../InvoiceLayout';
import handleDateChange from '../../../components/handlers/handleDateChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleTextAreaChange from '../../../components/handlers/handleTextAreaChange';
import styles from './InvoiceDetailOptions.module.css';

const InvoiceDetailOptions = ({
  contactId,
  invoiceNumber,
  address,
  purchaseOrderNumber,
  issueDate,
  isTaxInclusive,
  note,
  contactOptions,
  commentOptions,
  isCustomerDisabled,
  isSubmitting,
  showOnlinePayment,
  taxInclusiveLabel,
  taxExclusiveLabel,
  layout,
  onUpdateHeaderOptions,
  onAddContactButtonClick,
  onUpdateInvoiceLayout,
}) => {
  const onComboBoxChange = handler => (option) => {
    const key = 'contactId';
    const { value } = option;

    handler({ key, value });
  };

  const onIsTaxInclusiveChange = handler => (e) => {
    handler({ key: 'isTaxInclusive', value: e.value === taxInclusiveLabel });
  };

  const onNoteChange = handler => ({ value }) => {
    handler({ key: 'note', value });
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
        disabled={isCustomerDisabled}
        requiredLabel={requiredLabel}
      />
      {billingAddress}
      <Combobox
        name="note"
        label="Notes to customer"
        hideLabel={false}
        metaData={[
          { columnName: 'value', showData: true },
        ]}
        items={commentOptions}
        onChange={onNoteChange(onUpdateHeaderOptions)}
      />
      <TextArea
        value={note}
        resize="vertical"
        name="note"
        label="Notes to customer"
        hideLabel
        rows={3}
        onChange={handleTextAreaChange(onUpdateHeaderOptions)}
        maxLength={255}
      />
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
      <InvoiceDetailOptionsPaymentTerms
        onUpdateInvoiceOption={onUpdateHeaderOptions}
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
      <RadioButtonGroup
        label="Layout"
        value={layout}
        onChange={onUpdateInvoiceLayout}
        disabled={isSubmitting}
        renderRadios={({ value, ...feelixProps }) => [
          <RadioButton
            {...feelixProps}
            checked={value === InvoiceLayout.SERVICE}
            value={InvoiceLayout.SERVICE}
            label="Service"
          />,
          <RadioButton
            {...feelixProps}
            checked={value === InvoiceLayout.ITEM}
            value={InvoiceLayout.ITEM}
            label="Item + Service"
          />,
        ]}
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
