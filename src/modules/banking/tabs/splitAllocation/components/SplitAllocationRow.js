import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsBankingJobColumnEnabled,
  getIsFocused,
  getIsJobComboboxDisabled,
} from '../../../selectors';
import {
  getLineDataByIndex,
  getNewLineData,
} from '../splitAllocationSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import FocusLocations from '../../../types/FocusLocations';
import HotkeyLocations from '../../../hotkeys/HotkeyLocations';
import HotkeyWrapper from '../../../hotkeys/HotkeyWrapper';
import JobCombobox from '../../../../../components/combobox/JobCombobox';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

const handleComboBoxChange = (name, onChange) => (item) =>
  onChange({
    target: {
      name,
      value: item.id,
    },
  });

const handleAmountChange = (onChange) => (e) => {
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
    onBlur,
    onChange,
    isNewLineRow,
    lineData,
    labels,
    disabled,
    newLineData,
    isBankingJobColumnEnabled,
    isJobComboboxDisabled,
    isAccountComboboxFocused,
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
    taxAmount,
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
        autoFocus={isAccountComboboxFocused}
        addNewAccount={() =>
          onAddAccount(handleComboBoxChange('accountId', onChange))
        }
        onBlur={() => onBlur(index)}
      />
      <HotkeyWrapper
        index={index}
        location={HotkeyLocations.SPLIT_ALLOCATION_CALCULATOR}
      >
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
      </HotkeyWrapper>
      <HotkeyWrapper
        index={index}
        location={HotkeyLocations.SPLIT_ALLOCATION_CALCULATOR}
      >
        <Calculator
          disabled={disabled}
          label="AmountPercent"
          hideLabel
          name="amountPercent"
          value={amountPercent}
          onChange={handleAmountChange(onChange)}
          textAlign="right"
        />
      </HotkeyWrapper>
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
      {isBankingJobColumnEnabled && (
        <JobCombobox
          label="Job"
          onChange={handleComboBoxChange('jobId', onChange)}
          items={lineJobOptions}
          selectedId={jobId}
          disabled={isJobComboboxDisabled}
          addNewJob={() => onAddJob(handleComboBoxChange('jobId', onChange))}
          allowClear
          left
        />
      )}
      <TaxCodeCombobox
        disabled={disabled}
        items={taxCodes}
        selectedId={taxCodeId}
        onChange={handleComboBoxChange('taxCodeId', onChange)}
        left
      />
      <Calculator
        value={taxAmount}
        disabled
        textAlign="right"
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
    </LineItemTable.Row>
  );
};

const makeMapRowStateToProps = () => {
  return (state, ownProps) => ({
    lineData: getLineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
    isBankingJobColumnEnabled: getIsBankingJobColumnEnabled(state),
    isJobComboboxDisabled: getIsJobComboboxDisabled(state),
    isAccountComboboxFocused: getIsFocused(
      state,
      ownProps.index,
      FocusLocations.SPLIT_ALLOCATION_ACCOUNT_COMBOBOX
    ),
  });
};

export default connect(makeMapRowStateToProps)(SplitAllocationRow);
