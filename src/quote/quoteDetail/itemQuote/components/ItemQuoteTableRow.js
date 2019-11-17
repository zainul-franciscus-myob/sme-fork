import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCalculating, getIsNewLine, getItems, getQuoteLineByIndex, getTaxCodes,
} from '../ItemQuoteSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import ItemCombobox from '../../../../components/combobox/ItemCombobox';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

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

const onAmountInputBlur = (handler, index, key) => () => handler(index, key);

const ItemQuoteTableRow = ({
  index,
  quoteLine,
  items,
  taxCodes,
  onChange,
  isNewLine,
  isCalculating,
  onTableRowAmountInputBlur,
  onAddItemButtonClick,
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
      items={items}
      selectedId={quoteLine.itemId}
      onChange={onComboboxChange('itemId', onChange)}
      label="Item number"
      name="itemId"
      disabled={isCalculating}
      hintText="Select an item"
    />
    <Input
      name="description"
      label="Item name"
      value={quoteLine.description}
      onChange={onChange}
      disabled={isNewLine || isCalculating}
    />
    <AmountInput
      name="units"
      label="Units"
      value={quoteLine.units}
      onChange={onAmountInputChange('units', onChange)}
      onBlur={onAmountInputBlur(onTableRowAmountInputBlur, index, 'units')}
      disabled={isNewLine || isCalculating}
      decimalScale={6}
    />
    <AmountInput
      label="Unit price"
      hideLabel
      name="unitPrice"
      value={quoteLine.unitPrice}
      onChange={onAmountInputChange('unitPrice', onChange)}
      onBlur={onAmountInputBlur(onTableRowAmountInputBlur, index, 'unitPrice')}
      textAlign="right"
      disabled={isNewLine || isCalculating}
      decimalScale={6}
    />
    <AmountInput
      label="Discount"
      hideLabel
      name="discount"
      value={quoteLine.displayDiscount}
      onChange={onAmountInputChange('discount', onChange)}
      onBlur={onAmountInputBlur(onTableRowAmountInputBlur, index, 'discount')}
      textAlign="right"
      disabled={isNewLine || isCalculating}
    />
    <AmountInput
      label="Amount"
      hideLabel
      name="amount"
      value={quoteLine.displayAmount}
      onChange={onAmountInputChange('amount', onChange)}
      onBlur={onAmountInputBlur(onTableRowAmountInputBlur, index, 'amount')}
      textAlign="right"
      disabled={isNewLine || isCalculating}
    />
    <TaxCodeCombobox
      items={taxCodes}
      selectedId={quoteLine.taxCodeId}
      onChange={onComboboxChange('taxCodeId', onChange)}
      disabled={isNewLine || isCalculating}
    />
  </LineItemTable.Row>
);
const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLineByIndex(state, props),
  items: getItems(state),
  taxCodes: getTaxCodes(state),
  isNewLine: getIsNewLine(state, props),
  isCalculating: getIsCalculating(state),
});

export default connect(mapStateToProps)(ItemQuoteTableRow);
