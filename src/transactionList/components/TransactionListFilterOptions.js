import {
  Button, DatePicker, FilterBar, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getFilterOptions, getSourceJournalFilterOptions } from '../transactionListSelectors';

class TransactionListFilterOptions extends React.Component {
  onDatePickerChange = filterName => ({ value }) => {
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
    const filterName = 'sourceJournal';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  render = () => {
    const {
      filterOptions: {
        sourceJournal,
        dateFrom,
        dateTo,
        keywords,
      },
      sourceJournalFilterOptions,
      onApplyFilter,
    } = this.props;

    return (
      <FilterBar>
        <Select name="SourceJournal" label="Source Journal" value={sourceJournal} onChange={this.onSelectChange}>
          {sourceJournalFilterOptions.map(({ label, value }) => (
            <Select.Option value={value} label={label} key={value} />
          ))}
        </Select>
        <FilterBar.Group>
          <DatePicker label="From" name="dateFrom" value={dateFrom} onSelect={this.onDatePickerChange('dateFrom')} />
          <DatePicker label="To" name="dateTo" value={dateTo} onSelect={this.onDatePickerChange('dateTo')} />
        </FilterBar.Group>
        <Search label="Description" name="description" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
        <FilterBar.Item>
          <Button type="secondary" onClick={onApplyFilter}>Apply filters</Button>
        </FilterBar.Item>
      </FilterBar>
    );
  }
}

TransactionListFilterOptions.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  onUpdateFilters: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({}).isRequired,
  sourceJournalFilterOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
  sourceJournalFilterOptions: getSourceJournalFilterOptions(state),
});

export default connect(mapStateToProps)(TransactionListFilterOptions);
