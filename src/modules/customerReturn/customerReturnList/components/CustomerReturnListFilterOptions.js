import { connect } from 'react-redux';
import React from 'react';


import {
  getCustomerFilterOptions,
  getFilterOptions,
  getTotalAmount,
  getTotalCreditAmount,
} from '../CustomerReturnListSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './CustomerReturnListFilterOptions.module.css';

const handleComboboxChange = (key, handler) => ({ value } = {}) => handler({ key, value });

const CustomerReturnListFilterOptions = ({
  onUpdateFilterBarOptions,
  onApplyFilter,
  totalAmount,
  totalCreditAmount,
  customerFilterOptions,
  filterOptions: {
    keywords,
    customerId,
  },
}) => (
  <React.Fragment>
    <FilterBar onApply={onApplyFilter}>
      <div className={styles.customerCombobox}>
        <CustomerCombobox
          label="Customer"
          name="customerId"
          hideLabel={false}
          items={customerFilterOptions}
          selectedId={customerId}
          onChange={handleComboboxChange('customerId', onUpdateFilterBarOptions)}
          width="lg"
          hintText="All"
          allowClear
        />
      </div>
      <FilterBarSearch
        id="keywords"
        label="Search"
        name="keywords"
        placeholder=""
        maxLength={255}
        value={keywords}
        onChange={handleInputChange(onUpdateFilterBarOptions)}
      />
    </FilterBar>

    <hr />

    <div className={styles.totals}>
      <span className={styles.totalAmount}>{`Total amount ${totalAmount}`}</span>

      <span className={styles.totalCreditAmount}>{`Total balance due ${totalCreditAmount}`}</span>
    </div>

  </React.Fragment>
);

const mapStateToProps = state => ({
  totalAmount: getTotalAmount(state),
  totalCreditAmount: getTotalCreditAmount(state),
  customerFilterOptions: getCustomerFilterOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(CustomerReturnListFilterOptions);
