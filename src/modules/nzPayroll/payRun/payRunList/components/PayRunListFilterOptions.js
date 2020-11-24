import { DatePicker, FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../payRunListSelectors';

const PayRunListFilterOptions = (props) => {
  const {
    onUpdateFilterBarOptions,
    onResetFilterBarOptions,
    filterOptions: { dateFrom, dateTo },
  } = props;

  const onDatePickerChange = (filterName) => ({ value }) => {
    onUpdateFilterBarOptions({ filterName, value });
  };

  return (
    <FilterBar onReset={onResetFilterBarOptions}>
      <FilterBar.Group>
        <DatePicker
          label="Payment from"
          name="dateFrom"
          value={dateFrom}
          onSelect={onDatePickerChange('dateFrom')}
        />
        <DatePicker
          label="Payment to"
          name="dateTo"
          value={dateTo}
          onSelect={onDatePickerChange('dateTo')}
        />
      </FilterBar.Group>
    </FilterBar>
  );
};

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(PayRunListFilterOptions);
