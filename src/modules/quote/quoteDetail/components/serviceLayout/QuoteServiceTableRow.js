import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsAccountComboboxDisabled,
  getIsCalculating,
  getIsReadOnlyLayout,
  getJobOptions,
  getQuoteLine,
  getTaxCodeOptions,
} from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import JobCombobox from '../../../../../components/combobox/JobCombobox';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => item => onChange({
  target: {
    name,
    value: item.id,
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

const handleAmountInputBlur = (handler, index) => (e) => {
  const { name: key, rawValue: value } = e.target;

  handler(index, key, value);
};

const QuoteServiceTableRow = ({
  quoteLine,
  index,
  jobOptions,
  taxCodeOptions,
  accountOptions,
  onChange,
  onRowInputBlur,
  onAddAccount,
  isAccountComboboxDisabled,
  isCalculating,
  isQuoteJobColumnEnabled,
  isReadOnlyLayout,
  ...feelixInjectedProps
}) => {
  const {
    description,
    allocatedAccountId,
    jobId,
    taxCodeId,
    amount,
  } = quoteLine;

  return (
    <LineItemTable.Row
      {...feelixInjectedProps}
      index={index}
      id={index}
      onRemove={isCalculating ? undefined : feelixInjectedProps.onRemove}
    >
      <TextArea
        label="Line description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        autoSize
        disabled={isReadOnlyLayout}
      />
      <AccountCombobox
        label="Allocate to"
        onChange={onComboboxChange('allocatedAccountId', onChange)}
        items={accountOptions}
        selectedId={allocatedAccountId}
        addNewAccount={() => onAddAccount(onComboboxChange('allocatedAccountId', onChange))}
        disabled={isAccountComboboxDisabled || isCalculating || isReadOnlyLayout}
      />
      <Calculator
        label="Amount ($)"
        hideLabel
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        textAlign="right"
        disabled={isCalculating || isReadOnlyLayout}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {isQuoteJobColumnEnabled && <JobCombobox
        items={jobOptions}
        selectedId={jobId}
        onChange={onComboboxChange('jobId', onChange)}
        disabled={isCalculating || isReadOnlyLayout}
        allowClear
        left
      />}
      <TaxCodeCombobox
        label="Tax code"
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isCalculating || isReadOnlyLayout}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
  jobOptions: getJobOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isAccountComboboxDisabled: getIsAccountComboboxDisabled(state),
  isCalculating: getIsCalculating(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(QuoteServiceTableRow);
