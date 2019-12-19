import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLineDataByIndexSelector, getNewLineData,
} from '../generalJournalDetailSelectors';
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

const onInputBlur = (handler, index, key) => () => handler({ index, key });

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const GeneralJournalDetailRow = ({
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
    debitAmount = '',
    creditAmount = '',
    quantity = '',
    description = '',
    isCreditDisabled = false,
    isDebitDisabled = false,
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
        items={accounts}
        selectedId={accountId}
        onChange={onComboboxChange('accountId', onChange)}
      />
      <AmountInput
        label="Debit amount"
        name="debitAmount"
        value={debitAmount}
        disabled={isNewLineRow || isDebitDisabled}
        onChange={onAmountInputChange('debitAmount', onChange)}
        onBlur={onInputBlur(onRowInputBlur, index, 'debitAmount')}
        decimalScale={2}
      />
      <AmountInput
        label="Credit amount"
        name="creditAmount"
        value={creditAmount}
        disabled={isNewLineRow || isCreditDisabled}
        onChange={onAmountInputChange('creditAmount', onChange)}
        onBlur={onInputBlur(onRowInputBlur, index, 'creditAmount')}
        decimalScale={2}
      />
      <AmountInput
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={onAmountInputChange('quantity', onChange)}
        onBlur={onInputBlur(onRowInputBlur, index, 'quantity')}
        disabled={isNewLineRow}
        decimalScale={6}
        numeralIntegerScale={19}
      />
      <TextArea
        rows={1}
        autoSize
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        disabled={isNewLineRow}
      />
      <TaxCodeCombobox
        label="Tax codes"
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

export default connect(makeMapRowStateToProps)(GeneralJournalDetailRow);
