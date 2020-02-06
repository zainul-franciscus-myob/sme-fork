import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getLineDataByIndexSelector,
  getNewLineData,
  getTaxCodeOptions,
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
  taxCodeOptions,
  accountOptions,
  ...feelixInjectedProps
}) => {
  const data = isNewLineRow ? newLineData : lineData;

  const {
    displayAmount,
    units,
    description,
    accountId,
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
        items={accountOptions}
        selectedId={accountId}
        onChange={onComboboxChange('accountId', onChange)}
      />
      <AmountInput
        label="Amount"
        name="amount"
        value={displayAmount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onAmountInputBlur(onRowInputBlur, index)}
        textAlign="right"
      />
      <AmountInput
        label="Quantity"
        name="units"
        value={units}
        onChange={onAmountInputChange('units', onChange)}
        decimalScale={6}
        numeralIntegerScale={13}
        textAlign="right"
      />
      <TextArea
        label="Description"
        hideLabel
        rows={1}
        autoSize
        name="description"
        value={description}
        onChange={onInputChange(onChange)}
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
      />
    </LineItemTable.Row>);
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
    taxCodeOptions: getTaxCodeOptions(state),
    accountOptions: getAccountOptions(state),
  });
};

export default connect(makeMapRowStateToProps)(ReceiveMoneyDetailRow);
