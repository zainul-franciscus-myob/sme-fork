import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getLineDataByIndexSelector,
  getNewLineData,
  getTaxCodeOptions,
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
  taxCodeOptions,
  accountOptions,
  ...feelixInjectedProps
}) => {
  const data = isNewLineRow ? newLineData : lineData;

  const {
    displayDebitAmount = '',
    displayCreditAmount = '',
    quantity = '',
    description = '',
    isCreditDisabled = false,
    isDebitDisabled = false,
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
        label="Accounts"
        items={accountOptions}
        selectedId={accountId}
        onChange={onComboboxChange('accountId', onChange)}
      />
      <AmountInput
        label="Debit amount"
        name="debitAmount"
        value={displayDebitAmount}
        disabled={isDebitDisabled}
        onChange={onAmountInputChange('debitAmount', onChange)}
        onBlur={onInputBlur(onRowInputBlur, index, 'debitAmount')}
        decimalScale={2}
      />
      <AmountInput
        label="Credit amount"
        name="creditAmount"
        value={displayCreditAmount}
        disabled={isCreditDisabled}
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
        decimalScale={6}
        numeralIntegerScale={13}
      />
      <TextArea
        rows={1}
        autoSize
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
      />
      <TaxCodeCombobox
        label="Tax codes"
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

export default connect(makeMapRowStateToProps)(GeneralJournalDetailRow);
