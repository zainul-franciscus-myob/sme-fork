import {
  Combobox, DetailHeader, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDate,
  getDebitAmount,
  getDescription,
  getIsBeforeStartOfFinancialYear,
  getIsCreating,
  getReferenceId,
  getSupplierName,
} from '../SupplierReturnPurchaseSelector';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import DatePicker from '../../../components/DatePicker/DatePicker';
import styles from './SupplierReturnPurchaseOptions.module.css';

const onTextFieldChange = handler => ({ target }) => {
  const { name, value } = target;
  handler({ key: name, value });
};

const handleDateChange = (handler, key) => ({ value }) => {
  handler({ key, value });
};

const SupplierReturnPurchaseOptions = ({
  supplierName,
  debitAmount,
  referenceId,
  description,
  date,
  isCreating,
  onUpdatePurchaseOptions,
  isBeforeStartOfFinancialYear,
}) => {
  const requiredLabel = isCreating ? 'This is required' : undefined;

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
        requiredLabel={requiredLabel}
        value={referenceId}
        onChange={onTextFieldChange(onUpdatePurchaseOptions)}
        disabled={!isCreating}
        maxLength={13}
      />
      <DatePicker
        name="date"
        label="Date"
        value={date}
        displayWarning={isBeforeStartOfFinancialYear}
        warningMessage={'The date is set to a previous financial year'}
        onSelect={handleDateChange(onUpdatePurchaseOptions, 'date')}
        requiredLabel={requiredLabel}
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
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseOptions);
