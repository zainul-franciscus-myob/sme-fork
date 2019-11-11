import {
  DatePicker,
  FilterBar,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../payRunListSelectors';

const PayRunListFilterOptions = (props) => {
  const {
    onUpdateFilterBarOptions,
    onApplyFilter,
    filterOptions: {
      dateFrom,
      dateTo,
    },
  } = props;

  const onDatePickerChange = filterName => ({ value }) => {
    onUpdateFilterBarOptions({ filterName, value });
  };

  return (
    <FilterBar onApply={onApplyFilter}>
      <FilterBar.Group>
        <DatePicker label="From" name="dateFrom" value={dateFrom} onSelect={onDatePickerChange('dateFrom')} />
        <DatePicker label="To" name="dateTo" value={dateTo} onSelect={onDatePickerChange('dateTo')} />
      </FilterBar.Group>
    </FilterBar>
  );
};

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(PayRunListFilterOptions);
