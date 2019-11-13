import {
  Combobox, DatePicker, DetailHeader, Input, RadioButtonGroup, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailOptions } from '../selectors/invoiceDetailSelectors';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import InvoiceDetailOnlinePaymentMethod from './InvoiceDetailOnlinePaymentMethod';
import InvoiceDetailOptionsPaymentTerms from './InvoiceDetailOptionsPaymentTerms';
import handleDateChange from '../../../components/handlers/handleDateChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleTextAreaChange from '../../../components/handlers/handleTextAreaChange';
import styles from './InvoiceDetailOptions.module.css';

const onComboBoxChange = handler => (option) => {
  const key = 'contactId';
  const { value } = option;

  handler({ key, value });
};

const onIsTaxInclusiveChange = handler => (e) => {
  handler({ key: 'isTaxInclusive', value: e.value === 'Tax inclusive' });
};

const onNoteChange = handler => ({ value }) => {
  handler({ key: 'note', value });
};

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
  isTaxInclusiveDisabled,
  onUpdateHeaderOptions,
  showOnlinePayment,
  onAddContactButtonClick,
}) => {
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
      />
      <span className={styles.address}>{address}</span>
      <Combobox
        name="note"
        label="Message to customer"
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
        label="Message to customer"
        hideLabel
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
        value={isTaxInclusive ? 'Tax inclusive' : 'Tax exclusive'}
        options={['Tax inclusive', 'Tax exclusive']}
        onChange={onIsTaxInclusiveChange(onUpdateHeaderOptions)}
        disabled={isTaxInclusiveDisabled}
      />
    </div>
  );

  return (
    <DetailHeader primary={primary} secondary={secondary} />
  );
};

const mapStateToProps = state => getInvoiceDetailOptions(state);

export default connect(mapStateToProps)(InvoiceDetailOptions);
