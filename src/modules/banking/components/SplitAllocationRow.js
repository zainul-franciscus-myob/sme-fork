import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLineDataByIndexSelector, getNewLineData } from '../bankingSelectors/splitAllocationSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const handleComboBoxChange = (name, onChange) => item => onChange({
  target: {
    name,
    value: item.id,
  },
});

const handleAmountChange = onChange => (e) => {
  onChange({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  });
};

const SplitAllocationRow = (props) => {
  const {
    index,
    onAddAccount,
    onChange,
    isNewLineRow,
    lineData,
    labels,
    disabled,
    newLineData,
    ...feelixInjectedProps
  } = props;
  const data = isNewLineRow ? newLineData : lineData;

  const {
    amount = '',
    amountPercent = '',
    description = '',
    accountId,
    taxCodes,
    accounts = [],
    taxCodeId,
    quantity = '',
  } = data;

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      labels={labels}
      {...feelixInjectedProps}
    >
      <AccountCombobox
        disabled={disabled}
        items={accounts}
        selectedId={accountId}
        onChange={handleComboBoxChange('accountId', onChange)}
        addNewAccount={() => onAddAccount(handleComboBoxChange('accountId', onChange))}
      />
      <AmountInput
        disabled={disabled}
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        onChange={handleAmountChange(onChange)}
        onBlur={handleAmountChange(onChange)}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
        textAlign="right"
      />
      <AmountInput
        disabled={disabled}
        label="AmountPercent"
        hideLabel
        name="amountPercent"
        value={amountPercent}
        onChange={handleAmountChange(onChange)}
        textAlign="right"
      />
      <AmountInput
        disabled={disabled}
        label="Quantity"
        hideLabel
        numeralDecimalScaleMax={6}
        numeralIntegerScale={19}
        name="quantity"
        value={quantity}
        onChange={handleAmountChange(onChange)}
      />
      <TextArea
        disabled={disabled}
        type="text"
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        autoSize
      />
      <TaxCodeCombobox
        disabled={disabled}
        items={taxCodes}
        selectedId={taxCodeId}
        onChange={handleComboBoxChange('taxCodeId', onChange)}
      />
    </LineItemTable.Row>);
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
  });
};

export default connect(makeMapRowStateToProps)(SplitAllocationRow);
