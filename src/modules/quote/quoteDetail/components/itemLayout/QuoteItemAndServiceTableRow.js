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

const onAmountInputChange = (name, onChange) => (e) => {
  onChange({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const onAmountInputBlur = (handler, index) => (e) => {
  const { rawValue, name } = e.target;

  handler(index, name, rawValue);
};

const QuoteItemAndServiceTableRow = ({
  index,
  quoteLine,
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
      selectedId={quoteLine.itemId}
      onChange={onComboboxChange('itemId', onChange)}
      label="Item number"
      name="itemId"
      disabled={isCalculating}
    />
    <TextArea
      name="description"
      label="Item name"
      value={quoteLine.description}
      onChange={onChange}
      disabled={isCalculating}
      autoSize
    />
    <AccountCombobox
      label="Allocate to"
      onChange={onComboboxChange('allocatedAccountId', onChange)}
      items={accountOptions}
      selectedId={quoteLine.allocatedAccountId}
      addNewAccount={() => onAddAccountButtonClick(onComboboxChange('allocatedAccountId', onChange))}
      disabled={isCalculating}
    />
    <Input
      name="unitOfMeasure"
      label="Unit"
      value={quoteLine.unitOfMeasure}
      onChange={onChange}
      disabled={isCalculating}
      maxLength={5}
    />
    <AmountInput
      name="units"
      label="No of units"
      value={quoteLine.units}
      onChange={onAmountInputChange('units', onChange)}
      onBlur={onAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating}
      numeralDecimalScaleMax={6}
    />
    <AmountInput
      label="Unit price"
      hideLabel
      name="displayUnitPrice"
      value={quoteLine.displayUnitPrice}
      onChange={onAmountInputChange('displayUnitPrice', onChange)}
      onBlur={onAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={6}
    />
    <AmountInput
      label="Discount"
      hideLabel
      name="displayDiscount"
      value={quoteLine.displayDiscount}
      onChange={onAmountInputChange('displayDiscount', onChange)}
      onBlur={onAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={2}
    />
    <AmountInput
      label="Amount"
      hideLabel
      name="displayAmount"
      value={quoteLine.displayAmount}
      onChange={onAmountInputChange('displayAmount', onChange)}
      onBlur={onAmountInputBlur(onTableRowAmountInputBlur, index)}
      textAlign="right"
      disabled={isCalculating}
      numeralDecimalScaleMin={2}
      numeralDecimalScaleMax={2}
    />
    <TaxCodeCombobox
      items={taxCodeOptions}
      selectedId={quoteLine.taxCodeId}
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
