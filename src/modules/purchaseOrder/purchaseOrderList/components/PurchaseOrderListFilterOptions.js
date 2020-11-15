import { DatePicker, FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilterOptions,
  getSupplierFilterOptions,
  getTotal,
} from '../purchaseOrderListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import SupplierCombobox from '../../../../components/combobox/SupplierCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './PurchaseOrderListFilterOptions.module.css';

const PurchaseOrderListFilterOptions = ({
  filterOptions: { supplierId, dateFrom, dateTo, keywords },
  supplierFilterOptions,
  total,
  onUpdateFilters,
  onResetFilters,
}) => (
  <React.Fragment>
    <FilterBar onReset={onResetFilters}>
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
          label="Issued from"
          name="dateFrom"
          value={dateFrom}
          onSelect={handleDateChange('dateFrom', onUpdateFilters)}
        />
        <DatePicker
          label="Issued to"
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
      <div className={styles.totalAmount}>{`Total amount ${total}`}</div>
    </div>
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
  supplierFilterOptions: getSupplierFilterOptions(state),
  total: getTotal(state),
});

export default connect(mapStateToProps)(PurchaseOrderListFilterOptions);
