import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsSubmitting,
  getItemOptions,
  getJobOptions,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
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
    itemId,
    description,
    accountId,
    unitOfMeasure,
    units,
    displayUnitPrice,
    displayDiscount,
    displayAmount,
    jobId,
    taxCodeId,
  },
  taxCodeOptions,
  accountOptions,
  jobOptions,
  itemOptions,
  isSubmitting,
  onUpdateAmount,
  onAddItemButtonClick,
  onAddAccount,
  isInvoiceJobColumnEnabled,
  ...feelixInjectedProps
}) => {
  const onChangeAccountId = onComboboxChange('accountId', onChange);
  const onChangeItemId = onComboboxChange('itemId', onChange);
  const onChangeJobId = onComboboxChange('jobId', onChange);

  return (
    <LineItemTable.Row {...feelixInjectedProps} id={index} index={index}>
      <ItemCombobox
        addNewItem={() => onAddItemButtonClick(onChangeItemId)}
        name="itemId"
        items={itemOptions}
        selectedId={itemId}
        onChange={onChangeItemId}
        disabled={isSubmitting}
      />

      <TextArea
        name="description"
        autoSize
        value={description}
        onChange={onChange}
        disabled={isSubmitting}
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
        disabled={isSubmitting}
      />

      <Input
        name="unitOfMeasure"
        value={unitOfMeasure}
        onChange={onChange}
        disabled={isSubmitting}
        maxLength={5}
      />

      <AmountInput
        name="units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        disabled={isSubmitting}
        numeralDecimalScaleMax={6}
      />

      <AmountInput
        name="unitPrice"
        value={displayUnitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={6}
      />

      <AmountInput
        name="discount"
        value={displayDiscount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />

      <AmountInput
        name="amount"
        value={displayAmount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onUpdateAmount, index)}
        textAlign="right"
        disabled={isSubmitting}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />

      {isInvoiceJobColumnEnabled && <JobCombobox
        items={jobOptions}
        selectedId={jobId}
        onChange={onChangeJobId}
        disabled={isSubmitting}
        allowClear
        left
      />}

      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isSubmitting}
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
});

export default connect(mapStateToProps)(InvoiceItemTableRow);
