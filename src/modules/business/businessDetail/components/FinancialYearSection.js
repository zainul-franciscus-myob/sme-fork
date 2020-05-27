import {
  FieldGroup,
  Icons,
  MonthPicker,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFinancialYearDetails } from '../businessDetailSelectors';
import FinancialYearButton from './FinancialYearButton';
import MonthSelect from './MonthSelect';
import YearSelect from './YearSelect';
import handleMonthPickerChange from '../../../../components/handlers/handleMonthPickerChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const FinancialYearSection = ({
  financialYear,
  lastMonthInFinancialYear,
  openingBalanceDate,
  isFinancialYearClosed,
  isStartNewFinancialYearEnabled,
  onChange,
  onStartNewFinancialYear,
  onOpenFinancialYearModal,
  onCloseFinancialYearModal,
}) => (
  <FieldGroup label="Financial year">
    <YearSelect
      name="financialYear"
      label="Current financial year"
      value={financialYear}
      onChange={handleSelectChange(onChange)}
      width="xs"
      disabled={isFinancialYearClosed}
    />
    {isStartNewFinancialYearEnabled && (
      <FinancialYearButton
        onStartNewFinancialYear={onStartNewFinancialYear}
        onOpenFinancialYearModal={onOpenFinancialYearModal}
        onCloseFinancialYearModal={onCloseFinancialYearModal}
      />
    )}
    <MonthSelect
      name="lastMonthInFinancialYear"
      label="Last month in financial year"
      value={lastMonthInFinancialYear}
      disabled={isFinancialYearClosed}
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />}>
          Make sure to discuss this with your advisor before changing the
          financial year period.
        </Tooltip>
      )}
      onChange={handleSelectChange(onChange)}
      width="sm"
    />
    <MonthPicker
      name="openingBalanceDate"
      label="Opening balance month"
      value={openingBalanceDate}
      disabled={isFinancialYearClosed}
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />}>
          The date you either started using MYOB or the start of a period,
          like a new financial year.
        </Tooltip>
      )}
      onSelect={handleMonthPickerChange(onChange, 'openingBalanceDate')}
    />
  </FieldGroup>
);

const mapStateToProps = state => getFinancialYearDetails(state);

export default connect(mapStateToProps)(FinancialYearSection);
