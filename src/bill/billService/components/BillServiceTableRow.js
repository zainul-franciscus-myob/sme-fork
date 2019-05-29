import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getBillLine } from '../billServiceSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => item => onChange({
  target: {
    name,
    value: item.id,
  },
});

const onRowInputBlurHandler = (onRowInputBlur, index) => () => onRowInputBlur(index);

const BillServiceTableRow = ({
  billLine, index, onChange, onRowInputBlur, ...feelixInjectedProps
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
        onChange={onComboboxChange('allocatedAccountId', onChange)}
        items={accounts}
        selectedId={allocatedAccountId}
      />
      <TaxCodeCombobox
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodes}
        selectedId={taxCodeId}
      />
      <Input
        label="Amount"
        type="number"
        hideLabel
        name="amount"
        value={amount}
        onChange={onChange}
        onBlur={onRowInputBlurHandler(onRowInputBlur, index)}
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
