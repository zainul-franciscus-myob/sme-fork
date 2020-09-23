import { DatePicker, FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getShowPaymentTypeFilter } from '../ElectronicPaymentsCreateSelector';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const ElectronicPaymentsCreateFilter = ({
  paymentTypes,
  paymentType,
  dateFrom,
  dateTo,
  onUpdateFilterBarOptions,
  onResetFilterBarOptions,
  showPaymentTypeFilter,
}) => {
  const onDatePickerChange = (filterName) => ({ value }) => {
    onUpdateFilterBarOptions({ key: filterName, value });
  };

  return (
    <FilterBar onReset={onResetFilterBarOptions}>
      <FilterBar.Group>
        {showPaymentTypeFilter && (
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

const mapStateToProps = (state) => ({
  showPaymentTypeFilter: getShowPaymentTypeFilter(state),
});

export default connect(mapStateToProps)(ElectronicPaymentsCreateFilter);
