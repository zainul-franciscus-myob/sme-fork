import {
  FilterBar, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions, getSourceJournalFilterOptions } from '../journalTransactionListSelectors';
import { getRegion } from '../../transactionListSelectors';
import PeriodPicker from '../../../components/PeriodPicker/PeriodPicker';

const JournalTransactionListFilterOptions = ({
  filterOptions: {
    period,
    sourceJournal,
    dateFrom,
    dateTo,
    keywords,
  },
  region,
  sourceJournalFilterOptions,
  onApplyFilter,
  onUpdateFilters,
  onUpdateMultiFilters,
}) => {
  const onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    onUpdateFilters({ filterName, value });
  };

  const onSelectChange = (e) => {
    const filterName = 'sourceJournal';
    const { value } = e.target;
    onUpdateFilters({ filterName, value });
  };

  const onPeriodPickerChange = (periodData) => {
    onUpdateMultiFilters(
      Object.keys(periodData).map(key => ({
        filterName: key,
        value: periodData[key],
      })),
    );
  };

  return (
    <FilterBar onApply={onApplyFilter}>
      <PeriodPicker
        region={region}
        dateFrom={dateFrom}
        dateTo={dateTo}
        period={period}
        onChange={onPeriodPickerChange}
      />
      <Select
        name="SourceJournal"
        label="Source Journal"
        value={sourceJournal}
        onChange={onSelectChange}
      >
        {sourceJournalFilterOptions.map(({ label, value }) => (
          <Select.Option value={value} label={label} key={value} />
        ))}
      </Select>
      <Search
        label="Search"
        name="search"
        placeholder="Search"
        maxLength={255}
        value={keywords}
        onChange={onSearchBoxChange}
      />
    </FilterBar>
  );
};

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
  sourceJournalFilterOptions: getSourceJournalFilterOptions(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(JournalTransactionListFilterOptions);