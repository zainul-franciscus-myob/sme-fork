import {
  Checkbox, Columns, DatePicker, Input, ReadOnly, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDate,
  getDebitAmount,
  getDescription,
  getIncludeClosedPurchases,
  getIsCreating,
  getReferenceId,
  getSupplierName,
} from '../SupplierReturnPurchaseSelector';
import styles from './SupplierReturnPurchaseOptions.module.css';

const onCheckBoxChange = handler => ({ target }) => {
  const { name, checked } = target;
  handler({ key: name, value: checked });
};

const onTextFieldChange = handler => ({ target }) => {
  const { name, value } = target;
  handler({ key: name, value });
};

const onDateChange = handler => ({ value }) => handler({ key: 'date', value });

const SupplierReturnPurchaseOptions = ({
  supplierName,
  debitAmount,
  referenceId,
  description,
  date,
  includeClosedPurchases,
  isCreating,
  onUpdatePurchaseOptions,
}) => (
  <Columns type="two">
    <div>
      <ReadOnly name="supplierName" label="Supplier">{supplierName}</ReadOnly>
      {isCreating
      && (
        <ReadOnly name="debitAmount" label="Debit Amount">{debitAmount}</ReadOnly>
      )
      }
    </div>
    <Input
      name="referenceId"
      label="Reference"
      value={referenceId}
      onChange={onTextFieldChange(onUpdatePurchaseOptions)}
      disabled={!isCreating}
    />
    <TextArea
      value={description}
      resize="vertical"
      name="description"
      label="Description"
      onChange={onTextFieldChange(onUpdatePurchaseOptions)}
      disabled={!isCreating}
    />
    <DatePicker
      label="Date"
      name="date"
      value={date}
      onSelect={onDateChange(onUpdatePurchaseOptions)}
      disabled={!isCreating}
    />
    <div className={styles.checkbox}>
      <Checkbox
        name="includeClosedPurchases"
        label="Include closed purchases"
        checked={includeClosedPurchases}
        onChange={onCheckBoxChange(onUpdatePurchaseOptions)}
        disabled={!isCreating}
      />
    </div>
  </Columns>
);

const mapStateToProps = state => ({
  supplierName: getSupplierName(state),
  debitAmount: getDebitAmount(state),
  referenceId: getReferenceId(state),
  description: getDescription(state),
  date: getDate(state),
  includeClosedPurchases: getIncludeClosedPurchases(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseOptions);
