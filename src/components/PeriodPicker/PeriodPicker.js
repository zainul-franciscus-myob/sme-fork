import { DatePicker, FilterBar, Select } from '@myob/myob-widgets';
import React, { useEffect } from 'react';

import Periods from './Periods';
import getDateRangeByPeriodAndRegion from './getDateRangeByPeriodAndRegion';
import handleSelectChange from '../handlers/handleSelectChange';

const PeriodPicker = ({ region, dateFrom, dateTo, period, onChange }) => {
  /**
   * When user select `This month`, `period`, `dateFrom` and `dateTo` are cached in storage.
   * In the following month, when we pass these stored data to PeriodPicker,
   * period is set to `This month`, while `dateFrom` and `dateTo` is data from last month.
   * E.g in 1st Feb, we can have period: `This month`, dateFrom: `1st Jan`, dateTo: `31 Jan`.
   */
  useEffect(() => {
    if (Periods.custom !== period) {
      const dates = getDateRangeByPeriodAndRegion(region, new Date(), period);
      if (dateFrom === dates.dateFrom || dateTo === dates.dateTo) return;
      onChange(dates);
    }
  }, [dateFrom, dateTo, onChange, period, region]);

  const onPeriodChange = handleSelectChange(({ value }) => {
    if (value === Periods.custom) {
      onChange({ period: value, dateFrom, dateTo });
      return;
    }
    onChange(getDateRangeByPeriodAndRegion(region, new Date(), value));
  });

  const onDateChange = (key) => ({ value }) => {
    onChange({
      dateFrom,
      dateTo,
      period: Periods.custom,
      [key]: value,
    });
  };

  return (
    <FilterBar.Group>
      <Select
        name="Period"
        label="Period"
        value={period}
        onChange={onPeriodChange}
      >
        {Object.values(Periods).map((key) => (
          <Select.Option value={key} label={key} key={key} />
        ))}
      </Select>
      <DatePicker
        label="Date from"
        name="dateFrom"
        value={dateFrom}
        onSelect={onDateChange('dateFrom')}
      />
      <DatePicker
        label="Date to"
        name="dateTo"
        value={dateTo}
        onSelect={onDateChange('dateTo')}
      />
    </FilterBar.Group>
  );
};

export default PeriodPicker;
