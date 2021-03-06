import { DatePicker, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCustomerFilterOptions,
  getFilterOptions,
  getTotal,
} from '../quoteListSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import styles from './QuoteListView.module.css';

class QuoteListFilterOptions extends React.Component {
  onComboBoxChange = (item) => {
    const filterName = 'customerId';
    const { id: value } = item;
    const { onUpdateFilters } = this.props;
    onUpdateFilters({ filterName, value });
  };

  onSelectChange = (e) => {
    const filterName = 'status';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;
    onUpdateFilters({ filterName, value });
  };

  onFilterChange = (filterName) => ({ value }) => {
    const { onUpdateFilters } = this.props;
    onUpdateFilters({ filterName, value });
  };

  onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  };

  render = () => {
    const {
      filterOptions: { customerId, dateFrom, dateTo, keywords, status },
      customerFilterOptions,
      total,
      onResetFilters,
    } = this.props;

    const statusDropdown = ['All', 'Open', 'Accepted', 'Declined', 'Invoiced'];

    return (
      <div className={styles.filterOptions}>
        <FilterBar onReset={onResetFilters}>
          <Select
            key="status"
            name="status"
            label="Status"
            value={status}
            onChange={this.onSelectChange}
          >
            {statusDropdown.map((item) => (
              <Select.Option key={item} value={item} label={item} />
            ))}
          </Select>
          <CustomerCombobox
            items={customerFilterOptions}
            selectedId={customerId}
            onChange={this.onComboBoxChange}
            label="Customer"
            name="customerId"
            hideLabel={false}
            hintText="All"
            allowClear
            hasAllItem
          />
          <FilterBar.Group>
            <DatePicker
              name="issuedFrom"
              label="Issued from"
              value={dateFrom}
              onSelect={this.onFilterChange('dateFrom')}
            />
            <DatePicker
              name="issuedTo"
              label="Issued to"
              value={dateTo}
              onSelect={this.onFilterChange('dateTo')}
            />
          </FilterBar.Group>
          <FilterBarSearch
            name="search"
            value={keywords}
            onChange={this.onSearchBoxChange}
          />
        </FilterBar>
        <hr />
        <div className={styles.total}>{`Total amount ${total}`}</div>
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  customerFilterOptions: getCustomerFilterOptions(state),
  filterOptions: getFilterOptions(state),
  total: getTotal(state),
});

export default connect(mapStateToProps)(QuoteListFilterOptions);
