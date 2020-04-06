import { Table } from '@myob/myob-widgets';
import React from 'react';
import classnames from 'classnames';

import { getLeaveWarning } from '../EmployeePayListSelectors';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import HoursInput from '../../../../../components/autoFormatter/HoursInput/HoursInput';
import styles from './EmployeeRecalculatePayTableRow.module.css';

const handleInputChange = (handler, employeeId, payItemId) => (e) => {
  const { name, rawValue } = e.target;
  handler({
    employeeId, payItemId, key: name, value: rawValue,
  });
};

const LeaveWarningLine = ({
  label,
  value,
}) => (
  <>
    <br />
    {`${label}: `}
    <strong>
      {`${value} hrs`}
    </strong>
  </>
);

const getWarningMessage = (leaveWarning, name) => (
  leaveWarning
    ? (
      <p>
        {`Paying this leave will result in a negative leave balance for ${name}.`}
        <br />
        <LeaveWarningLine label="Current balance" value={leaveWarning.currentLeaveBalance} />
        <LeaveWarningLine label="Accrued this pay" value={leaveWarning.leaveAccruedThisPay} />
        <LeaveWarningLine label="Leave being paid" value={leaveWarning.leaveBeingPaid} />
        <LeaveWarningLine label="Projected balance" value={leaveWarning.projectedLeaveBalance} />
      </p>
    )
    : null
);

const AmountInputField = ({
  value,
  employeeId,
  payItemId,
  type,
  isSubmitting,
  onChange,
  onBlur,
}) => (
  <div className={classnames({ [styles.hidden]: type === 'Entitlement' })}>
    <AmountInput
      name="amount"
      label="Amount"
      hideLabel
      textAlign="right"
      value={value}
      disabled={isSubmitting || (type === 'Entitlement' || type === 'HourlyWage')}
      onChange={handleInputChange(onChange, employeeId, payItemId)}
      onBlur={handleInputChange(onBlur, employeeId, payItemId)}
    />
  </div>
);

const HoursInputField = ({
  value,
  employeeId,
  employeeName,
  payItemId,
  onChange,
  onBlur,
  leaveWarning,
  isSubmitting,
}) => (
  <HoursInput
    name="hours"
    label="Hours"
    hideLabel
    numeralPositiveOnly
    textAlign="right"
    value={value}
    onChange={handleInputChange(onChange, employeeId, payItemId)}
    onBlur={handleInputChange(onBlur, employeeId, payItemId)}
    warningBody={getWarningMessage(getLeaveWarning(value, leaveWarning), employeeName)}
    disabled={isSubmitting}
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
    <HoursInputField
      value={hours}
      employeeId={employeeId}
      employeeName={employeeName}
      payItemId={payItemId}
      onChange={onChange}
      onBlur={onBlur}
      leaveWarning={leaveWarning}
      isSubmitting={isSubmitting}
    />);

  const amountRowItem = (
    <AmountInputField
      value={amount}
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
