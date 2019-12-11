import {
  Combobox, DatePicker, DetailHeader, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDate,
  getDebitAmount,
  getDescription,
  getIsCreating,
  getReferenceId,
  getSupplierName,
} from '../SupplierReturnPurchaseSelector';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import styles from './SupplierReturnPurchaseOptions.module.css';

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
  isCreating,
  onUpdatePurchaseOptions,
}) => {
  const primary = (
    <div>
      <Combobox
        name="supplier"
        label="Supplier"
        disabled
        items={[{ supplierName }]}
        selected={{ supplierName }}
        metaData={[{ columnName: 'supplierName', showData: true }]}
      />
      <AmountInput
        className={styles.debit}
        name="debitAmount"
        label="Debit ($)"
        value={debitAmount}
        textAlign="right"
        disabled
      />
      <TextArea
        value={description}
        rows={1}
        resize="vertical"
        autoSize
        name="description"
        label="Description"
        onChange={onTextFieldChange(onUpdatePurchaseOptions)}
        disabled={!isCreating}
      />
    </div>
  );

  const secondary = (
    <div>
      <Input
        name="referenceId"
        label="Reference number"
        requiredLabel={isCreating ? 'This is required' : undefined}
        value={referenceId}
        onChange={onTextFieldChange(onUpdatePurchaseOptions)}
        disabled={!isCreating}
      />
      <DatePicker
        name="date"
        label="Date"
        requiredLabel={isCreating ? 'This is required' : undefined}
        value={date}
        onSelect={onDateChange(onUpdatePurchaseOptions)}
        disabled={!isCreating}
      />

    </div>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = state => ({
  supplierName: getSupplierName(state),
  debitAmount: getDebitAmount(state),
  referenceId: getReferenceId(state),
  description: getDescription(state),
  date: getDate(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseOptions);
