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
} from '../bankingRuleDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const onAmountInputChange = (name, onChange) => (e) => {
  onChange({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const BankingRuleDetailAllocationTableRow = ({
  index,
  row,
  allocationAccounts,
  taxCodes,
  labels,
  isInputField,
  isFieldDisabled,
  isAccountDisabled,
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
      selectedId={row.accountId}
      onChange={onComboboxChange('accountId', onChange)}
      disabled={isAccountDisabled}
    />
    {
        isInputField ? (
          <Input
            textAlign="right"
            label="value"
            name="value"
            value={row.value}
            disabled
          />
        ) : (
          <AmountInput
            textAlign="right"
            label="value"
            name="value"
            value={row.value}
            onChange={onAmountInputChange('value', onChange)}
            onBlur={onAmountInputChange('value', onChange)}
            numeralDecimalScaleMin={2}
            numeralDecimalScaleMax={6}
            disabled={isFieldDisabled}
          />
        )
    }
    <TaxCodeCombobox
      name="taxCodeId"
      items={taxCodes}
      selectedId={row.taxCodeId}
      onChange={onComboboxChange('taxCodeId', onChange)}
      disabled={isFieldDisabled}
    />
  </LineItemTable.Row>
);

const mapStateToProps = (state, props) => ({
  row: getTableRow(state, props),
  allocationAccounts: getAllocationAccounts(state),
  taxCodes: getTaxCodes(state),
  isFieldDisabled: getIsFieldDisabled(state, props),
  isInputField: getIsInputField(state, props),
  isAccountDisabled: getIsAccountFieldDisabled(state, props),
});

export default connect(mapStateToProps)(BankingRuleDetailAllocationTableRow);
