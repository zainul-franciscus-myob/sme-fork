import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsReadOnly,
  getIsSubmitting,
  getTaxCodeOptions,
} from '../../selectors/RecurringInvoiceSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import RecurringInvoiceTableReadOnlyRowItem from '../RecurringInvoiceTableReadOnlyRowItem';
import SalesLineType from '../../../types/SalesLineType';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

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

const handleAmountInputChange = (onChange) => (e) => {
  onChange({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  });
};

const handleAmountInputBlur = (handler, index) => (e) => {
  const { name: key, rawValue: value } = e.target;

  handler({ index, key, value });
};

const RecurringInvoiceServiceTableRow = ({
  invoiceLine,
  taxCodeOptions,
  index,
  isSubmitting,
  isReadOnly,
  accountOptions,
  onChange,
  onUpdateAmount,
  onAddAccount,
  renderJobCombobox,
  ...feelixInjectedProps
}) => {
  const {
    type,
    description,
    accountId,
    jobId,
    taxCodeId,
    amount,
  } = invoiceLine;

  const onChangeAccountId = onComboboxChange('accountId', onChange);

  if ([SalesLineType.HEADER, SalesLineType.SUB_TOTAL].includes(type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <RecurringInvoiceTableReadOnlyRowItem value={invoiceLine.description} />
        <RecurringInvoiceTableReadOnlyRowItem />
        <RecurringInvoiceTableReadOnlyRowItem value={invoiceLine.amount} />
        <RecurringInvoiceTableReadOnlyRowItem />
        <RecurringInvoiceTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

  return (
    <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
      <TextArea
        name="description"
        autoSize
        value={description}
        onChange={onChange}
        disabled={isSubmitting || isReadOnly}
        maxLength={1000}
      />
      <AccountCombobox
        label="Account"
        hideLabel
        onChange={onChangeAccountId}
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() => onAddAccount(onChangeAccountId)}
        disabled={isSubmitting || isReadOnly}
      />
      <Calculator
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        textAlign="right"
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        disabled={isSubmitting || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {renderJobCombobox({
        name: 'jobId',
        label: 'Job',
        hideLabel: true,
        selectedId: jobId,
        disabled: isSubmitting || isReadOnly,
        onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
        left: true,
      })}
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isSubmitting || isReadOnly}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  isSubmitting: getIsSubmitting(state),
  isReadOnly: getIsReadOnly(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(RecurringInvoiceServiceTableRow);
