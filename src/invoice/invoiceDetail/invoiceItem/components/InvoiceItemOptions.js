import {
  DatePicker,
  DetailHeader,
  Input,
  RadioButtonGroup,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getComments,
  getInvoiceOptions,
} from '../invoiceItemSelectors';
import Combobox from '../../../../components/Feelix/ComboBox/Combobox';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import InvoiceItemPaymentTerms from './InvoiceItemPaymentTerms';
import TaxState from '../enums/TaxState';
import styles from './InvoiceItemOptions.module.css';

const onTextInputChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const onIssueDateChange = handler => ({ value }) => handler({
  key: 'issueDate',
  value,
});

const onCustomerChange = handler => ({ value }) => {
  handler({
    key: 'customerId',
    value,
  });
};

const onNoteChange = handler => ({ value }) => {
  handler({
    key: 'note',
    value,
  });
};

const onChangeTaxInclusive = handler => (e) => {
  const value = e.value === TaxState.taxInclusive;

  handler({
    key: 'isTaxInclusive',
    value,
  });
};


const InvoiceItemOptions = ({
  invoiceOptions: {
    customers,
    purchaseOrderNumber,
    invoiceNumber,
    address,
    customerId,
    issueDate,
    note,
    taxInclusiveOption,
    isCreating,
    isTaxInclusiveDisabled,
  },
  onUpdateInvoiceOption,
  onUpdateTaxInclusive,
  comments,
}) => {
  const primary = (
    <div>
      <CustomerCombobox
        items={customers}
        selectedId={customerId}
        onChange={onCustomerChange(onUpdateInvoiceOption)}
        label="Customer"
        name="customerId"
        hideLabel={false}
        disabled={!isCreating}
      />
      <div className={styles.address}>{address}</div>
      <Combobox
        name="note"
        label="Notes to customer"
        hideLabel={false}
        metaData={[
          { columnName: 'value', showData: true },
        ]}
        items={comments}
        onChange={onNoteChange(onUpdateInvoiceOption)}
      />
      <TextArea
        value={note}
        resize="vertical"
        name="note"
        label=""
        onChange={onTextInputChange(onUpdateInvoiceOption)}
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
        onChange={onTextInputChange(onUpdateInvoiceOption)}
      />
      <Input
        name="purchaseOrderNumber"
        label="Purchase Order"
        value={purchaseOrderNumber}
        onChange={onTextInputChange(onUpdateInvoiceOption)}
        maxLength={20}
      />
      <DatePicker
        label="Date of issue"
        name="issueDate"
        value={issueDate}
        onSelect={onIssueDateChange(onUpdateInvoiceOption)}
      />
      <InvoiceItemPaymentTerms onUpdateInvoiceOption={onUpdateInvoiceOption} />
      <RadioButtonGroup
        label="Amounts are"
        name="taxInclusiveOption"
        value={taxInclusiveOption}
        options={[TaxState.taxInclusive, TaxState.taxExclusive]}
        onChange={onChangeTaxInclusive(onUpdateTaxInclusive)}
        disabled={isTaxInclusiveDisabled}
      />
    </div>
  );

  return (
    <DetailHeader primary={primary} secondary={secondary} />
  );
};

const mapStateToProps = state => ({
  invoiceOptions: getInvoiceOptions(state),
  comments: getComments(state),
});

export default connect(mapStateToProps)(InvoiceItemOptions);
