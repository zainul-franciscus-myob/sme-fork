import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAreLinesCalculating, getItemOptions, getTaxCodeOptions } from '../../selectors/invoiceDetailSelectors';
import {
  getInvoiceLineByIndex,
  getShouldLineSelectItem,
} from '../../selectors/itemLayoutSelectors';
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

const onInputBlur = (handler, index, key) => () => handler({ index, key });

const InvoiceItemTableRow = ({
  index,
  onChange,
  invoiceLine,
  taxCodeOptions,
  itemOptions,
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
      value={invoiceLine.units}
      onChange={onAmountInputChange('units', onChange)}
      onBlur={onInputBlur(onLineInputBlur, index, 'units')}
      disabled={isLineDisabled || shouldLineSelectItem}
      decimalScale={6}
    />

    <ItemCombobox
      label="Item"
      name="itemId"
      items={itemOptions}
      selectedId={invoiceLine.itemId}
      onChange={onComboboxChange('itemId', onChange)}
      disabled={isLineDisabled}
    />

    <Input
      name="description"
      label="Description"
      value={invoiceLine.description}
      onChange={onChange}
      disabled={isLineDisabled || shouldLineSelectItem}
    />

    <AmountInput
      label="Unit Price"
      hideLabel
      name="unitPrice"
      value={invoiceLine.unitPrice}
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
      value={invoiceLine.displayDiscount}
      onChange={onAmountInputChange('discount', onChange)}
      onBlur={onInputBlur(onLineInputBlur, index, 'discount')}
      textAlign="right"
      disabled={isLineDisabled || shouldLineSelectItem}
    />

    <AmountInput
      label="Amount"
      hideLabel
      name="amount"
      value={invoiceLine.displayAmount}
      onChange={onAmountInputChange('amount', onChange)}
      onBlur={onInputBlur(onLineInputBlur, index, 'amount')}
      textAlign="right"
      disabled={isLineDisabled || shouldLineSelectItem}
    />

    <TaxCodeCombobox
      label="Tax code"
      hideLabel
      items={taxCodeOptions}
      selectedId={invoiceLine.taxCodeId}
      onChange={onComboboxChange('taxCodeId', onChange)}
      disabled={isLineDisabled || shouldLineSelectItem}
    />

  </LineItemTable.Row>
);

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLineByIndex(state, props),
  isLineDisabled: getAreLinesCalculating(state),
  itemOptions: getItemOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  shouldLineSelectItem: getShouldLineSelectItem(state, props),
});

export default connect(mapStateToProps)(InvoiceItemTableRow);
