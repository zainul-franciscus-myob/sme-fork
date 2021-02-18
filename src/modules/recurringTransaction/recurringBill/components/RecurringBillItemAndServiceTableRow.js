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

const handleComboboxChange = (handler, name) => (e) =>
  handler({
    target: {
      name,
      value: e.id,
    },
  });

const handleAutoCompleteItemChange = (handler, name) => (item) =>
  handler({
    target: {
      name,
      value: item ? item.id : '',
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

const RecurringBillItemAndServiceTableRow = ({
  index,
  billLine,
  accountOptions,
  taxCodeOptions,
  isSubmitting,
  isNewLine,
  isReadOnly,
  onChange,
  onAddAccount,
  onAddJob,
  onRowInputBlur,
  renderItemCombobox,
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
    units,
    unitPrice,
    itemId,
    discount,
  } = billLine;

  if ([PurchaseLineType.HEADER, PurchaseLineType.SUB_TOTAL].includes(type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <RecurringBillTableReadOnlyRowItem />
        <RecurringBillTableReadOnlyRowItem value={description} />
        <RecurringBillTableReadOnlyRowItem />
        <RecurringBillTableReadOnlyRowItem />
        <RecurringBillTableReadOnlyRowItem />
        <RecurringBillTableReadOnlyRowItem />
        <RecurringBillTableReadOnlyRowItem value={amount} />
        <RecurringBillTableReadOnlyRowItem />
        <RecurringBillTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

  return (
    <LineItemTable.Row id={index} index={index} {...feelixInjectedProps}>
      {renderItemCombobox({
        name: 'itemId',
        label: 'Item Id',
        hideLabel: true,
        selectedId: itemId,
        disabled: isSubmitting || isReadOnly,
        onChange: handleAutoCompleteItemChange(onChange, 'itemId'),
      })}
      <TextArea
        name="description"
        autoSize
        value={description}
        onChange={onChange}
        disabled={isSubmitting || isReadOnly}
        maxLength={1000}
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
        name="units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        disabled={isSubmitting || isReadOnly}
        numeralIntegerScale={12}
        numeralDecimalScaleMax={6}
      />
      <Calculator
        name="unitPrice"
        value={unitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        textAlign="right"
        disabled={isSubmitting || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={6}
      />
      <Calculator
        name="discount"
        value={discount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        textAlign="right"
        disabled={isSubmitting || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
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
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
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
  isSubmitting: getIsSubmitting(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(RecurringBillItemAndServiceTableRow);
