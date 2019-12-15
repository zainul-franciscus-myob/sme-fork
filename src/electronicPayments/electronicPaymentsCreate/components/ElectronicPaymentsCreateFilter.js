import { DatePicker, FilterBar } from '@myob/myob-widgets';
import React from 'react';

const ElectronicPaymentsCreateFilter = ({
  dateFrom,
  dateTo,
  onUpdateFilterBarOptions,
  onApplyFilter,
}) => {
  const onDatePickerChange = filterName => ({ value }) => {
    onUpdateFilterBarOptions({ filterName, value });
  };

  return (
    <FilterBar onApply={onApplyFilter}>
      <FilterBar.Group>
        <DatePicker
          label="Transactions from"
          name="datepicker-from"
          value={dateFrom}
          onSelect={onDatePickerChange('dateFrom')}
        />
        <DatePicker
          label="Transactions to"
          name="datepicker-to"
          value={dateTo}
          onSelect={onDatePickerChange('dateTo')}
        />
      </FilterBar.Group>
    </FilterBar>
  );
};

export default ElectronicPaymentsCreateFilter;
