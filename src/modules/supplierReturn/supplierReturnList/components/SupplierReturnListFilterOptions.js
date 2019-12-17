import { connect } from 'react-redux';
import React from 'react';

import {
  getFilterOptions, getSupplierFilterOptions, getTotalAmount, getTotalDebitAmount,
} from '../selectors/SupplierReturnListSelectors';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import SupplierCombobox from '../../../../components/combobox/SupplierCombobox';
import styles from './SupplierReturnListFilterOptions.module.css';

const onTextFieldChange = handler => ({ target: { name: key, value } }) => handler({ key, value });

const onSupplierComboboxChange = handler => ({ id }) => handler({ key: 'supplierId', value: id });

const SupplierReturnListFilterOptions = ({
  onUpdateFilterBarOptions,
  onApplyFilter,
  totalAmount,
  totalDebitAmount,
  supplierFilterOptions,
  filterOptions: {
    keywords,
    supplierId,
  },
}) => (
  <React.Fragment>
    <FilterBar onApply={onApplyFilter}>
      <div className={styles.supplierCombobox}>
        <SupplierCombobox
          label="Supplier"
          name="supplierId"
          hideLabel={false}
          items={supplierFilterOptions}
          selectedId={supplierId}
          onChange={onSupplierComboboxChange(onUpdateFilterBarOptions)}
        />
      </div>
      <FilterBarSearch
        id="keywords"
        label="Search"
        name="keywords"
        placeholder="Search"
        maxLength={255}
        value={keywords}
        onChange={onTextFieldChange(onUpdateFilterBarOptions)}
      />
    </FilterBar>

    <hr />

    <div className={styles.totals}>
      <span className={styles.totalAmount}>{`Total amount: ${totalAmount}`}</span>
      <span className={styles.totalDebitAmount}>{`Total debit amount: ${totalDebitAmount}`}</span>
    </div>

  </React.Fragment>
);

const mapStateToProps = state => ({
  totalAmount: getTotalAmount(state),
  totalDebitAmount: getTotalDebitAmount(state),
  supplierFilterOptions: getSupplierFilterOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(SupplierReturnListFilterOptions);
