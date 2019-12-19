import {
  DatePicker, Search,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getMatchTransactionFilterOptions } from '../bankingSelectors/matchTransactionSelectors';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import FilterBar from '../../components/Feelix/FilterBar/FilterBar';
import styles from './BankingView.module.css';

const handleDateChange = (handler, key) => ({ value }) => {
  handler({ key, value });
};

const handleAmountChange = handler => (e) => {
  const { name, rawValue } = e.target;
  handler({ key: name, value: rawValue });
};

const handleInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const MatchTransactionOptions = (props) => {
  const {
    filterOptions: {
      dateFrom,
      dateTo,
      amountFrom,
      amountTo,
      keywords,
    },
    onApplyMatchTransactionOptions,
    onUpdateMatchTransactionOptions,
  } = props;

  return (
    <div className={styles.filterOptions}>
      <FilterBar onApply={onApplyMatchTransactionOptions}>
        <DatePicker name="dateFrom" label="Date from" value={dateFrom} onSelect={handleDateChange(onUpdateMatchTransactionOptions, 'dateFrom')} />
        <DatePicker name="dateTo" label="Date to" value={dateTo} onSelect={handleDateChange(onUpdateMatchTransactionOptions, 'dateTo')} />
        <AmountInput label="Amount from ($)" name="amountFrom" className={styles.amountInput} value={amountFrom} onChange={handleAmountChange(onUpdateMatchTransactionOptions)} />
        <AmountInput label="Amount to ($)" name="amountTo" className={styles.amountInput} value={amountTo} onChange={handleAmountChange(onUpdateMatchTransactionOptions)} />
        <Search name="keywords" label="Search" id="search" maxLength={255} value={keywords} onChange={handleInputChange(onUpdateMatchTransactionOptions)} />
      </FilterBar>
    </div>
  );
};

const mapStateToProps = state => ({
  filterOptions: getMatchTransactionFilterOptions(state),
});

export default connect(mapStateToProps)(MatchTransactionOptions);
