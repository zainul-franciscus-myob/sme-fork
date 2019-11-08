import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBillLine,
  getIsBlocking,
  getIsLineWithoutItemFromInTray,
  getIsNewLine,
  getItemOptions,
  getTaxCodeOptions,
} from '../selectors/billSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import ItemCombobox from '../../../components/combobox/ItemCombobox';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const handleComboboxChange = (handler, name) => e => handler({
  target: {
    name,
    value: e.id,
  },
});

const handleAmountInputChange = handler => e => (
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  })
);

const handleAmountInputBlur = (handler, index, key) => () => handler({
  index,
  key,
});

const BillItemTableRow = ({
  index,
  billLine,
  taxCodeOptions,
  itemOptions,
  isBlocking,
  isNewLine,
  isLineWithoutItemFromInTray,
  onChange,
  onRowInputBlur,
  ...feelixInjectedProps
}) => {
  const {
    description,
    taxCodeId,
    displayAmount,
    units,
    unitPrice,
    itemId,
    displayDiscount,
  } = billLine;

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      {...feelixInjectedProps}
    >
      <ItemCombobox
        items={itemOptions}
        selectedId={itemId}
        onChange={handleComboboxChange(onChange, 'itemId')}
        disabled={isBlocking}
      />
      <TextArea
        name="description"
        autoSize
        value={description}
        onChange={onChange}
        disabled={isBlocking || isNewLine || isLineWithoutItemFromInTray}
      />
      <AmountInput
        name="units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index, 'units')}
        disabled={isBlocking || isNewLine || isLineWithoutItemFromInTray}
        decimalScale={6}
      />
      <AmountInput
        name="unitPrice"
        value={unitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index, 'unitPrice')}
        textAlign="right"
        disabled={isBlocking || isNewLine || isLineWithoutItemFromInTray}
        decimalScale={6}
      />
      <AmountInput
        name="discount"
        value={displayDiscount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index, 'discount')}
        textAlign="right"
        disabled={isBlocking || isNewLine || isLineWithoutItemFromInTray}
      />
      <AmountInput
        name="amount"
        value={displayAmount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index, 'amount')}
        textAlign="right"
        disabled={isBlocking || isNewLine || isLineWithoutItemFromInTray}
      />
      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
        disabled={isBlocking || isNewLine || isLineWithoutItemFromInTray}
        left
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
  itemOptions: getItemOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isBlocking: getIsBlocking(state),
  isLineWithoutItemFromInTray: getIsLineWithoutItemFromInTray(state, props),
});

export default connect(mapStateToProps)(BillItemTableRow);
