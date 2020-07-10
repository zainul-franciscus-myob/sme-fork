import { DatePicker, FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getFilterOptions,
  getHasOverdue,
  getStatusFilterOptions,
  getSupplierFilterOptions,
  getTotal,
  getTotalDue,
  getTotalOverdue,
} from '../billListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import SupplierCombobox from '../../../../components/combobox/SupplierCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './BillListFilterOptions.module.css';

const BillListFilterOptions = ({
  filterOptions: { status, supplierId, dateFrom, dateTo, keywords },
  supplierFilterOptions,
  statusFilterOptions,
  total,
  totalDue,
  totalOverdue,
  hasOverdue,
  onUpdateFilters,
}) => (
  <React.Fragment>
    <FilterBar>
      <Select
        name="status"
        label="Status"
        value={status}
        onChange={handleSelectChange(onUpdateFilters)}
      >
        {statusFilterOptions.map(({ name, value }) => (
          <Select.Option value={value} label={name} key={value} />
        ))}
      </Select>
      <div className={styles.supplier}>
        <SupplierCombobox
          label="Supplier"
          name="supplier"
          hideLabel={false}
          items={supplierFilterOptions}
          selectedId={supplierId}
          onChange={handleComboboxChange('supplierId', onUpdateFilters)}
          hintText="All"
          allowClear
          hasAllItem
        />
      </div>
      <FilterBar.Group>
        <DatePicker
          label="Issue from"
          name="dateFrom"
          value={dateFrom}
          onSelect={handleDateChange('dateFrom', onUpdateFilters)}
        />
        <DatePicker
          label="Issue to"
          name="dateTo"
          value={dateTo}
          onSelect={handleDateChange('dateTo', onUpdateFilters)}
        />
      </FilterBar.Group>
      <FilterBarSearch
        name="keywords"
        value={keywords}
        onChange={handleInputChange(onUpdateFilters)}
      />
    </FilterBar>
    <hr />
    <div className={styles.total}>
      <div>{`Total amount ${total}`}</div>
      <div>{`Balance due ${totalDue}`}</div>
      <div
        className={classnames(styles.totalOverdue, {
          [styles.hasOverdue]: hasOverdue,
        })}
      >{`Overdue ${totalOverdue}`}</div>
    </div>
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
  supplierFilterOptions: getSupplierFilterOptions(state),
  statusFilterOptions: getStatusFilterOptions(state),
  total: getTotal(state),
  totalDue: getTotalDue(state),
  totalOverdue: getTotalOverdue(state),
  hasOverdue: getHasOverdue(state),
});

export default connect(mapStateToProps)(BillListFilterOptions);
