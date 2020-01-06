import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsAccountComboboxDisabled,
  getIsCalculating,
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

const onRowInputBlurHandler = (onRowInputBlur, index, key) => () => onRowInputBlur(index, key);

const QuoteServiceTableRow = ({
  quoteLine,
  index,
  taxCodeOptions,
  accountOptions,
  onChange,
  onRowInputBlur,
  onAddAccount,
  isAccountComboboxDisabled,
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
      <TextArea
        label="Line description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        autoSize
      />
      <AccountCombobox
        label="Allocate to"
        onChange={onComboboxChange('allocatedAccountId', onChange)}
        items={accountOptions}
        selectedId={allocatedAccountId}
        addNewAccount={() => onAddAccount(onComboboxChange('allocatedAccountId', onChange))}
        disabled={isAccountComboboxDisabled || isCalculating}
      />
      <AmountInput
        label="Amount ($)"
        hideLabel
        name="amount"
        value={displayAmount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onRowInputBlurHandler(onRowInputBlur, index, 'amount')}
        textAlign="right"
        disabled={isCalculating}
      />
      <TaxCodeCombobox
        label="Tax code"
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isCalculating}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isAccountComboboxDisabled: getIsAccountComboboxDisabled(state),
  isCalculating: getIsCalculating(state),
});

export default connect(mapStateToProps)(QuoteServiceTableRow);
