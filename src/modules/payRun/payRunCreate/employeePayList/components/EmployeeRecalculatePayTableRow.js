import { Button, Icons, Spinner, Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getLeaveWarning,
  getModifyingEmployeeId,
  getModifyingKey,
  getModifyingPayItemId,
  getShouldShowOverAllocationError,
  getShouldShowUnderAllocationWarning,
} from '../EmployeePayListSelectors';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import HoursInput from '../../../../../components/autoFormatter/HoursInput/HoursInput';
import styles from './EmployeeRecalculatePayTableRow.module.css';

const underAllocationWarningMessage =
  "The entire amount of the pay item isn't allocated to a job.";
const overAllocationErrorMessage =
  'The total allocated job amount is more than the pay item amount.';

const handleInputChange = (handler, employeeId, payItemId) => (e) => {
  const { name, rawValue } = e.target;
  handler({
    employeeId,
    payItemId,
    key: name,
    value: rawValue,
  });
};

const LeaveWarningLine = ({ label, value }) => (
  <>
    <br />
    {`${label}: `}
    <strong>{`${value} hrs`}</strong>
  </>
);

const getWarningMessage = (leaveWarning, name) =>
  leaveWarning ? (
    <p>
      {`Paying this leave will result in a negative leave balance for ${name}.`}
      <br />
      <LeaveWarningLine
        label="Current balance"
        value={leaveWarning.currentLeaveBalance}
      />
      <LeaveWarningLine
        label="Accrued this pay"
        value={leaveWarning.leaveAccruedThisPay}
      />
      <LeaveWarningLine
        label="Leave being paid"
        value={leaveWarning.leaveBeingPaid}
      />
      <LeaveWarningLine
        label="Projected balance"
        value={leaveWarning.projectedLeaveBalance}
      />
    </p>
  ) : null;

const AmountInputField = ({
  value,
  employeeId,
  payItemId,
  type,
  isSubmitting,
  onChange,
  onBlur,
  featureToggles,
}) =>
  featureToggles && featureToggles.isAllowNegativesInPayRuns ? (
    <div className={classnames({ [styles.hidden]: type === 'Entitlement' })}>
      <AmountInput
        name="amount"
        label="Amount"
        hideLabel
        textAlign="right"
        value={value}
        disabled={isSubmitting || type === 'Entitlement'}
        onChange={handleInputChange(onChange, employeeId, payItemId)}
        onBlur={handleInputChange(onBlur, employeeId, payItemId)}
      />
    </div>
  ) : (
    <div className={classnames({ [styles.hidden]: type === 'Entitlement' })}>
      <AmountInput
        name="amount"
        label="Amount"
        hideLabel
        textAlign="right"
        value={value}
        disabled={
          isSubmitting || type === 'Entitlement' || type === 'HourlyWage'
        }
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
  featureToggles,
}) =>
  featureToggles && featureToggles.isAllowNegativesInPayRuns ? (
    <HoursInput
      name="hours"
      label="Hours"
      hideLabel
      textAlign="right"
      value={value}
      onChange={handleInputChange(onChange, employeeId, payItemId)}
      onBlur={handleInputChange(onBlur, employeeId, payItemId)}
      warningBody={getWarningMessage(
        getLeaveWarning(value, leaveWarning),
        employeeName
      )}
      disabled={isSubmitting}
    />
  ) : (
    <HoursInput
      name="hours"
      label="Hours"
      hideLabel
      numeralPositiveOnly
      textAlign="right"
      value={value}
      onChange={handleInputChange(onChange, employeeId, payItemId)}
      onBlur={handleInputChange(onBlur, employeeId, payItemId)}
      warningBody={getWarningMessage(
        getLeaveWarning(value, leaveWarning),
        employeeName
      )}
      disabled={isSubmitting}
    />
  );

const getAddJobLinkText = (jobs) => {
  if (jobs && jobs.length > 0) {
    if (jobs.length === 1) {
      return '1 job selected';
    }
    return `${jobs.length} jobs selected`;
  }

  return 'Add job';
};

const getAddJobLinkIcon = (jobs) => {
  if (jobs && jobs.length > 0) {
    return <Icons.Edit />;
  }
  return <Icons.Add />;
};

const AddJobLink = ({ onAddJobClick, icon, text, isSubmitting }) => (
  <Button
    key="addJob"
    type="link"
    icon={icon}
    onClick={onAddJobClick}
    disabled={isSubmitting}
  >
    {text}
  </Button>
);

const EmployeeRecalculatePayTableRow = ({
  tableConfig,
  employeeId,
  employeeName,
  entry,
  onChange,
  onBlur,
  onAddJob,
  featureToggles,
  modifyingPayItemId,
  modifyingKey,
  modifyingEmployeeId,
}) => {
  const hourRowItem = (
    <HoursInputField
      value={entry.hours}
      employeeId={employeeId}
      employeeName={employeeName}
      payItemId={entry.payItemId}
      onChange={onChange}
      onBlur={onBlur}
      leaveWarning={entry.leaveWarning}
      isSubmitting={entry.isSubmitting}
      featureToggles={featureToggles}
    />
  );

  const amountRowItem = (
    <AmountInputField
      value={entry.amount}
      employeeId={employeeId}
      payItemId={entry.payItemId}
      type={entry.type}
      isSubmitting={entry.isSubmitting}
      onChange={onChange}
      onBlur={onBlur}
      featureToggles={featureToggles}
    />
  );

  const onAddJobClicked = () => {
    onAddJob({ payItem: entry, employeeId });
  };

  const addJobRowItem = entry.type !== 'Entitlement' && (
    <AddJobLink
      onAddJobClick={onAddJobClicked}
      text={getAddJobLinkText(entry.jobs)}
      icon={getAddJobLinkIcon(entry.jobs)}
      isSubmitting={entry.isSubmitting}
    />
  );

  const shouldShowUnderAllocationWarning = getShouldShowUnderAllocationWarning(
    entry
  );
  const shouldShowOverAllocationError = getShouldShowOverAllocationError(entry);

  const underAllocationWarningTooltip = (
    <Tooltip
      id="underAllocationWarningMessage"
      className={styles.warningTooltip}
      triggerContent={<Icons.Warning />}
    >
      {underAllocationWarningMessage}
    </Tooltip>
  );

  const overAllocationErrorTooltip = (
    <Tooltip
      id="overAllocationErrorMessage"
      className={styles.errorTooltip}
      triggerContent={<Icons.Error />}
    >
      {overAllocationErrorMessage}
    </Tooltip>
  );
  const isThisInputBeingModified = (key) =>
    entry.isSubmitting &&
    modifyingKey === key &&
    modifyingEmployeeId === employeeId &&
    modifyingPayItemId === entry.payItemId;

  const smallImmediateSpinner = (
    <Spinner className={styles.immediateSpinner} size="small" />
  );
  return (
    <Table.Row key={entry.payItemId}>
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        {entry.payItemName}
      </Table.RowItem>
      {entry.shouldShowHours && (
        <Table.RowItem {...tableConfig.hours}>
          {isThisInputBeingModified('hours')
            ? smallImmediateSpinner
            : hourRowItem}
        </Table.RowItem>
      )}
      <Table.RowItem {...tableConfig.amount}>
        {isThisInputBeingModified('amount')
          ? smallImmediateSpinner
          : amountRowItem}
      </Table.RowItem>
      <Table.RowItem className={styles.jobRowItem} {...tableConfig.job}>
        {addJobRowItem}
        {shouldShowUnderAllocationWarning && underAllocationWarningTooltip}
        {shouldShowOverAllocationError && overAllocationErrorTooltip}
      </Table.RowItem>
    </Table.Row>
  );
};
const mapStateToProps = (state) => ({
  modifyingPayItemId: getModifyingPayItemId(state),
  modifyingKey: getModifyingKey(state),
  modifyingEmployeeId: getModifyingEmployeeId(state),
});
export default connect(mapStateToProps)(EmployeeRecalculatePayTableRow);
