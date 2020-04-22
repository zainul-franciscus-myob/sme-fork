import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsCalculating,
  getIsReadOnlyLayout,
  getItemOptions,
  getJobOptions,
  getQuoteLineByIndex,
  getTaxCodeOptions,
} from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import ItemCombobox from '../../../../../components/combobox/ItemCombobox';
import JobCombobox from '../../../../../components/combobox/JobCombobox';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const handleAmountInputChange = handler => e => (
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  })
);

const handleAmountInputBlur = (handler, index) => (e) => {
  const { name: key, rawValue: value } = e.target;

  handler(index, key, value);
};

const QuoteItemAndServiceTableRow = ({
  index,
  quoteLine: {
    itemId,
    description,
    allocatedAccountId,
    unitOfMeasure,
    units,
    unitPrice,
    discount,
    amount,
    jobId,
    taxCodeId,
  },
  itemOptions,
  jobOptions,
  taxCodeOptions,
  accountOptions,
  onChange,
  isCalculating,
  isReadOnlyLayout,
  onTableRowAmountInputBlur,
  onAddItemButtonClick,
  onAddAccountButtonClick,
  isQuoteJobColumnEnabled,
  ...feelixInjectedProps
}) => (
  <LineItemTable.Row
    {...feelixInjectedProps}
    id={index}
    index={index}
    onRemove={isCalculating ? undefined : feelixInjectedProps.onRemove}
  >
    <ItemCombobox
      addNewItem={() => onAddItemButtonClick(onComboboxChange('itemId', onChange))}
      items={itemOptions}
      selectedId={itemId}
      onChange={onComboboxChange('itemId', onChange)}
      label="Item number"
      name="itemId"
      disabled={isCalculating || isReadOnlyLayout}
    />
    <TextArea
      name="description"
      label="Item name"
      value={description}
      onChange={onChange}
      disabled={isCalculating || isReadOnlyLayout}
      autoSize
    />
    <AccountCombobox
      label="Allocate to"
      onChange={onComboboxChange('allocatedAccountId', onChange)}
      items={accountOptions}
      selectedId={allocatedAccountId}
      addNewAccount={() => onAddAccountButtonClick(onComboboxChange('allocatedAccountId', onChange))}
      disabled={isCalculating || isReadOnlyLayout}
    />
    <Input
      name="unitOfMeasure"
      label="Unit"
      value={unitOfMeasure}
      onChange={onChange}
      disabled={isCalculating || isReadOnlyLayout}
      maxLength={5}
    />
    <Calculator
      name="units"
      label="No of units"
      value={units}
      onChange={handleAmountInputChange(onChange)}
      onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating || isReadOnlyLayout}
      numeralDecimalScaleMax={6}
    />
    <Calculator
      label="Unit price"
      hideLabel
      name="unitPrice"
      value={unitPrice}
      onChange={handleAmountInputChange(onChange)}
      onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating || isReadOnlyLayout}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={6}
    />
    <Calculator
      label="Discount"
      hideLabel
      name="discount"
      value={discount}
      onChange={handleAmountInputChange(onChange)}
      onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating || isReadOnlyLayout}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={2}
    />
    <Calculator
      label="Amount"
      hideLabel
      name="amount"
      value={amount}
      onChange={handleAmountInputChange(onChange)}
      onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating || isReadOnlyLayout}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={2}
    />
    {isQuoteJobColumnEnabled && <JobCombobox
      items={jobOptions}
      selectedId={jobId}
      onChange={onComboboxChange('jobId', onChange)}
      disabled={isCalculating || isReadOnlyLayout}
      allowClear
      left
    />}
    <TaxCodeCombobox
      items={taxCodeOptions}
      selectedId={taxCodeId}
      onChange={onComboboxChange('taxCodeId', onChange)}
      disabled={isCalculating || isReadOnlyLayout}
    />
  </LineItemTable.Row>
);

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLineByIndex(state, props),
  itemOptions: getItemOptions(state),
  jobOptions: getJobOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isCalculating: getIsCalculating(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(QuoteItemAndServiceTableRow);
