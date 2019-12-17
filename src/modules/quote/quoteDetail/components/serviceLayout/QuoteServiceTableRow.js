import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsAccountComboboxDisabled,
  getIsCalculating,
  getIsNewLine,
  getQuoteLine,
  getTaxCodeOptions,
} from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => item => onChange({
  target: {
    name,
    value: item.id,
  },
});

const onAmountInputChange = (name, onChange) => (e) => {
  onChange({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const onRowInputBlurHandler = (onRowInputBlur, index) => () => onRowInputBlur(index);

const QuoteServiceTableRow = ({
  quoteLine,
  index,
  taxCodeOptions,
  accountOptions,
  onChange,
  onRowInputBlur,
  onAddAccount,
  isAccountComboboxDisabled,
  isNewLine,
  isCalculating,
  ...feelixInjectedProps
}) => {
  const {
    description,
    allocatedAccountId,
    taxCodeId,
    displayAmount,
  } = quoteLine;

  return (
    <LineItemTable.Row
      {...feelixInjectedProps}
      index={index}
      id={index}
      onRemove={isCalculating ? undefined : feelixInjectedProps.onRemove}
    >
      <Input
        label="Line description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        disabled={isNewLine}
      />
      <AccountCombobox
        label="Allocate to"
        onChange={onComboboxChange('allocatedAccountId', onChange)}
        items={accountOptions}
        selectedId={allocatedAccountId}
        hintText="Select an account"
        addNewAccount={() => onAddAccount(onComboboxChange('allocatedAccountId', onChange))}
        disabled={isAccountComboboxDisabled || isCalculating}
      />
      <AmountInput
        label="Amount ($)"
        hideLabel
        name="amount"
        value={displayAmount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onRowInputBlurHandler(onRowInputBlur, index)}
        textAlign="right"
        disabled={isNewLine || isCalculating}
      />
      <TaxCodeCombobox
        label="Tax code"
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isNewLine || isCalculating}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isAccountComboboxDisabled: getIsAccountComboboxDisabled(state),
  isNewLine: getIsNewLine(state, props),
  isCalculating: getIsCalculating(state),
});

export default connect(mapStateToProps)(QuoteServiceTableRow);
