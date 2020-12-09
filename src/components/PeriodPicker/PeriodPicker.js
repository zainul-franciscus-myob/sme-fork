import { DatePicker, Select } from '@myob/myob-widgets';
import React, { useEffect } from 'react';

import Periods from './Periods';
import getDateRangeByPeriodAndLastMonthInFY from './getDateRangeByPeriodAndLastMonthInFY';
import handleSelectChange from '../handlers/handleSelectChange';

const PeriodPicker = ({
  lastMonthInFinancialYear,
  dateFrom,
  dateTo,
  period,
  onChange,
  required,
  className,
  disabled,
}) => {
  /**
   * When user select `This month`, `period`, `dateFrom` and `dateTo` are cached in storage.
   * In the following month, when we pass these stored data to PeriodPicker,
   * period is set to `This month`, while `dateFrom` and `dateTo` is data from last month.
   * E.g in 1st Feb, we can have period: `This month`, dateFrom: `1st Jan`, dateTo: `31 Jan`.
   */
  useEffect(() => {
    if (Periods.custom !== period) {
      const dates = getDateRangeByPeriodAndLastMonthInFY(
        lastMonthInFinancialYear,
        new Date(),
        period
      );
      if (dateFrom === dates.dateFrom || dateTo === dates.dateTo) return;
      onChange(dates);
    }
  }, [dateFrom, dateTo, lastMonthInFinancialYear, onChange, period]);

  const onPeriodChange = handleSelectChange(({ value }) => {
    if (value === Periods.custom) {
      onChange({ period: value, dateFrom, dateTo });
      return;
    }
    onChange(
      getDateRangeByPeriodAndLastMonthInFY(
        lastMonthInFinancialYear,
        new Date(),
        value
      )
    );
  });

  const onDateChange = (key) => ({ value }) => {
    onChange({
      dateFrom,
      dateTo,
      period: Periods.custom,
      [key]: value,
    });
  };

  const isRequired = required ? { requiredLabel: 'This is required' } : {};

  return (
    <>
      <Select
        className={className}
        name="Period"
        label="Period"
        value={period}
        onChange={onPeriodChange}
        disabled={disabled}
      >
        {Object.values(Periods).map((key) => (
          <Select.Option value={key} label={key} key={key} />
        ))}
      </Select>
      <DatePicker
        className={className}
        label="Date from"
        name="dateFrom"
        value={dateFrom}
        onSelect={onDateChange('dateFrom')}
        disabled={disabled}
        {...isRequired}
      />
      <DatePicker
        className={className}
        label="Date to"
        name="dateTo"
        value={dateTo}
        onSelect={onDateChange('dateTo')}
        disabled={disabled}
        {...isRequired}
      />
    </>
  );
};

export default PeriodPicker;
