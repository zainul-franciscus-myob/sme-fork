import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsSubmitting,
  getLineDataByIndexSelector,
  getNewLineData,
  getTaxCodeOptions,
} from '../RecurringSpendMoneySelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../components/Calculator/Calculator';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const onAmountInputChange = (name, onChange) => (e) => {
  onChange({ target: { name, value: e.target.rawValue } });
};

const onComboboxChange = (name, onChange) => (item) => {
  onChange({ target: { name, value: item.id } });
};

const handleAutoCompleteItemChange = (handler, name) => (item) => {
  handler({ target: { name, value: item ? item.id : '' } });
};

const RecurringSpendMoneyRow = (props) => {
  const {
    index,
    lineData,
    newLineData,
    accountOptions,
    taxCodeOptions,
    isNewLineRow,
    isJobComboboxDisabled,
    isSubmitting,
    onChange,
    onRowInputBlur,
    onAddAccount,
    renderJobCombobox,
    ...feelixInjectedProps
  } = props;
  const data = isNewLineRow ? newLineData : lineData;

  const {
    amount = '',
    description = '',
    accountId,
    taxCodeId,
    quantity,
    jobId,
  } = data;

  const onChangeAccountId = onComboboxChange('accountId', onChange);

  return (
    <LineItemTable.Row id={index} index={index} {...feelixInjectedProps}>
      <AccountCombobox
        label="Accounts"
        hideLabel={false}
        items={accountOptions}
        selectedId={accountId}
        onChange={onComboboxChange('accountId', onChange)}
        disabled={isSubmitting}
        addNewAccount={() => onAddAccount(onChangeAccountId)}
      />
      <Calculator
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onRowInputBlur}
        numeralDecimalScaleMin={2}
        disabled={isSubmitting}
      />
      <Calculator
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={onAmountInputChange('quantity', onChange)}
        onBlur={onRowInputBlur}
        numeralDecimalScaleMin={0}
        numeralDecimalScaleMax={6}
        numeralIntegerScale={13}
        disabled={isSubmitting}
      />
      <TextArea
        label="Description"
        maxLength={1000}
        hideLabel
        rows={1}
        autoSize
        name="description"
        value={description}
        onChange={onChange}
        disabled={isSubmitting}
      />
      {renderJobCombobox({
        name: 'jobId',
        label: 'Job',
        hideLabel: true,
        selectedId: jobId,
        disabled: isSubmitting || isJobComboboxDisabled,
        onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
        left: true,
      })}
      <TaxCodeCombobox
        label="Tax code"
        hideLabel={false}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isSubmitting}
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
    isSubmitting: getIsSubmitting(state),
  });
};

export default connect(makeMapRowStateToProps)(RecurringSpendMoneyRow);
