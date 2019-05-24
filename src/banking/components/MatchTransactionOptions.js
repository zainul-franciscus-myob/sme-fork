import {
  DatePicker, FilterBar, Search,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getMatchTransactionFilterOptions } from '../bankingSelectors/matchTransactionSelectors';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import styles from './BankingView.css';

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
    <React.Fragment>
      <FilterBar onApply={onApplyMatchTransactionOptions}>
        <DatePicker name="dateFrom" label="Date from" value={dateFrom} onSelect={handleDateChange(onUpdateMatchTransactionOptions, 'dateFrom')} />
        <DatePicker name="dateTo" label="Date to" value={dateTo} onSelect={handleDateChange(onUpdateMatchTransactionOptions, 'dateTo')} />
        <AmountInput label="Amount from ($)" name="amountFrom" className={styles.amountInput} value={amountFrom} onChange={handleAmountChange(onUpdateMatchTransactionOptions)} />
        <AmountInput label="Amount to ($)" name="amountTo" className={styles.amountInput} value={amountTo} onChange={handleAmountChange(onUpdateMatchTransactionOptions)} />
        <Search name="keywords" label="Search" id="search" placeholder="Search" maxLength={255} value={keywords} onChange={handleInputChange(onUpdateMatchTransactionOptions)} />
      </FilterBar>
    </React.Fragment>
  );
};

MatchTransactionOptions.propTypes = {
  filterOptions: PropTypes.shape({
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    amountFrom: PropTypes.string,
    amountTo: PropTypes.string,
    keywords: PropTypes.string,
  }).isRequired,
  onApplyMatchTransactionOptions: PropTypes.func.isRequired,
  onUpdateMatchTransactionOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filterOptions: getMatchTransactionFilterOptions(state),
});

export default connect(mapStateToProps)(MatchTransactionOptions);
