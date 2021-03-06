import { Combobox, DetailHeader, Input, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmount,
  getCustomerName,
  getDate,
  getDescription,
  getIsBeforeStartOfFinancialYear,
  getIsCreating,
  getReference,
} from '../applyToSaleSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import DatePicker from '../../../components/DatePicker/DatePicker';

const onTextFieldChange = (handler) => ({ target }) => {
  const { name, value } = target;
  handler({ key: name, value });
};

const onDateChange = (handler, key) => ({ value }) => handler({ key, value });

const ApplyToSaleOptions = ({
  customerName,
  amount,
  reference,
  description,
  date,
  isCreating,
  onUpdateApplyToSaleOption,
  isBeforeStartOfFinancialYear,
}) => {
  const requiredLabel = isCreating ? 'This is required' : undefined;

  const primary = (
    <>
      <Combobox
        name="customer"
        label="Customer"
        items={[{ customerName }]}
        selected={{ customerName }}
        metaData={[{ columnName: 'customerName', showData: true }]}
        disabled
      />
      <AmountInput
        name="amount"
        label="Credit ($)"
        value={amount}
        textAlign="right"
        width="sm"
        disabled
      />
      <TextArea
        resize="vertical"
        name="description"
        label="Description of transaction"
        value={description}
        onChange={onTextFieldChange(onUpdateApplyToSaleOption)}
        maxLength={255}
        disabled={!isCreating}
        rows={1}
        autoSize
      />
    </>
  );

  const secondary = (
    <>
      <Input
        name="reference"
        label="Reference number"
        value={reference}
        onChange={onTextFieldChange(onUpdateApplyToSaleOption)}
        maxLength={13}
        requiredLabel={requiredLabel}
        disabled={!isCreating}
      />
      <DatePicker
        label="Date"
        name="date"
        value={date}
        displayWarning={isBeforeStartOfFinancialYear}
        warningMessage={'The date is set to a previous financial year'}
        onSelect={onDateChange(onUpdateApplyToSaleOption, 'date')}
        disabled={!isCreating}
      />
    </>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = (state) => ({
  customerName: getCustomerName(state),
  amount: getAmount(state),
  reference: getReference(state),
  description: getDescription(state),
  date: getDate(state),
  isCreating: getIsCreating(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
});

export default connect(mapStateToProps)(ApplyToSaleOptions);
