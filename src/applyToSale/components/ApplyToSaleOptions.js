import {
  Checkbox,
  Columns,
  DatePicker,
  Input,
  ReadOnly,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmount,
  getCustomerName,
  getDate,
  getDescription,
  getIncludeClosedSales,
  getIsCreating,
  getReference,
} from '../applyToSaleSelectors';

const onCheckBoxChange = handler => ({ target }) => {
  const { name, checked } = target;
  handler({ key: name, value: checked });
};

const onTextFieldChange = handler => ({ target }) => {
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
  includeClosedSales,
  isCreating,
  onUpdateApplyToSaleOption,
}) => (
  <Columns type="two">
    <div>
      <ReadOnly name="customerName" label="Customer">{customerName}</ReadOnly>
      {isCreating && <ReadOnly name="amount" label="Amount">{amount}</ReadOnly>}
    </div>
    <Input
      name="reference"
      label="Reference"
      value={reference}
      onChange={onTextFieldChange(onUpdateApplyToSaleOption)}
      maxLength={8}
      disabled={!isCreating}
    />
    <TextArea
      resize="vertical"
      name="description"
      label="Description"
      value={description}
      onChange={onTextFieldChange(onUpdateApplyToSaleOption)}
      maxLength={255}
      disabled={!isCreating}
    />
    <DatePicker
      label="Date"
      name="date"
      value={date}
      onSelect={onDateChange(onUpdateApplyToSaleOption, 'date')}
      disabled={!isCreating}
    />
    <Checkbox
      name="includeClosedSales"
      label="Include closed sales"
      checked={includeClosedSales}
      onChange={onCheckBoxChange(onUpdateApplyToSaleOption)}
      disabled={!isCreating}
    />
  </Columns>
);

const mapStateToProps = state => ({
  customerName: getCustomerName(state),
  amount: getAmount(state),
  reference: getReference(state),
  description: getDescription(state),
  date: getDate(state),
  includeClosedSales: getIncludeClosedSales(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(ApplyToSaleOptions);
