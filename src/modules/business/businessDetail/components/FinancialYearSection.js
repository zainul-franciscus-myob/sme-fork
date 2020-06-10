import {
  FieldGroup,
  Icons,
  MonthPicker,
  ReadOnly,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearDetails } from '../businessDetailSelectors';
import FinancialYearButton from './FinancialYearButton';
import MonthSelect from './MonthSelect';
import YearSelect from './YearSelect';
import formatDate from '../../../../common/valueFormatters/formatDate/formatDate';
import handleMonthPickerChange from '../../../../components/handlers/handleMonthPickerChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './FinancialYearSection.module.css';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const dateFormat = 'MMMM yyyy';

const FinancialYearSection = ({
  financialYear,
  lastMonthInFinancialYear,
  openingBalanceDate,
  isStartNewFinancialYearEnabled,
  isFinancialYearSectionReadOnly,
  onChange,
  onStartNewFinancialYear,
  onOpenFinancialYearModal,
  onCloseFinancialYearModal,
  financialYearOptions,
}) => {
  const financialYearComboBox = isFinancialYearSectionReadOnly
    ? <ReadOnly label="Current financial year" name="financialYear">
        {financialYear}
      </ReadOnly>
    : (
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
    />
  );

  const lastMonthFYToolTip = (
    <Tooltip triggerContent={<Icons.Info />}>
      Make sure to discuss this with your advisor before changing the
      financial year period.
    </Tooltip>
  );

  const lastMonthInFYComboBox = isFinancialYearSectionReadOnly
    ? <ReadOnly label="Last month in financial year" name="lastMonthInFinancialYear" labelAccessory={lastMonthFYToolTip}>
        {monthNames[lastMonthInFinancialYear - 1]}
      </ReadOnly>
    : (
      <MonthSelect
        name="lastMonthInFinancialYear"
        label="Last month in financial year"
        className={styles.monthSelect}
        value={lastMonthInFinancialYear}
        labelAccessory={lastMonthFYToolTip}
        onChange={handleSelectChange(onChange)}
        width="sm"
      />
    );

  const openingBalanceDateTooltip = (
    <Tooltip triggerContent={<Icons.Info />}>
      The date you either started using MYOB or the start of a period,
      like a new financial year.
    </Tooltip>
  );

  const openingBalanceDateComboBox = isFinancialYearSectionReadOnly
    ? <ReadOnly label="Opening balance month" name="openingBalanceDate" labelAccessory={openingBalanceDateTooltip}>
        {formatDate(openingBalanceDate, dateFormat)}
      </ReadOnly>
    : (
      <MonthPicker
        name="openingBalanceDate"
        label="Opening balance month"
        value={openingBalanceDate}
        labelAccessory={openingBalanceDateTooltip}
        className={styles.monthSelectPicker}
        onSelect={handleMonthPickerChange(onChange, 'openingBalanceDate')}
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

const mapStateToProps = state => getFinancialYearDetails(state);

export default connect(mapStateToProps)(FinancialYearSection);
