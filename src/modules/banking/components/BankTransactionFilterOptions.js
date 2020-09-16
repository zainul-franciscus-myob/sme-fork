import { Card, FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilterOptions,
  getIsEntryLoading,
  getRegion,
  getTransactionTypes,
} from '../selectors';
import FilterBarSearch from '../../../components/FilterBarSearch/FilterBarSearch';
import PeriodPicker from '../../../components/PeriodPicker/PeriodPicker';

const BankTransactionFilterOptions = ({
  region,
  filterOptions: { transactionType, period, dateFrom, dateTo, keywords },
  transactionTypes,
  onPeriodChange,
  onResetFilters,
  isEntryLoading,
  onUpdateFilters,
}) => {
  const onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;

    onUpdateFilters({ filterName, value });
  };

  const onSelectChange = (e) => {
    const { value, name } = e.target;

    onUpdateFilters({ filterName: name, value });
  };

  return (
    <Card>
      <FilterBar onReset={isEntryLoading ? undefined : onResetFilters}>
        <FilterBar.Group>
          <Select
            name="transactionType"
            label="Status"
            value={transactionType}
            onChange={onSelectChange}
            width="sm"
          >
            {transactionTypes.map(({ label, value }) => (
              <Select.Option value={value} label={label} key={value} />
            ))}
          </Select>
          <PeriodPicker
            region={region}
            period={period}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onChange={onPeriodChange}
          />
        </FilterBar.Group>
        <FilterBarSearch
          id="Search_Box"
          name="Search"
          value={keywords}
          onChange={onSearchBoxChange}
        />
      </FilterBar>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  region: getRegion(state),
  filterOptions: getFilterOptions(state),
  transactionTypes: getTransactionTypes(state),
  isEntryLoading: getIsEntryLoading(state),
});

export default connect(mapStateToProps)(BankTransactionFilterOptions);
