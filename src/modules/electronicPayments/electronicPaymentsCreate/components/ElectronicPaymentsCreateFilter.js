import { DatePicker, FilterBar, Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const ElectronicPaymentsCreateFilter = ({
  paymentTypes,
  paymentType,
  dateFrom,
  dateTo,
  onUpdateFilterBarOptions,
  isSpendMoneyEnabled,
}) => {
  const onDatePickerChange = (filterName) => ({ value }) => {
    onUpdateFilterBarOptions({ key: filterName, value });
  };

  return (
    <FilterBar>
      <FilterBar.Group>
        {isSpendMoneyEnabled && (
          <Select
            label="Payment type"
            name="paymentType"
            value={paymentType}
            onChange={handleSelectChange(onUpdateFilterBarOptions)}
          >
            {paymentTypes.map(({ name, value }) => (
              <Select.Option value={value} label={name} key={value} />
            ))}
          </Select>
        )}
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
