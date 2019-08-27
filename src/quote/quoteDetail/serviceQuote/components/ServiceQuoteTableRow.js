import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getQuoteLine } from '../ServiceQuoteSelectors';
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

const ServiceQuoteTableRow = ({
  quoteLine, index, onChange, onRowInputBlur, ...feelixInjectedProps
}) => {
  const {
    description,
    accounts,
    allocatedAccountId,
    taxCodes,
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
        items={accounts}
        selectedId={allocatedAccountId}
        hintText="Select an account"
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
        items={taxCodes}
        selectedId={taxCodeId}
      />
    </LineItemTable.Row>
  );
};

ServiceQuoteTableRow.propTypes = {
  quoteLine: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
});

export default connect(mapStateToProps)(ServiceQuoteTableRow);
