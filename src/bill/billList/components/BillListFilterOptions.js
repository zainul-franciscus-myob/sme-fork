import {
  DatePicker, FilterBar, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getFilterOptions,
  getStatusFilterOptions,
  getSupplierFilterOptions, getTotal, getTotalDue,
} from '../billListSelectors';
import SupplierCombobox from '../../../components/combobox/SupplierCombobox';
import style from './BillListFilterOptions.css';

const onSelectChange = (key, handler) => e => handler({ filterName: key, value: e.target.value });

const onDatePickerChange = (filterName, handler) => ({ value }) => handler({ filterName, value });

const handleComboBoxChange = (key, handler) => item => handler({ filterName: key, value: item.id });

const BillListFilterOptions = ({
  filterOptions: {
    status,
    supplierId,
    dateFrom,
    dateTo,
    keywords,
  },
  supplierFilterOptions,
  statusFilterOptions,
  total,
  totalDue,
  onApplyFilter,
  onUpdateFilters,
}) => (
  <React.Fragment>
    <FilterBar onApply={onApplyFilter}>
      <Select name="status" label="Status" value={status} onChange={onSelectChange('status', onUpdateFilters)}>
        {statusFilterOptions.map(({ name, value }) => (
          <Select.Option value={value} label={name} key={value} />
        ))}
      </Select>
      <SupplierCombobox
        label="Supplier"
        name="supplier"
        hideLabel={false}
        items={supplierFilterOptions}
        selectedId={supplierId}
        onChange={handleComboBoxChange('supplierId', onUpdateFilters)}
      />
      <DatePicker label="From" name="dateFrom" value={dateFrom} onSelect={onDatePickerChange('dateFrom', onUpdateFilters)} />
      <DatePicker label="To" name="dateTo" value={dateTo} onSelect={onDatePickerChange('dateTo', onUpdateFilters)} />
      <Search
        name="search"
        id="Search_Box"
        label="Search"
        placeholder="Search"
        maxLength={255}
        value={keywords}
        onChange={onSelectChange('keywords', onUpdateFilters)}
      />
    </FilterBar>
    <hr />
    <div className={style.total}>
      {`Total amount: ${total}`}
      <br />
      {`Due amount: ${totalDue}`}
    </div>
  </React.Fragment>
);

BillListFilterOptions.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  onUpdateFilters: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({
    status: PropTypes.string,
    supplierId: PropTypes.string,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    keywords: PropTypes.string,
  }).isRequired,
  supplierFilterOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  statusFilterOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  total: PropTypes.string.isRequired,
  totalDue: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
  supplierFilterOptions: getSupplierFilterOptions(state),
  statusFilterOptions: getStatusFilterOptions(state),
  total: getTotal(state),
  totalDue: getTotalDue(state),
});

export default connect(mapStateToProps)(BillListFilterOptions);
