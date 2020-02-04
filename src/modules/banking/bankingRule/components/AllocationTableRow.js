import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllocationAccounts,
  getIsAccountFieldDisabled,
  getIsFieldDisabled,
  getIsInputField,
  getTableRow,
  getTaxCodes,
} from '../bankingRuleSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const onAmountBlur = (handler, index) => () => handler({ index });

const handleComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const handleAmountInputChange = (name, onChange) => (e) => {
  onChange({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const AllocationTableRow = ({
  index,
  allocation,
  allocationAccounts,
  taxCodes,
  labels,
  isFieldDisabled,
  isAccountDisabled,
  isInputField,
  onRowInputBlur,
  onChange,
  ...feelixInjectedProps
}) => (
  <LineItemTable.Row
    {...feelixInjectedProps}
    id={index}
    index={index}
    labels={labels}
  >
    <AccountCombobox
      name="accountId"
      items={allocationAccounts}
      selectedId={allocation.accountId}
      onChange={handleComboboxChange('accountId', onChange)}
      disabled={isAccountDisabled}
    />
    {
      isInputField ? (
        <Input
          textAlign="right"
          label="value"
          name="value"
          value={allocation.value}
          disabled
        />
      ) : (
        <AmountInput
          textAlign="right"
          label="value"
          name="value"
          value={allocation.value}
          onChange={handleAmountInputChange('value', onChange)}
          onBlur={onAmountBlur(onRowInputBlur, index)}
          disabled={isFieldDisabled}
        />
      )
    }
    <TaxCodeCombobox
      name="taxCodeId"
      items={taxCodes}
      selectedId={allocation.taxCodeId}
      onChange={handleComboboxChange('taxCodeId', onChange)}
      disabled={isFieldDisabled}
    />
  </LineItemTable.Row>
);


const mapStateToProps = (state, props) => ({
  allocation: getTableRow(state, props),
  allocationAccounts: getAllocationAccounts(state),
  isFieldDisabled: getIsFieldDisabled(state, props),
  isAccountDisabled: getIsAccountFieldDisabled(state, props),
  isInputField: getIsInputField(state, props),
  taxCodes: getTaxCodes(state),
});

export default connect(mapStateToProps)(AllocationTableRow);
