import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsAccountComboboxDisabled, getQuoteLine } from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

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
  onChange,
  onRowInputBlur,
  onAddAccount,
  isAccountComboboxDisabled,
  ...feelixInjectedProps
}) => {
  const {
    description,
    accountOptions,
    allocatedAccountId,
    taxCodeOptions,
    taxCodeId,
    amount,
  } = quoteLine;

  return (
    <LineItemTable.Row
      index={index}
      id={index}
      {...feelixInjectedProps}
    >
      <Input
        label="Line description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
      />
      <AccountCombobox
        label="Allocate to"
        onChange={onComboboxChange('allocatedAccountId', onChange)}
        items={accountOptions}
        selectedId={allocatedAccountId}
        hintText="Select an account"
        addNewAccount={() => onAddAccount(onComboboxChange('allocatedAccountId', onChange))}
        disabled={isAccountComboboxDisabled}
      />
      <AmountInput
        label="Amount ($)"
        hideLabel
        name="amount"
        value={amount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onRowInputBlurHandler(onRowInputBlur, index)}
        textAlign="right"
      />
      <TaxCodeCombobox
        label="Tax code"
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
      />
    </LineItemTable.Row>
  );
};

QuoteServiceTableRow.propTypes = {
  quoteLine: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
  isAccountComboboxDisabled: getIsAccountComboboxDisabled(state),
});

export default connect(mapStateToProps)(QuoteServiceTableRow);
