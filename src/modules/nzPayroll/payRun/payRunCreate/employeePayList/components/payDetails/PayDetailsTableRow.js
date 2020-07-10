import { FormHorizontal, Table } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../../components/autoFormatter/AmountInput/AmountInput';
import HoursInput from '../../../../../../../components/autoFormatter/HoursInput/HoursInput';

const handleInputChange = (handler, employeeId, payItemId) => (e) => {
  const { name, rawValue } = e.target;
  handler({
    employeeId, payItemId, key: name, value: rawValue,
  });
};

const AmountInputField = ({
  value,
  employeeId,
  payItemId,
  type,
  isSubmitting,
  onChange,
  onBlur,
}) => (
  <div>
    <AmountInput
      name="amount"
      label="Amount"
      hideLabel
      textAlign="right"
      value={value}
      disabled={isSubmitting || (type === 'HourlyWage' || type === 'KiwiSaver')}
      onChange={handleInputChange(onChange, employeeId, payItemId)}
      onBlur={handleInputChange(onBlur, employeeId, payItemId)}
    />
  </div>
);

const HoursInputField = ({
  value,
  employeeId,
  payItemId,
  onChange,
  onBlur,
  isSubmitting,
}) => (
  <FormHorizontal>
    <HoursInput
      name="hours"
      label="Hours"
      numeralPositiveOnly
      textAlign="right"
      value={value}
      onChange={handleInputChange(onChange, employeeId, payItemId)}
      onBlur={handleInputChange(onBlur, employeeId, payItemId)}
      disabled={isSubmitting}
    />
  </FormHorizontal>
);

const PayDetailsTableRow = ({
  tableConfig,
  employeeId,
  employeeName,
  entry,
  onChange,
  onBlur,
}) => {
  const hourRowItem = (
    <HoursInputField
      value={entry.quantity}
      employeeId={employeeId}
      employeeName={employeeName}
      payItemId={entry.payItemId}
      onChange={onChange}
      onBlur={onBlur}
      leaveWarning={entry.leaveWarning}
      isSubmitting={entry.isSubmitting}
    />);

  const amountRowItem = (
    <AmountInputField
      value={entry.amount}
      employeeId={employeeId}
      payItemId={entry.payItemId}
      type={entry.type}
      isSubmitting={entry.isSubmitting}
      onChange={onChange}
      onBlur={onBlur}
    />);

  return (
    <Table.Row key={entry.payItemId}>
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        {entry.payItemName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.hours}>
        {entry.shouldShowQuantity && hourRowItem}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>{amountRowItem}</Table.RowItem>
    </Table.Row>
  );
};

export default PayDetailsTableRow;
