import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLineDataByIndexSelector, getNewLineData,
} from '../spendMoneyDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const eventWrapper = (name, onChange) => (item) => {
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

const SpendMoneyDetailRow = (props) => {
  const {
    index,
    onRowInputBlur,
    onChange,
    isNewLineRow,
    lineData,
    newLineData,
    ...feelixInjectedProps
  } = props;
  const data = isNewLineRow ? newLineData : lineData;

  const {
    amount = '',
    description = '',
    accountId,
    taxCodes,
    accounts,
    taxCodeId,
  } = data;

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      {...feelixInjectedProps}
    >
      <AccountCombobox
        label="Accounts"
        hideLabel={false}
        items={accounts}
        selectedId={accountId}
        onChange={eventWrapper('accountId', onChange)}
      />
      <AmountInput
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onRowInputBlur(index)}
        disabled={isNewLineRow}
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
        disabled={isNewLineRow}
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel={false}
        items={taxCodes}
        selectedId={taxCodeId}
        onChange={eventWrapper('taxCodeId', onChange)}
        disabled={isNewLineRow}
        left
      />
    </LineItemTable.Row>);
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
  });
};

export default connect(makeMapRowStateToProps)(SpendMoneyDetailRow);
