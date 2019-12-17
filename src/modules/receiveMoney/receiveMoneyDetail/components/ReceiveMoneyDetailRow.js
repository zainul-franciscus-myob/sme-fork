import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLineDataByIndexSelector, getNewLineData,
} from '../receiveMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, handler) => (item) => {
  handler({
    target: {
      name,
      value: item.id,
    },
  });
};

const onAmountInputChange = (name, handler) => (e) => {
  handler({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const onInputChange = handler => (index, name, value) => {
  handler(index, name, value);
};

const onAmountInputBlur = (handler, index) => () => {
  handler(index);
};

const ReceiveMoneyDetailRow = ({
  index,
  onRowInputBlur,
  onChange,
  isNewLineRow,
  lineData,
  newLineData,
  ...feelixInjectedProps
}) => {
  const data = isNewLineRow ? newLineData : lineData;

  const {
    amount = '',
    quantity = '',
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
        label="Account"
        hideLabel
        items={accounts}
        selectedId={accountId}
        onChange={onComboboxChange('accountId', onChange)}
      />
      <AmountInput
        label="Amount"
        name="amount"
        value={amount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onAmountInputBlur(onRowInputBlur, index)}
        disabled={isNewLineRow}
      />
      <AmountInput
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={onAmountInputChange('quantity', onChange)}
        disabled={isNewLineRow}
        decimalScale={6}
        numeralIntegerScale={19}
      />
      <TextArea
        label="Description"
        hideLabel
        rows={1}
        autoSize
        name="description"
        value={description}
        onChange={onInputChange(onChange)}
        disabled={isNewLineRow}
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        items={taxCodes}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isNewLineRow}
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

export default connect(makeMapRowStateToProps)(ReceiveMoneyDetailRow);
