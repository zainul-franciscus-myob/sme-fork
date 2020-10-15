import { FormHorizontal, Table } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../../components/autoFormatter/AmountInput/AmountInput';
import HoursInput from '../../../../../../../components/autoFormatter/HoursInput/HoursInput';

const handleInputChange = (handler, employeeId, payItemId) => (e) => {
  const { name, rawValue } = e.target;
  handler({
    employeeId,
    payItemId,
    key: name,
    value: rawValue,
  });
};

const AmountInputField = ({
  value,
  employeeId,
  payItemId,
  isDisabled,
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
      disabled={isDisabled}
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
  isDisabled,
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
      disabled={isDisabled}
    />
  </FormHorizontal>
);

const typeAmountInputDisabled = (type) =>
  type === 'HourlyWage' ||
  type === 'KiwiSaverEmployers' ||
  type === 'KiwiSaverEmployee';

const PayDetailsTableRow = ({
  tableConfig,
  employeeId,
  employeeName,
  entry,
  onChange,
  onBlur,
  disableAmountInput,
}) => {
  const hourRowItem = (
    <HoursInputField
      value={entry.quantity}
      employeeId={employeeId}
      employeeName={employeeName}
      payItemId={entry.payrollCategoryId}
      onChange={onChange}
      onBlur={onBlur}
      leaveWarning={entry.leaveWarning}
      isDisabled={entry.isSubmitting}
    />
  );

  const amountRowItem = (
    <AmountInputField
      value={entry.amount}
      employeeId={employeeId}
      payItemId={entry.payrollCategoryId}
      onChange={onChange}
      onBlur={onBlur}
      isDisabled={
        entry.isSubmitting ||
        disableAmountInput ||
        typeAmountInputDisabled(entry.payrollCategoryType)
      }
    />
  );

  return (
    <Table.Row key={entry.payrollCategoryId}>
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        {entry.payrollCategoryName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.quantity}>
        {entry.shouldShowQuantity && hourRowItem}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>{amountRowItem}</Table.RowItem>
    </Table.Row>
  );
};

export default PayDetailsTableRow;
