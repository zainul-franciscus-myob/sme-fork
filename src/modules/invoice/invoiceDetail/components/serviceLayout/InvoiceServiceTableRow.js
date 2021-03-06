import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsPreConversion,
  getIsReadOnly,
  getIsShowIsTaxInclusiveAndTaxCodeColumn,
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

const InvoiceServiceTableRow = ({
  invoiceLine,
  taxCodeOptions,
  index,
  isSubmitting,
  isReadOnly,
  isPreConversion,
  accountOptions,
  onChange,
  onUpdateAmount,
  onAddAccount,
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
  } = invoiceLine;

  const onChangeAccountId = onComboboxChange('accountId', onChange);

  if ([InvoiceLineType.HEADER, InvoiceLineType.SUB_TOTAL].includes(type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <InvoiceTableReadOnlyRowItem value={invoiceLine.description} />
        <InvoiceTableReadOnlyRowItem />
        <InvoiceTableReadOnlyRowItem value={invoiceLine.amount} />
        <InvoiceTableReadOnlyRowItem />
        {isShowIsTaxInclusiveAndTaxCodeColumn && (
          <InvoiceTableReadOnlyRowItem />
        )}
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
        disabled={isSubmitting || isReadOnly || isPreConversion}
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
      {isShowIsTaxInclusiveAndTaxCodeColumn && (
        <TaxCodeCombobox
          label="Tax code"
          hideLabel
          onChange={onComboboxChange('taxCodeId', onChange)}
          items={taxCodeOptions}
          selectedId={taxCodeId}
          disabled={isSubmitting || isReadOnly}
        />
      )}
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  isSubmitting: getIsSubmitting(state),
  isReadOnly: getIsReadOnly(state),
  isPreConversion: getIsPreConversion(state),
  accountOptions: getAccountOptions(state),
  isShowIsTaxInclusiveAndTaxCodeColumn: getIsShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(InvoiceServiceTableRow);
