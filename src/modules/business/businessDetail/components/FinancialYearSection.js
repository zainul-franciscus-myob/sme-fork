import { FieldGroup, Icons, ReadOnly, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearDetails } from '../businessDetailSelectors';
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
  isStartNewFinancialYearEnabled,
  isFinancialYearSectionReadOnly,
  onChange,
  onStartNewFinancialYear,
  onOpenFinancialYearModal,
  onCloseFinancialYearModal,
  financialYearOptions,
  lastMonthInFY,
  monthOptions,
  financialYearDateRange,
  cannotRecordTransactionBeforeDate,
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
      onChange={handleSelectChange(onChange)}
      width="xs"
    />
  );

  const startNewFYButton = isStartNewFinancialYearEnabled && (
    <FinancialYearButton
      onStartNewFinancialYear={onStartNewFinancialYear}
      onOpenFinancialYearModal={onOpenFinancialYearModal}
      onCloseFinancialYearModal={onCloseFinancialYearModal}
      onMonthSelect={onChange}
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
      onChange={handleSelectChange(onChange)}
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
      onMonthChange={handleSelectChange(onChange)}
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

  return (
    <FieldGroup label="Financial year">
      {financialYearComboBox}
      {startNewFYButton}
      {lastMonthInFYComboBox}
      {startDateToEndDateOfFY}
      {openingBalanceDateComboBox}
      {cannotRecordTransactionsBefore}
    </FieldGroup>
  );
};

const mapStateToProps = (state) => getFinancialYearDetails(state);

export default connect(mapStateToProps)(FinancialYearSection);
