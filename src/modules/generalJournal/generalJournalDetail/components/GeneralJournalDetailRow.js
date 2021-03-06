import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsSystem,
  getIsTableDisabled,
  getLineDataByIndexSelector,
  getNewLineData,
  getShouldShowTaxOptions,
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

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const handleAutoCompleteItemChange = (handler, name) => (item) => {
  handler({
    target: {
      name,
      value: item ? item.id : '',
    },
  });
};

const GeneralJournalDetailRow = ({
  index,
  isNewLineRow,
  isTableDisabled,
  lineData,
  newLineData,
  taxCodeOptions,
  accountOptions,
  onRowInputBlur,
  onChange,
  onCreateAccountButtonClick,
  renderJobCombobox,
  isSystem,
  shouldShowTaxOptions,
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
    jobId,
    taxCodeId,
  } = data;

  return (
    <LineItemTable.Row id={index} index={index} {...feelixInjectedProps}>
      <AccountCombobox
        label="Accounts"
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() =>
          onCreateAccountButtonClick(onComboboxChange('accountId', onChange))
        }
        onChange={onComboboxChange('accountId', onChange)}
        disabled={isTableDisabled || isSystem}
      />
      <AmountInput
        label="Debit amount"
        name="debitAmount"
        value={displayDebitAmount}
        disabled={isDebitDisabled || isTableDisabled || isSystem}
        onChange={onAmountInputChange('debitAmount', onChange)}
        onBlur={onRowInputBlur}
      />
      <AmountInput
        label="Credit amount"
        name="creditAmount"
        value={displayCreditAmount}
        disabled={isCreditDisabled || isTableDisabled || isSystem}
        onChange={onAmountInputChange('creditAmount', onChange)}
        onBlur={onRowInputBlur}
      />
      <AmountInput
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={onAmountInputChange('quantity', onChange)}
        onBlur={onRowInputBlur}
        numeralDecimalScaleMin={0}
        numeralDecimalScaleMax={6}
        numeralIntegerScale={13}
        disabled={isTableDisabled || isSystem}
      />
      <TextArea
        rows={1}
        autoSize
        label="Description"
        maxLength={1000}
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        disabled={isTableDisabled || isSystem}
      />
      {renderJobCombobox({
        name: 'jobId',
        label: 'Job',
        hideLabel: true,
        selectedId: jobId,
        disabled: isTableDisabled || isSystem,
        onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
        left: true,
      })}
      {shouldShowTaxOptions && (
        <TaxCodeCombobox
          label="Tax codes"
          items={taxCodeOptions}
          selectedId={taxCodeId}
          onChange={onComboboxChange('taxCodeId', onChange)}
          disabled={isTableDisabled || isSystem}
        />
      )}
    </LineItemTable.Row>
  );
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
    taxCodeOptions: getTaxCodeOptions(state),
    accountOptions: getAccountOptions(state),
    isTableDisabled: getIsTableDisabled(state),
    isSystem: getIsSystem(state),
    shouldShowTaxOptions: getShouldShowTaxOptions(state),
  });
};

export default connect(makeMapRowStateToProps)(GeneralJournalDetailRow);
