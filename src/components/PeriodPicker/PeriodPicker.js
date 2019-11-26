import {
  DatePicker, FilterBar, Select,
} from '@myob/myob-widgets';
import React from 'react';

import Periods from './Periods';
import getDateRangeByPeriodAndRegion from './getDateRangeByPeriodAndRegion';
import handleSelectChange from '../handlers/handleSelectChange';


const PeriodPicker = ({
  region,
  dateFrom,
  dateTo,
  period,
  onChange,
}) => {
  const onPeriodChange = handleSelectChange(({ value }) => {
    if (value === Periods.custom) {
      onChange({ period: value, dateFrom, dateTo });
      return;
    }
    onChange(getDateRangeByPeriodAndRegion(region)(
      new Date(),
    )(value));
  });

  const onDateChange = key => ({ value }) => {
    onChange({
      dateFrom, dateTo, period: Periods.custom, [key]: value,
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
        {Object.values(Periods).map(key => (
          <Select.Option value={key} label={key} key={key} />
        ))}
      </Select>
      <DatePicker
        label="From"
        name="dateFrom"
        value={dateFrom}
        onSelect={onDateChange('dateFrom')}
      />
      <DatePicker
        label="To"
        name="dateTo"
        value={dateTo}
        onSelect={onDateChange('dateTo')}
      />
    </FilterBar.Group>
  );
};

export default PeriodPicker;
