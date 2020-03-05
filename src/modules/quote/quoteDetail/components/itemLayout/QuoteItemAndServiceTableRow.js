import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsCalculating,
  getItemOptions,
  getQuoteLineByIndex,
  getTaxCodeOptions,
} from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import ItemCombobox from '../../../../../components/combobox/ItemCombobox';
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
    displayUnitPrice,
    displayDiscount,
    displayAmount,
    taxCodeId,
  },
  itemOptions,
  taxCodeOptions,
  accountOptions,
  onChange,
  isCalculating,
  onTableRowAmountInputBlur,
  onAddItemButtonClick,
  onAddAccountButtonClick,
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
      disabled={isCalculating}
    />
    <TextArea
      name="description"
      label="Item name"
      value={description}
      onChange={onChange}
      disabled={isCalculating}
      autoSize
    />
    <AccountCombobox
      label="Allocate to"
      onChange={onComboboxChange('allocatedAccountId', onChange)}
      items={accountOptions}
      selectedId={allocatedAccountId}
      addNewAccount={() => onAddAccountButtonClick(onComboboxChange('allocatedAccountId', onChange))}
      disabled={isCalculating}
    />
    <Input
      name="unitOfMeasure"
      label="Unit"
      value={unitOfMeasure}
      onChange={onChange}
      disabled={isCalculating}
      maxLength={5}
    />
    <AmountInput
      name="units"
      label="No of units"
      value={units}
      onChange={handleAmountInputChange(onChange)}
      onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating}
      numeralDecimalScaleMax={6}
    />
    <AmountInput
      label="Unit price"
      hideLabel
      name="unitPrice"
      value={displayUnitPrice}
      onChange={handleAmountInputChange(onChange)}
      onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={6}
    />
    <AmountInput
      label="Discount"
      hideLabel
      name="discount"
      value={displayDiscount}
      onChange={handleAmountInputChange(onChange)}
      onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={2}
    />
    <AmountInput
      label="Amount"
      hideLabel
      name="amount"
      value={displayAmount}
      onChange={handleAmountInputChange(onChange)}
      onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={2}
    />
    <TaxCodeCombobox
      items={taxCodeOptions}
      selectedId={taxCodeId}
      onChange={onComboboxChange('taxCodeId', onChange)}
      disabled={isCalculating}
    />
  </LineItemTable.Row>
);

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLineByIndex(state, props),
  itemOptions: getItemOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isCalculating: getIsCalculating(state),
});

export default connect(mapStateToProps)(QuoteItemAndServiceTableRow);
