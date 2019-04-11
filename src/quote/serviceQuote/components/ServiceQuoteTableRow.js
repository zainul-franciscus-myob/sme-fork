import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getQuoteLine } from '../ServiceQuoteSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => item => onChange({
  target: {
    name,
    value: item.id,
  },
});

const onRowInputBlurHandler = (onRowInputBlur, index) => () => onRowInputBlur(index);

const ServiceQuoteTableRow = ({
  quoteLine, index, onChange, onRowInputBlur, ...feelixInjectedProps
}) => {
  const {
    description,
    accounts,
    selectedAccountIndex,
    taxCodes,
    selectedTaxCodeIndex,
    amount,
  } = quoteLine;

  return (
    <LineItemTable.Row
      index={index}
      id={index}
      moveRow={() => {}}
      {...feelixInjectedProps}
    >
      <Input
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
      />
      <AccountCombobox
        onChange={onComboboxChange('allocatedAccountId', onChange)}
        items={accounts}
        selectedIndex={selectedAccountIndex}
      />
      <TaxCodeCombobox
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodes}
        selectedIndex={selectedTaxCodeIndex}
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

ServiceQuoteTableRow.propTypes = {
  quoteLine: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
});

export default connect(mapStateToProps)(ServiceQuoteTableRow);
