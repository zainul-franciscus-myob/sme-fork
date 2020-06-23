import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsBankingJobColumnEnabled, getIsJobComboboxDisabled,
} from '../bankingSelectors';
import {
  getLineDataByIndexSelector, getNewLineData,
} from '../bankingSelectors/splitAllocationSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import Calculator from '../../../components/Calculator/Calculator';
import JobCombobox from '../../../components/combobox/JobCombobox';
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
    onAddJob,
    onChange,
    isNewLineRow,
    lineData,
    labels,
    disabled,
    newLineData,
    isBankingJobColumnEnabled,
    isJobComboboxDisabled,
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
    jobId,
    taxCodeId,
    quantity = '',
    lineJobOptions = [],
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
      <Calculator
        disabled={disabled}
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        onChange={handleAmountChange(onChange)}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
        textAlign="right"
      />
      <Calculator
        disabled={disabled}
        label="AmountPercent"
        hideLabel
        name="amountPercent"
        value={amountPercent}
        onChange={handleAmountChange(onChange)}
        textAlign="right"
      />
      <Calculator
        disabled={disabled}
        label="Quantity"
        hideLabel
        numeralDecimalScaleMax={6}
        numeralIntegerScale={19}
        name="quantity"
        value={quantity}
        textAlign="right"
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
      {isBankingJobColumnEnabled && <JobCombobox
        label="Job"
        onChange={handleComboBoxChange('jobId', onChange)}
        items={lineJobOptions}
        selectedId={jobId}
        disabled={isJobComboboxDisabled}
        addNewJob={() => onAddJob(handleComboBoxChange('jobId', onChange))}
        allowClear
        left
      />}
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
    isBankingJobColumnEnabled: getIsBankingJobColumnEnabled(state),
    isJobComboboxDisabled: getIsJobComboboxDisabled(state),
  });
};

export default connect(makeMapRowStateToProps)(SplitAllocationRow);
