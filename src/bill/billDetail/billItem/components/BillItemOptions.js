import {
  Checkbox,
  Columns,
  DatePicker,
  Input,
  RadioButtonGroup,
  Select,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAreLinesCalculating,
  getBillNumber,
  getExpirationDays,
  getExpirationTerm,
  getExpirationTerms,
  getExpiredDate,
  getInvoiceNumber,
  getIsCreating,
  getIsReportable,
  getIsTaxInclusive,
  getIssueDate,
  getNote,
  getSupplierAddress,
  getSupplierId,
  getSuppliers,
} from '../billItemSelectors';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import TaxState from '../TaxState';
import styles from './BillItemOptions.module.css';

const onTextInputChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const onDateChange = (handler, key) => ({ value }) => handler({
  key,
  value,
});

const onSupplierChange = handler => (option) => {
  const key = 'supplierId';
  const { id } = option;

  handler({
    key,
    value: id,
  });
};

const onIsReportableChange = handler => (e) => {
  handler({
    key: 'isReportable',
    value: e.target.checked,
  });
};

const onChangeTaxInclusive = handler => (e) => {
  const value = e.value === TaxState.TaxInclusive.toString();

  handler({
    key: 'isTaxInclusive',
    value,
  });
};

const BillItemOptions = ({
  suppliers,
  billNumber,
  invoiceNumber,
  supplierAddress,
  supplierId,
  issueDate,
  expirationTerms,
  expirationTerm,
  note,
  isReportable,
  isTaxInclusive,
  expiredDate,
  expirationDay,
  isCreating,
  onUpdateBillOption,
  onUpdateTaxInclusive,
  isTaxInclusiveDisabled,
}) => (
  <Columns type="three">
    <ContactCombobox
      items={suppliers}
      selectedId={supplierId}
      onChange={onSupplierChange(onUpdateBillOption)}
      label="Supplier"
      name="supplierId"
      hideLabel={false}
      disabled={!isCreating}
    />
    <Input
      name="billNumber"
      label="Bill number"
      value={billNumber}
      onChange={onTextInputChange(onUpdateBillOption)}
    />
    <Input
      name="invoiceNumber"
      label="Invoice number"
      value={invoiceNumber}
      onChange={onTextInputChange(onUpdateBillOption)}
    />
    <div className={styles.address}>{supplierAddress}</div>
    <DatePicker
      label="Date of issue"
      name="issueDate"
      value={issueDate}
      onSelect={onDateChange(onUpdateBillOption, 'issueDate')}
    />
    <RadioButtonGroup
      label="Amounts are"
      name="isTaxInclusive"
      value={isTaxInclusive}
      options={[TaxState.TaxInclusive, TaxState.TaxExclusive]}
      onChange={onChangeTaxInclusive(onUpdateTaxInclusive)}
      disabled={isTaxInclusiveDisabled}
    />
    <Select
      name="expirationTerm"
      label="Expiration term"
      value={expirationTerm}
      onChange={onTextInputChange(onUpdateBillOption)}
    >
      {expirationTerms.map(({ name, value }) => (
        <Select.Option key={value} value={value} label={name} />
      ))}
    </Select>
    <Input
      name="expirationDays"
      label="Expiration days"
      onChange={onTextInputChange(onUpdateBillOption)}
      value={expirationDay}
      type="number"
    />
    <DatePicker
      label="Expired date"
      name="expiredDate"
      value={expiredDate}
      disabled
    />
    <TextArea
      value={note}
      resize="vertical"
      name="note"
      label="Notes to supplier"
      onChange={onTextInputChange(onUpdateBillOption)}
    />
    <div className={styles.checkbox}>
      <Checkbox
        name="isReportable"
        label="Reportable"
        checked={isReportable}
        onChange={onIsReportableChange(onUpdateBillOption)}
      />
    </div>
  </Columns>
);

const mapStateToProps = state => ({
  suppliers: getSuppliers(state),
  billNumber: getBillNumber(state),
  invoiceNumber: getInvoiceNumber(state),
  supplierId: getSupplierId(state),
  supplierAddress: getSupplierAddress(state),
  issueDate: getIssueDate(state),
  expirationTerms: getExpirationTerms(state),
  expirationTerm: getExpirationTerm(state),
  expiredDate: getExpiredDate(state),
  expirationDay: getExpirationDays(state),
  note: getNote(state),
  isReportable: getIsReportable(state),
  isTaxInclusive: getIsTaxInclusive(state),
  isCreating: getIsCreating(state),
  isTaxInclusiveDisabled: getAreLinesCalculating(state),
});

export default connect(mapStateToProps)(BillItemOptions);
