import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsAccountComboboxDisabled,
  getIsCalculating,
  getIsJobComboboxDisabled,
  getIsReadOnly,
  getJobOptions,
  getQuoteLine,
  getTaxCodeOptions,
} from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import JobCombobox from '../../../../../components/combobox/JobCombobox';
import QuoteLineType from '../../QuoteLineType';
import QuoteTableReadOnlyRowItem from '../QuoteTableReadOnlyRowItem';
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
  onAddJob,
  isAccountComboboxDisabled,
  isJobComboboxDisabled,
  isCalculating,
  isQuoteJobColumnEnabled,
  isReadOnly,
  ...feelixInjectedProps
}) => {
  const {
    type,
    description,
    allocatedAccountId,
    jobId,
    taxCodeId,
    amount,
  } = quoteLine;

  if ([QuoteLineType.HEADER, QuoteLineType.SUB_TOTAL].includes(type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <QuoteTableReadOnlyRowItem value={description} />
        <QuoteTableReadOnlyRowItem />
        <QuoteTableReadOnlyRowItem value={amount} />
        {isQuoteJobColumnEnabled && <QuoteTableReadOnlyRowItem />}
        <QuoteTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

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
        disabled={isReadOnly}
      />
      <AccountCombobox
        label="Allocate to"
        onChange={onComboboxChange('allocatedAccountId', onChange)}
        items={accountOptions}
        selectedId={allocatedAccountId}
        addNewAccount={() => onAddAccount(onComboboxChange('allocatedAccountId', onChange))}
        disabled={isAccountComboboxDisabled || isCalculating || isReadOnly}
      />
      <Calculator
        label="Amount ($)"
        hideLabel
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        textAlign="right"
        disabled={isCalculating || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {isQuoteJobColumnEnabled && <JobCombobox
        items={jobOptions}
        selectedId={jobId}
        addNewJob={() => onAddJob(onComboboxChange('jobId', onChange))}
        onChange={onComboboxChange('jobId', onChange)}
        disabled={isJobComboboxDisabled || isCalculating || isReadOnly}
        allowClear
        left
      />}
      <TaxCodeCombobox
        label="Tax code"
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isCalculating || isReadOnly}
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
  isJobComboboxDisabled: getIsJobComboboxDisabled(state),
  isCalculating: getIsCalculating(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(QuoteServiceTableRow);
