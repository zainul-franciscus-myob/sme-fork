import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsActionsDisabled,
  getJobOptions,
  getLineDataByIndexSelector,
  getNewLineData,
  getTaxCodeOptions,
} from '../selectors/receiveMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../components/Calculator/Calculator';
import JobCombobox from '../../../../components/combobox/JobCombobox';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, handler) => (item) => {
  handler({
    target: {
      name,
      value: item.id,
    },
  });
};

const onAmountInputChange = (name, handler) => (e) => {
  handler({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const onInputChange = handler => (index, name, value) => {
  handler(index, name, value);
};

const ReceiveMoneyDetailRow = ({
  index,
  onRowInputBlur,
  onChange,
  isNewLineRow,
  lineData,
  newLineData,
  jobOptions,
  taxCodeOptions,
  accountOptions,
  onAddAccount,
  isSubmitting,
  isReceiveMoneyJobColumnEnabled,
  ...feelixInjectedProps
}) => {
  const data = isNewLineRow ? newLineData : lineData;

  const {
    amount,
    units,
    jobId,
    description,
    accountId,
    taxCodeId,
  } = data;

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      {...feelixInjectedProps}
    >
      <AccountCombobox
        label="Account"
        hideLabel
        items={accountOptions}
        selectedId={accountId}
        onChange={onComboboxChange('accountId', onChange)}
        addNewAccount={() => onAddAccount(
          onComboboxChange('accountId', onChange),
        )}
        disabled={isSubmitting}
      />
      <Calculator
        label="Amount"
        name="amount"
        value={amount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onRowInputBlur}
        textAlign="right"
        numeralDecimalScaleMin={2}
        disabled={isSubmitting}
      />
      <Calculator
        label="Quantity"
        name="units"
        value={units}
        onChange={onAmountInputChange('units', onChange)}
        numeralDecimalScaleMax={6}
        numeralIntegerScale={13}
        textAlign="right"
        disabled={isSubmitting}
      />
      <TextArea
        label="Description"
        hideLabel
        rows={1}
        autoSize
        name="description"
        value={description}
        onChange={onInputChange(onChange)}
        disabled={isSubmitting}
      />
      {isReceiveMoneyJobColumnEnabled && <JobCombobox
        items={jobOptions}
        selectedId={jobId}
        onChange={onComboboxChange('jobId', onChange)}
        disabled={isSubmitting}
        allowClear
        left
      />}
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isSubmitting}
      />
    </LineItemTable.Row>);
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
    jobOptions: getJobOptions(state),
    taxCodeOptions: getTaxCodeOptions(state),
    accountOptions: getAccountOptions(state),
    isSubmitting: getIsActionsDisabled(state),
  });
};

export default connect(makeMapRowStateToProps)(ReceiveMoneyDetailRow);
