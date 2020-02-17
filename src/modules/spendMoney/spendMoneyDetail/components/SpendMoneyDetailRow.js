import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getLineDataByIndexSelector,
  getNewLineData,
  getTaxCodeOptions,
} from '../spendMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const onAmountInputChange = (name, onChange) => (e) => {
  onChange({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const SpendMoneyDetailRow = (props) => {
  const {
    index,
    onRowInputBlur,
    onChange,
    isNewLineRow,
    lineData,
    newLineData,
    accountOptions,
    taxCodeOptions,
    ...feelixInjectedProps
  } = props;
  const data = isNewLineRow ? newLineData : lineData;

  const {
    displayAmount = '',
    description = '',
    accountId,
    taxCodeId,
    quantity,
  } = data;

  return (
    <LineItemTable.Row id={index} index={index} {...feelixInjectedProps}>
      <AccountCombobox
        label="Accounts"
        hideLabel={false}
        items={accountOptions}
        selectedId={accountId}
        onChange={onComboboxChange('accountId', onChange)}
      />
      <AmountInput
        label="Amount"
        hideLabel
        name="amount"
        value={displayAmount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onRowInputBlur}
        numeralDecimalScaleMax={2}
      />
      <AmountInput
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={onAmountInputChange('quantity', onChange)}
        onBlur={onAmountInputChange('quantity', onChange)}
        numeralDecimalScaleMin={0}
        numeralDecimalScaleMax={6}
        numeralIntegerScale={13}
      />
      <TextArea
        label="Description"
        maxLength={255}
        hideLabel
        rows={1}
        autoSize
        name="description"
        value={description}
        onChange={onChange}
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel={false}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        left
      />
    </LineItemTable.Row>
  );
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
    accountOptions: getAccountOptions(state),
    taxCodeOptions: getTaxCodeOptions(state),
  });
};

export default connect(makeMapRowStateToProps)(SpendMoneyDetailRow);
