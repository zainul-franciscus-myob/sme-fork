import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsSubmitting,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const handleAmountInputChange = onChange => (e) => {
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
  accountOptions,
  onChange,
  onUpdateAmount,
  onAddAccount,
  ...feelixInjectedProps
}) => {
  const {
    description,
    accountId,
    taxCodeId,
    displayAmount,
  } = invoiceLine;

  const onChangeAccountId = onComboboxChange('accountId', onChange);

  return (
    <LineItemTable.Row
      index={index}
      id={index}
      {...feelixInjectedProps}
    >
      <TextArea
        name="description"
        autoSize
        value={description}
        onChange={onChange}
        disabled={isSubmitting}
      />
      <AccountCombobox
        label="Account"
        hideLabel
        onChange={onChangeAccountId}
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() => onAddAccount(onChangeAccountId)}
        disabled={isSubmitting}
      />
      <AmountInput
        label="Amount"
        hideLabel
        name="amount"
        value={displayAmount}
        textAlign="right"
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        disabled={isSubmitting}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isSubmitting}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  isSubmitting: getIsSubmitting(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(InvoiceServiceTableRow);
