import { connect } from 'react-redux';
import React from 'react';

import {
  getFilterOptions,
  getSupplierFilterOptions,
  getTotalAmount,
  getTotalDebitAmount,
} from '../selectors/SupplierReturnListSelectors';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import SupplierCombobox from '../../../../components/combobox/SupplierCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './SupplierReturnListFilterOptions.module.css';

const SupplierReturnListFilterOptions = ({
  onUpdateFilterBarOptions,
  onResetFilterBarOptions,
  totalAmount,
  totalDebitAmount,
  supplierFilterOptions,
  filterOptions: { keywords, supplierId },
}) => (
  <React.Fragment>
    <FilterBar onReset={onResetFilterBarOptions}>
      <div className={styles.supplierCombobox}>
        <SupplierCombobox
          label="Supplier"
          name="supplierId"
          hideLabel={false}
          items={supplierFilterOptions}
          selectedId={supplierId}
          onChange={handleComboboxChange(
            'supplierId',
            onUpdateFilterBarOptions
          )}
          hintText="All"
          allowClear
          hasAllItem
        />
      </div>
      <FilterBarSearch
        id="keywords"
        label="Search"
        name="keywords"
        placeholder="Search"
        maxLength={255}
        value={keywords}
        onChange={handleInputChange(onUpdateFilterBarOptions)}
      />
    </FilterBar>

    <hr />

    <div className={styles.totals}>
      <span
        className={styles.totalAmount}
      >{`Total amount: ${totalAmount}`}</span>
      <span
        className={styles.totalDebitAmount}
      >{`Total debit amount: ${totalDebitAmount}`}</span>
    </div>
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  totalAmount: getTotalAmount(state),
  totalDebitAmount: getTotalDebitAmount(state),
  supplierFilterOptions: getSupplierFilterOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(SupplierReturnListFilterOptions);
