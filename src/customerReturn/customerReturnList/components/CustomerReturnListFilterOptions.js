import {
  FilterBar, Search,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getCustomerFilterOptions, getFilterOptions, getTotalAmount, getTotalCreditAmount,
} from '../CustomerReturnListSelectors';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
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
      <CustomerCombobox
        label="Customer"
        name="customerId"
        hideLabel={false}
        items={customerFilterOptions}
        selectedId={customerId}
        onChange={onComboBoxChange('customerId', onUpdateFilterBarOptions)}
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

      <span className={style.totalCreditAmount}>{`Total credit amount: ${totalCreditAmount}`}</span>
    </div>

  </React.Fragment>
);

const filterOptionShape = {
  name: PropTypes.string,
  value: PropTypes.string,
};

CustomerReturnListFilterOptions.propTypes = {
  onUpdateFilterBarOptions: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  totalAmount: PropTypes.string.isRequired,
  totalCreditAmount: PropTypes.string.isRequired,
  customerFilterOptions: PropTypes.arrayOf(PropTypes.shape(filterOptionShape)).isRequired,
  filterOptions: PropTypes.shape(filterOptionShape).isRequired,
};

const mapStateToProps = state => ({
  totalAmount: getTotalAmount(state),
  totalCreditAmount: getTotalCreditAmount(state),
  customerFilterOptions: getCustomerFilterOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(CustomerReturnListFilterOptions);
