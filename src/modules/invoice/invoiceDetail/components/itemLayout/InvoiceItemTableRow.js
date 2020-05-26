import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsReadOnlyLayout,
  getIsSubmitting,
  getItemOptions,
  getJobOptions,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import InvoiceLineType from '../../types/InvoiceLineType';
import InvoiceTableReadOnlyRowItem from '../InvoiceTableReadOnlyRowItem';
import ItemCombobox from '../../../../../components/combobox/ItemCombobox';
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
  jobOptions,
  itemOptions,
  isSubmitting,
  isReadOnlyLayout,
  onUpdateAmount,
  onAddItemButtonClick,
  onAddAccount,
  onAddJob,
  isInvoiceJobColumnEnabled,
  ...feelixInjectedProps
}) => {
  const onChangeAccountId = onComboboxChange('accountId', onChange);
  const onChangeItemId = onComboboxChange('itemId', onChange);
  const onChangeJobId = onComboboxChange('jobId', onChange);

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
      <ItemCombobox
        addNewItem={() => onAddItemButtonClick(onChangeItemId)}
        name="itemId"
        items={itemOptions}
        selectedId={itemId}
        onChange={onChangeItemId}
        disabled={isSubmitting || isReadOnlyLayout}
      />

      <TextArea
        name="description"
        autoSize
        value={description}
        onChange={onChange}
        disabled={isSubmitting || isReadOnlyLayout}
      />

      <AccountCombobox
        label="accountId"
        hideLabel
        onChange={onChangeAccountId}
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() => onAddAccount(
          onChangeAccountId,
        )}
        disabled={isSubmitting || isReadOnlyLayout}
      />

      <Input
        name="unitOfMeasure"
        value={unitOfMeasure}
        onChange={onChange}
        disabled={isSubmitting || isReadOnlyLayout}
        maxLength={5}
      />

      <Calculator
        name="units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        disabled={isSubmitting || isReadOnlyLayout}
        numeralDecimalScaleMin={0}
        numeralDecimalScaleMax={6}
      />

      <Calculator
        name="unitPrice"
        value={unitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting || isReadOnlyLayout}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={6}
      />

      <Calculator
        name="discount"
        value={discount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting || isReadOnlyLayout}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />

      <Calculator
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting || isReadOnlyLayout}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />

      {isInvoiceJobColumnEnabled && <JobCombobox
        items={jobOptions}
        selectedId={jobId}
        onChange={onChangeJobId}
        addNewJob={() => onAddJob(onChangeJobId)}
        disabled={isSubmitting || isReadOnlyLayout}
        allowClear
        left
      />}

      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isSubmitting || isReadOnlyLayout}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  isSubmitting: getIsSubmitting(state),
  taxCodeOptions: getTaxCodeOptions(state),
  itemOptions: getItemOptions(state),
  accountOptions: getAccountOptions(state),
  jobOptions: getJobOptions(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(InvoiceItemTableRow);
