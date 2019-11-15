import { Table } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';

const handleInputChange = (handler, employeeId, payItemId) => (e) => {
  const { name, rawValue } = e.target;
  handler({
    employeeId, payItemId, key: name, value: rawValue,
  });
};
const getWarningMessage = (leaveWarning, name) => (
  leaveWarning && leaveWarning.projectedLeaveBalance < 0
    ? `Paying this leave will result in a negative leave balance ${leaveWarning.projectedLeaveBalance} hours for ${name}.`
    : null
);

const HoursOrAmountInputField = ({
  name,
  label,
  value,
  decimalScale,
  employeeId,
  employeeName,
  payItemId,
  type,
  isSubmitting,
  onChange,
  onBlur,
  leaveWarning,
}) => (
  <AmountInput
    name={name}
    label={label}
    hideLabel
    textAlign="right"
    value={value}
    disabled={isSubmitting || ((type === 'Entitlement' || type === 'HourlyWage') && name === 'amount')}
    onChange={handleInputChange(onChange, employeeId, payItemId)}
    onBlur={handleInputChange(onBlur, employeeId, payItemId)}
    numeralIntegerScale={13}
    decimalScale={decimalScale}
    warningMessage={getWarningMessage(leaveWarning, employeeName)}
    warningMessageInline
  />
);

const EmployeeRecalculatePayTableRow = ({
  tableConfig,
  employeeId,
  employeeName,
  entry: {
    payItemId,
    payItemName,
    type,
    hours,
    amount,
    shouldShowHours,
    isSubmitting,
    leaveWarning,
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
      employeeName={employeeName}
      payItemId={payItemId}
      leaveWarning={leaveWarning}
      type={type}
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
