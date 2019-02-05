import {
  Button, DatePicker, DirectSearchBox, FilterBar, InputLabel, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getFormattedFilterOptions, getSourceJournalFilterOptions } from '../transactionListSelectors';

class TransactionListFilterOptions extends React.Component {
  onFilterChange = filterName => (value) => {
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
        <FilterBar.Group>
          <FilterBar.Option>
            <Select name="SourceJournal" label="Source Journal" value={sourceJournal} onChange={this.onSelectChange}>
              {sourceJournalFilterOptions.map(({ label, value }) => (
                <Select.Option value={value} label={label} key={value} />
              ))}
            </Select>
          </FilterBar.Option>
          <FilterBar.Option>
            <InputLabel label="From" id="Date_From" />
            <DatePicker inputProps={{ id: 'Date_From' }} dateTime={dateFrom} onChange={this.onFilterChange('dateFrom')} />
          </FilterBar.Option>
          <FilterBar.Option>
            <InputLabel label="To" id="Date_To" />
            <DatePicker inputProps={{ id: 'Date_To' }} dateTime={dateTo} onChange={this.onFilterChange('dateTo')} />
          </FilterBar.Option>
          <FilterBar.Option>
            <InputLabel label="Description" id="Search_Box" />
            <DirectSearchBox id="Search_Box" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
          </FilterBar.Option>
          <FilterBar.Option>
            <Button type="secondary" onClick={onApplyFilter}>Apply filters</Button>
          </FilterBar.Option>
        </FilterBar.Group>
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
  filterOptions: getFormattedFilterOptions(state),
  sourceJournalFilterOptions: getSourceJournalFilterOptions(state),
});

export default connect(mapStateToProps)(TransactionListFilterOptions);
