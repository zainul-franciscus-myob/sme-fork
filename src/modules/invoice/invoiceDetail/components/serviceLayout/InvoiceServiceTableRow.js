import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsReadOnlyLayout,
  getIsSubmitting,
  getJobOptions,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import JobCombobox from '../../../../../components/combobox/JobCombobox';
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
  isReadOnlyLayout,
  accountOptions,
  jobOptions,
  onChange,
  onUpdateAmount,
  onAddAccount,
  isInvoiceJobColumnEnabled,
  ...feelixInjectedProps
}) => {
  const {
    description,
    accountId,
    jobId,
    taxCodeId,
    amount,
  } = invoiceLine;

  const onChangeAccountId = onComboboxChange('accountId', onChange);
  const onChangeJobId = onComboboxChange('jobId', onChange);

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
        disabled={isSubmitting || isReadOnlyLayout}
      />
      <AccountCombobox
        label="Account"
        hideLabel
        onChange={onChangeAccountId}
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() => onAddAccount(onChangeAccountId)}
        disabled={isSubmitting || isReadOnlyLayout}
      />
      <Calculator
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        textAlign="right"
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        disabled={isSubmitting || isReadOnlyLayout}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {isInvoiceJobColumnEnabled && <JobCombobox
        label="Job"
        onChange={onChangeJobId}
        items={jobOptions}
        selectedId={jobId}
        disabled={isSubmitting || isReadOnlyLayout}
        allowClear
        left
      />}
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isSubmitting || isReadOnlyLayout}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  isSubmitting: getIsSubmitting(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
  accountOptions: getAccountOptions(state),
  jobOptions: getJobOptions(state),
});

export default connect(mapStateToProps)(InvoiceServiceTableRow);
