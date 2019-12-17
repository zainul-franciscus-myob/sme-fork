
import { connect } from 'react-redux';
import React from 'react';


import {
  getCustomerFilterOptions, getFilterOptions, getTotalAmount, getTotalCreditAmount,
} from '../CustomerReturnListSelectors';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import style from './CustomerReturnListFilterOptions.module.css';

const onTextFieldChange = handler => ({ target: { name: key, value } }) => handler({ key, value });

const onComboBoxChange = (key, handler) => ({ value }) => handler({ key, value });

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
      <div className={style.customerCombobox}>
        <CustomerCombobox
          label="Customer"
          name="customerId"
          hideLabel={false}
          items={customerFilterOptions}
          selectedId={customerId}
          onChange={onComboBoxChange('customerId', onUpdateFilterBarOptions)}
        />
      </div>
      <FilterBarSearch
        id="keywords"
        label="Search"
        name="keywords"
        placeholder=""
        maxLength={255}
        value={keywords}
        onChange={onTextFieldChange(onUpdateFilterBarOptions)}
      />
    </FilterBar>

    <hr />

    <div className={style.totals}>
      <span className={style.totalAmount}>{`Total amount ${totalAmount}`}</span>

      <span className={style.totalCreditAmount}>{`Total balance due ${totalCreditAmount}`}</span>
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
