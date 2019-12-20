import { DatePicker, FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import { getCustomerFilterOptions, getFilterOptions, getTotal } from '../quoteListSelector';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import style from './QuoteListView.module.css';

class QuoteListFilterOptions extends React.Component {
  onComboBoxChange = (item) => {
    const filterName = 'customerId';
    const { value } = item;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  onFilterChange = filterName => ({ value }) => {
    const { onUpdateFilters } = this.props;
    onUpdateFilters({ filterName, value });
  }

  onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  render = () => {
    const {
      filterOptions: {
        customerId,
        dateFrom,
        dateTo,
        keywords,
      },
      customerFilterOptions,
      total,
      onApplyFilter,
    } = this.props;

    return (
      <Fragment>
        <FilterBar onApply={onApplyFilter}>
          <CustomerCombobox
            items={customerFilterOptions}
            selectedId={customerId}
            onChange={this.onComboBoxChange}
            label="Customer"
            name="Customer"
            hideLabel={false}
          />
          <FilterBar.Group>
            <DatePicker name="issuedFrom" label="Issued from" value={dateFrom} onSelect={this.onFilterChange('dateFrom')} />
            <DatePicker name="issuedTo" label="Issued to" value={dateTo} onSelect={this.onFilterChange('dateTo')} />
          </FilterBar.Group>
          <FilterBarSearch name="search" value={keywords} onChange={this.onSearchBoxChange} />
        </FilterBar>
        <hr />
        <div className={style.total}>
          {`Total amount: ${total}`}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  customerFilterOptions: getCustomerFilterOptions(state),
  filterOptions: getFilterOptions(state),
  total: getTotal(state),
});

export default connect(mapStateToProps)(QuoteListFilterOptions);
