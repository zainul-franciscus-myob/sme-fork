import { Table } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';

const handleInputChange = (handler, employeeId, payItemId) => (e) => {
  const { name, rawValue } = e.target;
  handler({
    employeeId, payItemId, key: name, value: rawValue,
  });
};

const HoursOrAmountInputField = ({
  name, label, value, decimalScale, employeeId, payItemId, type, isSubmitting, onChange, onBlur,
}) => (
  <AmountInput
    name={name}
    label={label}
    hideLabel
    textAlign="right"
    value={value}
    disabled={isSubmitting || (type === 'Entitlement' && name === 'amount')}
    onChange={handleInputChange(onChange, employeeId, payItemId)}
    onBlur={handleInputChange(onBlur, employeeId, payItemId)}
    numeralIntegerScale={13}
    decimalScale={decimalScale}
  />
);

const EmployeeRecalculatePayTableRow = ({
  tableConfig,
  employeeId,
  entry: {
    payItemId,
    payItemName,
    type,
    hours,
    amount,
    shouldShowHours,
    isSubmitting,
  },
  onChange,
  onBlur,
}) => {
  const hourRowItem = (
    <HoursOrAmountInputField
      name="hours"
      label="Hours"
      value={hours}
      decimalScale={3}
      employeeId={employeeId}
      payItemId={payItemId}
      type={type}
      isSubmitting={isSubmitting}
      onChange={onChange}
      onBlur={onBlur}
    />);

  const amountRowItem = (
    <HoursOrAmountInputField
      name="amount"
      label="Amount"
      value={amount}
      decimalScale={2}
      employeeId={employeeId}
      payItemId={payItemId}
      type={type}
      isSubmitting={isSubmitting}
      onChange={onChange}
      onBlur={onBlur}
    />);

  return (
    <Table.Row key={payItemId}>
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        {payItemName}
      </Table.RowItem>
      {shouldShowHours && (<Table.RowItem {...tableConfig.hours}>{hourRowItem}</Table.RowItem>)}
      <Table.RowItem {...tableConfig.amount}>{amountRowItem}</Table.RowItem>
    </Table.Row>
  );
};

export default EmployeeRecalculatePayTableRow;
