import {
  Button, DatePicker, FilterBar, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  getCustomerFilterOptions,
  getFilterOptions,
  getStatusFilterOptions,
  getTotal,
  getTotalDue,
} from '../invoiceListSelectors';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import style from './InvoiceListView.css';

class InvoiceListFilterOptions extends React.Component {
  onComboBoxChange = (item) => {
    const { value } = item;
    const { onUpdateFilter } = this.props;
    onUpdateFilter({ filterName: 'customerId', value });
  }

  onSearchBoxChange = (event) => {
    const { onUpdateFilter } = this.props;
    onUpdateFilter({ filterName: 'keywords', value: event.target.value });
  };

  onSelectChange = (event) => {
    const { onUpdateFilter } = this.props;
    onUpdateFilter({ filterName: 'status', value: event.target.value });
  }

  onDateChange = filterName => ({ value }) => {
    const { onUpdateFilter } = this.props;
    onUpdateFilter({ filterName, value });
  }

  render = () => {
    const {
      filterOptions: {
        customerId,
        status,
        dateTo,
        dateFrom,
        keywords,
      },
      onApplyFilter,
      customerFilterOptions,
      statusFilterOptions,
      total,
      totalDue,
    } = this.props;

    return (
      <Fragment>
        <FilterBar>
          <CustomerCombobox
            items={customerFilterOptions}
            selectedId={customerId}
            onChange={this.onComboBoxChange}
            label="Customer"
            name="Customer"
            hideLabel={false}
          />
          <Select name="status" label="Status" value={status} onChange={this.onSelectChange}>
            {statusFilterOptions.map(({ name, value }) => (
              <Select.Option value={value} label={name} key={value} />
            ))}
          </Select>
          <FilterBar.Group>
            <DatePicker name="issuedFrom" label="Issued from" value={dateFrom} onSelect={this.onDateChange('dateFrom')} />
            <DatePicker name="issuedTo" label="Issued to" value={dateTo} onSelect={this.onDateChange('dateTo')} />
          </FilterBar.Group>
          <Search name="search" label="Search" id="Search_Box" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
          <FilterBar.Item>
            <Button type="secondary" onClick={onApplyFilter}>Apply filters</Button>
          </FilterBar.Item>
        </FilterBar>
        <hr />
        <div className={style.totals}>
          <span className={style.totalItem}>{`Total: ${total}`}</span>
          <span className={style.totalDueItem}>{`Total Due: ${totalDue}`}</span>
        </div>
      </Fragment>
    );
  }
}

InvoiceListFilterOptions.propTypes = {
  filterOptions: PropTypes.shape({
    customerId: PropTypes.string,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    keywords: PropTypes.string,
  }).isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  onUpdateFilter: PropTypes.func.isRequired,
  customerFilterOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  statusFilterOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  total: PropTypes.string.isRequired,
  totalDue: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
  customerFilterOptions: getCustomerFilterOptions(state),
  statusFilterOptions: getStatusFilterOptions(state),
  total: getTotal(state),
  totalDue: getTotalDue(state),
});

export default connect(mapStateToProps)(InvoiceListFilterOptions);
