import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsReadOnly,
  getIsSubmitting,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import InvoiceLineType from '../../types/InvoiceLineType';
import InvoiceTableReadOnlyRowItem from '../InvoiceTableReadOnlyRowItem';
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

const InvoiceItemTableRow = ({
  index,
  onChange,
  invoiceLine: {
    type,
    itemId,
    description,
    accountId,
    unitOfMeasure,
    units,
    unitPrice,
    discount,
    amount,
    jobId,
    taxCodeId,
  },
  taxCodeOptions,
  accountOptions,
  isSubmitting,
  isReadOnly,
  onUpdateAmount,
  onAddAccount,
  isInvoiceJobColumnEnabled,
  renderItemCombobox,
  renderJobCombobox,
  ...feelixInjectedProps
}) => {
  const onChangeAccountId = onComboboxChange('accountId', onChange);

  if ([InvoiceLineType.HEADER, InvoiceLineType.SUB_TOTAL].includes(type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <InvoiceTableReadOnlyRowItem />
        <InvoiceTableReadOnlyRowItem value={description} />
        <InvoiceTableReadOnlyRowItem />
        <InvoiceTableReadOnlyRowItem />
        <InvoiceTableReadOnlyRowItem />
        <InvoiceTableReadOnlyRowItem />
        <InvoiceTableReadOnlyRowItem />
        <InvoiceTableReadOnlyRowItem value={amount} />
        {isInvoiceJobColumnEnabled && <InvoiceTableReadOnlyRowItem />}
        <InvoiceTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

  return (
    <LineItemTable.Row {...feelixInjectedProps} id={index} index={index}>
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
        label="accountId"
        hideLabel
        onChange={onChangeAccountId}
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() => onAddAccount(onChangeAccountId)}
        disabled={isSubmitting || isReadOnly}
      />

      <Input
        name="unitOfMeasure"
        value={unitOfMeasure}
        onChange={onChange}
        disabled={isSubmitting || isReadOnly}
        maxLength={5}
      />

      <Calculator
        name="units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        disabled={isSubmitting || isReadOnly}
        numeralDecimalScaleMin={0}
        numeralDecimalScaleMax={6}
      />

      <Calculator
        name="unitPrice"
        value={unitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={6}
      />

      <Calculator
        name="discount"
        value={discount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />

      <Calculator
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {isInvoiceJobColumnEnabled &&
        renderJobCombobox({
          name: 'jobId',
          label: 'Job',
          hideLabel: true,
          selectedId: jobId,
          disabled: isSubmitting || isReadOnly,
          onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
        })}
      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isSubmitting || isReadOnly}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  isSubmitting: getIsSubmitting(state),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(InvoiceItemTableRow);
