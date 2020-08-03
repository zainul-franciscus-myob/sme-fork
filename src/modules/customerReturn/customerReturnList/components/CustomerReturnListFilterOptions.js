import { FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCustomerFilterOptions,
  getFilterOptions,
  getTotalAmount,
  getTotalCreditAmount,
} from '../CustomerReturnListSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './CustomerReturnListFilterOptions.module.css';

const handleComboboxChange = (key, handler) => ({ id: value } = {}) =>
  handler({ key, value });

const CustomerReturnListFilterOptions = ({
  onUpdateFilterBarOptions,
  onResetFilterBarOptions,
  totalAmount,
  totalCreditAmount,
  customerFilterOptions,
  filterOptions: { keywords, customerId },
}) => (
  <React.Fragment>
    <FilterBar onReset={onResetFilterBarOptions}>
      <div className={styles.customerCombobox}>
        <CustomerCombobox
          label="Customer"
          name="customerId"
          hideLabel={false}
          items={customerFilterOptions}
          selectedId={customerId}
          onChange={handleComboboxChange(
            'customerId',
            onUpdateFilterBarOptions
          )}
          width="lg"
          hintText="All"
          allowClear
          hasAllItem
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
      <span
        className={styles.totalAmount}
      >{`Total amount ${totalAmount}`}</span>

      <span
        className={styles.totalCreditAmount}
      >{`Total balance due ${totalCreditAmount}`}</span>
    </div>
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  totalAmount: getTotalAmount(state),
  totalCreditAmount: getTotalCreditAmount(state),
  customerFilterOptions: getCustomerFilterOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(CustomerReturnListFilterOptions);
