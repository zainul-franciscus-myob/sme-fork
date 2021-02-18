import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getBillLine,
  getIsNewLine,
  getIsReadOnly,
  getIsSubmitting,
  getTaxCodeOptions,
} from '../selectors/RecurringBillSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../components/Calculator/Calculator';
import PurchaseLineType from '../types/PurchaseLineType';
import RecurringBillTableReadOnlyRowItem from './RecurringBillTableReadOnlyRowItem';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const handleComboboxChange = (handler, name) => (item) =>
  handler({
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

  handler({ index, key, value });
};

const handleAutoCompleteItemChange = (handler, name) => (item) => {
  handler({
    target: {
      name,
      value: item ? item.id : '',
    },
  });
};

const RecurringBillServiceTableRow = ({
  billLine,
  index,
  accountOptions,
  taxCodeOptions,
  isNewLine,
  isSubmitting,
  isReadOnly,
  onChange,
  onRowInputBlur,
  onAddAccount,
  onAddJob,
  renderJobCombobox,
  ...feelixInjectedProps
}) => {
  if (
    [PurchaseLineType.HEADER, PurchaseLineType.SUB_TOTAL].includes(
      billLine.type
    )
  ) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <RecurringBillTableReadOnlyRowItem value={billLine.description} />
        <RecurringBillTableReadOnlyRowItem />
        <RecurringBillTableReadOnlyRowItem value={billLine.amount} />
        <RecurringBillTableReadOnlyRowItem />
        <RecurringBillTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

  const { description, accountId, jobId, taxCodeId, amount } = billLine;

  return (
    <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
      <TextArea
        name="description"
        value={description}
        onChange={onChange}
        maxLength={1000}
        autoSize
        disabled={isSubmitting || isReadOnly}
      />
      <AccountCombobox
        onChange={handleComboboxChange(onChange, 'accountId')}
        addNewAccount={() =>
          onAddAccount(handleComboboxChange(onChange, 'accountId'))
        }
        items={accountOptions}
        selectedId={accountId}
        disabled={isSubmitting || isReadOnly}
      />
      <Calculator
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        textAlign="right"
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
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isSubmitting || isReadOnly}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
  accountOptions: getAccountOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isSubmitting: getIsSubmitting(state, props),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(RecurringBillServiceTableRow);
