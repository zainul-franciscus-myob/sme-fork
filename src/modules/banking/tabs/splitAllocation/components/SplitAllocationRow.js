import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsFocused, getIsJobComboboxDisabled } from '../../../selectors';
import {
  getLineDataByIndex,
  getNewLineData,
} from '../splitAllocationSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import FocusLocations from '../../../types/FocusLocations';
import HotkeyLocations from '../../../hotkeys/HotkeyLocations';
import HotkeyWrapper from '../../../hotkeys/HotkeyWrapper';
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

const handleAutoCompleteItemChange = (handler, name) => (item) => {
  handler({
    target: {
      name,
      value: item ? item.id : '',
    },
  });
};

const SplitAllocationRow = (props) => {
  const {
    index,
    onAddAccount,
    onBlur,
    onChange,
    isNewLineRow,
    lineData,
    labels,
    disabled,
    newLineData,
    isJobComboboxDisabled,
    isAccountComboboxFocused,
    renderJobCombobox,
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
      {renderJobCombobox({
        name: 'jobId',
        label: 'Job',
        hideLabel: true,
        selectedId: jobId,
        disabled: disabled || isJobComboboxDisabled,
        onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
        left: true,
      })}
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
    isJobComboboxDisabled: getIsJobComboboxDisabled(state),
    isAccountComboboxFocused: getIsFocused(
      state,
      ownProps.index,
      FocusLocations.SPLIT_ALLOCATION_ACCOUNT_COMBOBOX
    ),
  });
};

export default connect(makeMapRowStateToProps)(SplitAllocationRow);
