import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsAccountComboboxDisabled,
  getIsCalculating,
  getIsReadOnly,
  getIsShowIsTaxInclusiveAndTaxCodeColumn,
  getQuoteLine,
  getTaxCodeOptions,
} from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import QuoteLineType from '../../QuoteLineType';
import QuoteTableReadOnlyRowItem from '../QuoteTableReadOnlyRowItem';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => (item) =>
  onChange({
    target: {
      name,
      value: item.id,
    },
  });

const handleAmountInputChange = (handler) => (e) =>
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  });

const handleAmountInputBlur = (handler, index) => (e) => {
  const { name: key, rawValue: value } = e.target;

  handler(index, key, value);
};

const handleAutoCompleteItemChange = (handler, name) => (item) => {
  handler({
    target: {
      name,
      value: item ? item.id : '',
    },
  });
};

const QuoteServiceTableRow = ({
  quoteLine,
  index,
  jobOptions,
  taxCodeOptions,
  accountOptions,
  onChange,
  onRowInputBlur,
  onAddAccount,
  onAddJob,
  isAccountComboboxDisabled,
  isCalculating,
  isReadOnly,
  renderJobCombobox,
  isShowIsTaxInclusiveAndTaxCodeColumn,
  ...feelixInjectedProps
}) => {
  const {
    type,
    description,
    accountId,
    jobId,
    taxCodeId,
    amount,
    displayAmount,
  } = quoteLine;

  if ([QuoteLineType.HEADER, QuoteLineType.SUB_TOTAL].includes(type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <QuoteTableReadOnlyRowItem value={description} />
        <QuoteTableReadOnlyRowItem />
        <QuoteTableReadOnlyRowItem value={displayAmount} />
        <QuoteTableReadOnlyRowItem />
        {isShowIsTaxInclusiveAndTaxCodeColumn && <QuoteTableReadOnlyRowItem />}
      </LineItemTable.Row>
    );
  }

  return (
    <LineItemTable.Row
      {...feelixInjectedProps}
      index={index}
      id={index}
      onRemove={isCalculating ? undefined : feelixInjectedProps.onRemove}
    >
      <TextArea
        label="Line description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        autoSize
        disabled={isReadOnly}
        maxLength={1000}
      />
      <AccountCombobox
        label="Allocate to"
        onChange={onComboboxChange('accountId', onChange)}
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() =>
          onAddAccount(onComboboxChange('accountId', onChange))
        }
        disabled={isAccountComboboxDisabled || isCalculating || isReadOnly}
      />
      <Calculator
        label="Amount ($)"
        hideLabel
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        textAlign="right"
        disabled={isCalculating || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {renderJobCombobox({
        name: 'jobId',
        label: 'Job',
        hideLabel: true,
        selectedId: jobId,
        disabled: isCalculating || isReadOnly,
        onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
        left: true,
      })}
      {isShowIsTaxInclusiveAndTaxCodeColumn && (
        <TaxCodeCombobox
          label="Tax code"
          onChange={onComboboxChange('taxCodeId', onChange)}
          items={taxCodeOptions}
          selectedId={taxCodeId}
          disabled={isCalculating || isReadOnly}
        />
      )}
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isAccountComboboxDisabled: getIsAccountComboboxDisabled(state),
  isCalculating: getIsCalculating(state),
  isReadOnly: getIsReadOnly(state),
  isShowIsTaxInclusiveAndTaxCodeColumn: getIsShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(QuoteServiceTableRow);
