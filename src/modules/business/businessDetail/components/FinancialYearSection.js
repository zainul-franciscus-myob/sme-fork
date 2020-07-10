import { FieldGroup, Icons, ReadOnly, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearDetails } from '../businessDetailSelectors';
import FinancialYearButton from './FinancialYearButton';
import MonthSelect from './MonthSelect';
import MonthYearSelect from './MonthYearSelect';
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
  openingBalanceYearOptions,
  lastMonthInFY,
  monthOptions,
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

  const openingBalanceDateTooltip = (
    <Tooltip triggerContent={<Icons.Info />}>
      The date you either started using MYOB or the start of a period, like a
      new financial year.
    </Tooltip>
  );

  const openingBalanceDateComboBox = isFinancialYearSectionReadOnly ? (
    <ReadOnly
      label="Opening balance month"
      name="openingBalanceDate"
      labelAccessory={openingBalanceDateTooltip}
    >
      {formatDate(openingBalanceDate, dateFormat)}
    </ReadOnly>
  ) : (
    <MonthYearSelect
      labelAccessory={openingBalanceDateTooltip}
      year={openingBalanceYear}
      month={openingBalanceMonth}
      yearOptions={openingBalanceYearOptions}
      monthOptions={monthOptions}
      onYearChange={handleSelectChange(onChange)}
      onMonthChange={handleSelectChange(onChange)}
    />
  );

  return (
    <FieldGroup label="Financial year">
      {financialYearComboBox}
      {startNewFYButton}
      {lastMonthInFYComboBox}
      {openingBalanceDateComboBox}
    </FieldGroup>
  );
};

const mapStateToProps = (state) => getFinancialYearDetails(state);

export default connect(mapStateToProps)(FinancialYearSection);
