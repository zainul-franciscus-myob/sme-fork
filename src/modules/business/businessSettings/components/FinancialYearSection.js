import {
  Alert,
  Field,
  FieldGroup,
  Icons,
  ReadOnly,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearDetails } from '../businessSettingsSelectors';
import FinancialYearButton from './FinancialYearButton';
import MonthSelect from './MonthSelect';
import OpeningBalanceDate from './OpeningBalanceDate';
import YearSelect from './YearSelect';
import formatDate from '../../../../common/valueFormatters/formatDate/formatDate';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './FinancialYearSection.module.css';

const dateFormat = 'MMMM yyyy';

const FinancialYearSection = ({
  financialYear,
  lastMonthInFinancialYear,
  openingBalanceDate,
  openingBalanceYear,
  openingBalanceMonth,
  isFinancialYearSectionReadOnly,
  onFinancialYearSettingsChange,
  onStartNewFinancialYear,
  onOpenFinancialYearModal,
  onCloseFinancialYearModal,
  financialYearOptions,
  lastMonthInFY,
  monthOptions,
  financialYearDateRange,
  cannotRecordTransactionBeforeDate,
  isFinancialYearSettingsChanged,
}) => {
  const financialYearComboBox = isFinancialYearSectionReadOnly ? (
    <ReadOnly label="Current financial year" name="financialYear">
      {financialYear}
    </ReadOnly>
  ) : (
    <YearSelect
      financialYearOptions={financialYearOptions}
      name="financialYear"
      label="Current financial year"
      value={financialYear}
      onChange={handleSelectChange(onFinancialYearSettingsChange)}
      width="xs"
    />
  );

  const startNewFYButton = (
    <FinancialYearButton
      onStartNewFinancialYear={onStartNewFinancialYear}
      onOpenFinancialYearModal={onOpenFinancialYearModal}
      onCloseFinancialYearModal={onCloseFinancialYearModal}
      onMonthSelect={onFinancialYearSettingsChange}
    />
  );

  const lastMonthFYToolTip = (
    <Tooltip triggerContent={<Icons.Info />}>
      Make sure to discuss this with your advisor before changing the financial
      year period.
    </Tooltip>
  );

  const lastMonthInFYComboBox = isFinancialYearSectionReadOnly ? (
    <ReadOnly
      label="Last month in financial year"
      name="lastMonthInFinancialYear"
      labelAccessory={lastMonthFYToolTip}
    >
      {lastMonthInFY}
    </ReadOnly>
  ) : (
    <MonthSelect
      name="lastMonthInFinancialYear"
      label="Last month in financial year"
      className={styles.monthSelect}
      value={lastMonthInFinancialYear}
      labelAccessory={lastMonthFYToolTip}
      onChange={handleSelectChange(onFinancialYearSettingsChange)}
      width="sm"
      monthOptions={monthOptions}
    />
  );

  const startDateToEndDateOfFY = (
    <ReadOnly label="Financial Year" name="financialYearDateRange">
      <strong>{financialYearDateRange.start}</strong>
      <span> to </span>
      <strong>{financialYearDateRange.end}</strong>
    </ReadOnly>
  );

  const openingBalanceDateTooltip = (
    <Tooltip triggerContent={<Icons.Info />}>
      This is the date you started recording transactions.
    </Tooltip>
  );

  const openingBalanceDateComboBox = isFinancialYearSectionReadOnly ? (
    <ReadOnly
      label="Opening balance date"
      name="openingBalanceDate"
      labelAccessory={openingBalanceDateTooltip}
    >
      {formatDate(openingBalanceDate, dateFormat)}
    </ReadOnly>
  ) : (
    <OpeningBalanceDate
      labelAccessory={openingBalanceDateTooltip}
      year={openingBalanceYear}
      month={openingBalanceMonth}
      monthOptions={monthOptions}
      onMonthChange={handleSelectChange(onFinancialYearSettingsChange)}
    />
  );

  const cannotRecordTransactionsBefore = (
    <ReadOnly
      label="Cannot record transactions before"
      name="cannotRecordTransactionsBefore"
    >
      <strong>{cannotRecordTransactionBeforeDate}</strong>
    </ReadOnly>
  );

  const infoBox = isFinancialYearSettingsChanged && (
    <Field
      renderField={() => (
        <Alert type="info">
          Changing these dates can affect business reporting and account opening
          balances. Check with an advisor if you&apos;re unsure.
          <br />
          <a
            href="https://help.myob.com/wiki/x/165qAg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </Alert>
      )}
    />
  );

  return (
    <FieldGroup label="Financial year">
      {financialYearComboBox}
      {startNewFYButton}
      {lastMonthInFYComboBox}
      {startDateToEndDateOfFY}
      {openingBalanceDateComboBox}
      {cannotRecordTransactionsBefore}
      {infoBox}
    </FieldGroup>
  );
};

const mapStateToProps = (state) => getFinancialYearDetails(state);

export default connect(mapStateToProps)(FinancialYearSection);
