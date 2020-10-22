import { FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTransactionTypeFilters } from '../recurringTransactionListSelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const RecurringTransactionListFilterOptions = ({
  typeOptions,
  onUpdateFilter,
  onResetFilter,
}) => {
  return (
    <FilterBar onReset={onResetFilter}>
      <Select
        name="Transaction Type"
        label="Transaction Type"
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
});

export default connect(mapStateToProps)(RecurringTransactionListFilterOptions);
