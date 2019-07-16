import {
  FilterBar, Search,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilterOptions, getSupplierFilterOptions, getTotalAmount, getTotalDebitAmount,
} from '../supplierReturnListSelectors';
import SupplierCombobox from '../../../components/combobox/SupplierCombobox';
import style from './SupplierReturnListFilterOptions.module.css';

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
      <SupplierCombobox
        label="Supplier"
        name="supplierId"
        hideLabel={false}
        items={supplierFilterOptions}
        selectedId={supplierId}
        onChange={onSupplierComboboxChange(onUpdateFilterBarOptions)}
      />
      <Search
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

    <div className={style.totals}>
      <span className={style.totalAmount}>{`Total amount: ${totalAmount}`}</span>
      <span className={style.totalDebitAmount}>{`Total debit amount: ${totalDebitAmount}`}</span>
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
