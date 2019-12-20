import { DatePicker, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions, getShouldDisplayDateRange, getTransactionTypes } from '../bankingSelectors';
import FilterBar from '../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../components/FilterBarSearch/FilterBarSearch';

class BankTransactionFilterOptions extends React.Component {
  onDateChange = filterName => ({ value }) => {
    const { onUpdateFilters } = this.props;
    onUpdateFilters({ filterName, value });
  }

  onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  onSelectChange = (e) => {
    const { value, name } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName: name, value });
  }

  render = () => {
    const {
      filterOptions: {
        transactionType,
        dateFrom,
        dateTo,
        keywords,
      },
      transactionTypes,
      onApplyFilter,
      shouldDisplayDateRange,
    } = this.props;

    const dateRangeFilter = shouldDisplayDateRange && (
      <React.Fragment>
        <DatePicker label="Date from" name="dateFrom" value={dateFrom} onSelect={this.onDateChange('dateFrom')} />
        <DatePicker label="Date to" name="dateTo" value={dateTo} onSelect={this.onDateChange('dateTo')} />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <FilterBar onApply={onApplyFilter}>
          <FilterBar.Group>
            <Select name="transactionType" label="Status" value={transactionType} onChange={this.onSelectChange} width="sm">
              {transactionTypes.map(({ label, value }) => (
                <Select.Option value={value} label={label} key={value} />
              ))}
            </Select>
            {dateRangeFilter}
          </FilterBar.Group>
          <FilterBarSearch id="Search_Box" name="Search" value={keywords} onChange={this.onSearchBoxChange} />
        </FilterBar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
  transactionTypes: getTransactionTypes(state),
  shouldDisplayDateRange: getShouldDisplayDateRange(state),
});

export default connect(mapStateToProps)(BankTransactionFilterOptions);
