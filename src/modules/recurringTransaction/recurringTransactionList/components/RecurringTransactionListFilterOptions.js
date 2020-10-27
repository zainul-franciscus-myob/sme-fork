import { FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilterOptions,
  getTransactionTypeFilters,
} from '../recurringTransactionListSelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const RecurringTransactionListFilterOptions = ({
  filterOptions: { type },
  typeOptions,
  onUpdateFilter,
  onResetFilter,
}) => {
  return (
    <FilterBar onReset={onResetFilter}>
      <Select
        name="type"
        label="Transaction type"
        value={type}
        onChange={handleSelectChange(onUpdateFilter)}
      >
        {typeOptions.map(({ label, value }) => (
          <Select.Option value={value} label={label} key={value} />
        ))}
      </Select>
    </FilterBar>
  );
};

const mapStateToProps = (state) => ({
  typeOptions: getTransactionTypeFilters(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(RecurringTransactionListFilterOptions);
