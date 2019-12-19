import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLineDataByIndexSelector, getNewLineData } from '../bankingSelectors/splitAllocationSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../components/combobox/TaxCodeCombobox';

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
    onChange,
    isNewLineRow,
    lineData,
    labels,
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
  } = data;

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      labels={labels}
      {...feelixInjectedProps}
    >
      <AccountCombobox
        items={accounts}
        selectedId={accountId}
        onChange={handleComboBoxChange('accountId', onChange)}
      />
      <AmountInput
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        onChange={handleAmountChange(onChange)}
        textAlign="right"
      />
      <AmountInput
        label="AmountPercent"
        hideLabel
        name="amountPercent"
        value={amountPercent}
        onChange={handleAmountChange(onChange)}
        textAlign="right"
      />
      <TextArea
        type="text"
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        autoSize
      />
      <TaxCodeCombobox
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
