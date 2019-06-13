import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAreLinesCalculating,
  getBillLineByIndex,
  getItems,
  getShouldLineSelectItem,
  getTaxCodes,
} from '../billItemSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import ItemCombobox from './ItemCombobox';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

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

const onInputBlur = (handler, index, key) => () => handler({ index, key });

const BillItemTableRow = ({
  index,
  onChange,
  billLine,
  taxCodes,
  items,
  isLineDisabled,
  onLineInputBlur,
  shouldLineSelectItem,
  ...feelixInjectedProps
}) => (
  <LineItemTable.Row
    {...feelixInjectedProps}
    id={index}
    index={index}
  >
    <AmountInput
      name="units"
      label="Units"
      value={billLine.units}
      onChange={onAmountInputChange('units', onChange)}
      onBlur={onInputBlur(onLineInputBlur, index, 'units')}
      disabled={isLineDisabled || shouldLineSelectItem}
      decimalScale={6}
    />
    <ItemCombobox
      items={items}
      selectedId={billLine.itemId}
      onChange={onComboboxChange('itemId', onChange)}
      label="Item"
      name="itemId"
      disabled={isLineDisabled}
    />
    <Input
      name="description"
      label="Description"
      value={billLine.description}
      onChange={onChange}
      disabled={isLineDisabled || shouldLineSelectItem}
    />
    <AmountInput
      label="Unit Price"
      hideLabel
      name="unitPrice"
      value={billLine.unitPrice}
      onChange={onAmountInputChange('unitPrice', onChange)}
      onBlur={onInputBlur(onLineInputBlur, index, 'unitPrice')}
      textAlign="right"
      disabled={isLineDisabled || shouldLineSelectItem}
      decimalScale={6}
    />
    <AmountInput
      label="Discount"
      hideLabel
      name="discount"
      value={billLine.discount}
      onChange={onAmountInputChange('discount', onChange)}
      onBlur={onInputBlur(onLineInputBlur, index, 'discount')}
      textAlign="right"
      disabled={isLineDisabled || shouldLineSelectItem}
    />
    <TaxCodeCombobox
      items={taxCodes}
      selectedId={billLine.taxCodeId}
      onChange={onComboboxChange('taxCodeId', onChange)}
      disabled={isLineDisabled || shouldLineSelectItem}
    />
    <AmountInput
      label="Amount"
      hideLabel
      name="amount"
      value={billLine.amount}
      onChange={onAmountInputChange('amount', onChange)}
      onBlur={onInputBlur(onLineInputBlur, index, 'amount')}
      textAlign="right"
      disabled={isLineDisabled || shouldLineSelectItem}
    />
  </LineItemTable.Row>
);

BillItemTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  billLine: PropTypes.shape({}).isRequired,
  taxCodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onLineInputBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLineByIndex(state, props),
  isLineDisabled: getAreLinesCalculating(state),
  items: getItems(state),
  taxCodes: getTaxCodes(state),
  shouldLineSelectItem: getShouldLineSelectItem(state, props),
});

export default connect(mapStateToProps)(BillItemTableRow);
