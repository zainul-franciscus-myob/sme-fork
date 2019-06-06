import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getBillLine } from '../billServiceSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const handleOnComboboxChange = (handler, name) => item => handler({
  target: {
    name,
    value: item.id,
  },
});

const BillServiceTableRow = ({
  billLine,
  index,
  onChange,
  onComboboxChange,
  onRowInputBlur,
  onAmountInputFieldChange,
  ...feelixInjectedProps
}) => {
  const {
    description,
    accounts,
    allocatedAccountId,
    taxCodes,
    taxCodeId,
    amount,
  } = billLine;

  return (
    <LineItemTable.Row
      index={index}
      id={index}
      {...feelixInjectedProps}
    >
      <Input
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        maxLength={255}
      />
      <AccountCombobox
        onChange={handleOnComboboxChange(onComboboxChange, 'allocatedAccountId')}
        items={accounts}
        selectedId={allocatedAccountId}
      />
      <TaxCodeCombobox
        onChange={handleOnComboboxChange(onComboboxChange, 'taxCodeId')}
        items={taxCodes}
        selectedId={taxCodeId}
      />
      <AmountInput
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        onChange={onAmountInputFieldChange}
        onBlur={onRowInputBlur}
      />
    </LineItemTable.Row>
  );
};

BillServiceTableRow.propTypes = {
  billLine: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
});

export default connect(mapStateToProps)(BillServiceTableRow);
