import { DatePicker, FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import classnames from 'classnames';

import {
  getCustomerFilterOptions,
  getFilterOptions,
  getHasOverdue,
  getStatusFilterOptions,
  getTotal,
  getTotalDue,
  getTotalOverdue,
} from '../invoiceListSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import styles from './InvoiceListFilterOptions.module.css';

class InvoiceListFilterOptions extends React.Component {
  onComboBoxChange = (item) => {
    const { id: value } = item;
    const { onUpdateFilter } = this.props;
    onUpdateFilter({ filterName: 'customerId', value });
  };

  onSearchBoxChange = (event) => {
    const { onUpdateFilter } = this.props;
    onUpdateFilter({ filterName: 'keywords', value: event.target.value });
  };

  onSelectChange = (event) => {
    const { onUpdateFilter } = this.props;
    onUpdateFilter({ filterName: 'status', value: event.target.value });
  };

  onResetFilter = () => {
    const { onResetFilter } = this.props;
    onResetFilter();
  };

  onDateChange = (filterName) => ({ value }) => {
    const { onUpdateFilter } = this.props;
    onUpdateFilter({ filterName, value });
  };

  render = () => {
    const {
      filterOptions: { customerId, status, dateTo, dateFrom, keywords },
      customerFilterOptions,
      statusFilterOptions,
      total,
      totalDue,
      totalOverdue,
      hasOverdue,
    } = this.props;

    return (
      <Fragment>
        <FilterBar onReset={this.onResetFilter}>
          <div className={styles.status}>
            <Select
              name="status"
              label="Status"
              value={status}
              onChange={this.onSelectChange}
            >
              {statusFilterOptions.map(({ name, value }) => (
                <Select.Option value={value} label={name} key={value} />
              ))}
            </Select>
          </div>
          <div className={styles.customer}>
            <CustomerCombobox
              items={customerFilterOptions}
              selectedId={customerId}
              onChange={this.onComboBoxChange}
              label="Customer"
              name="customerId"
              hideLabel={false}
              hasAllItem
              hintText="All"
              allowClear
            />
          </div>
          <DatePicker
            name="issuedFrom"
            label="Issued from"
            value={dateFrom}
            onSelect={this.onDateChange('dateFrom')}
          />
          <DatePicker
            name="issuedTo"
            label="Issued to"
            value={dateTo}
            onSelect={this.onDateChange('dateTo')}
          />
          <FilterBarSearch
            name="search"
            label="Search"
            id="Search_Box"
            value={keywords}
            onChange={this.onSearchBoxChange}
          />
        </FilterBar>
        <hr />
        <div className={styles.totals}>
          <div className={styles.totalItem}>{`Total amount ${total}`}</div>
          <div className={styles.totalDueItem}>{`Balance due ${totalDue}`}</div>
          <div
            className={classnames(styles.totalOverdue, {
              [styles.hasOverdue]: hasOverdue,
            })}
          >{`Overdue ${totalOverdue}`}</div>
        </div>
      </Fragment>
    );
  };
}

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
  customerFilterOptions: getCustomerFilterOptions(state),
  statusFilterOptions: getStatusFilterOptions(state),
  total: getTotal(state),
  totalDue: getTotalDue(state),
  totalOverdue: getTotalOverdue(state),
  hasOverdue: getHasOverdue(state),
});

export default connect(mapStateToProps)(InvoiceListFilterOptions);
