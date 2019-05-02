import {
  DatePicker, FilterBar, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getBalances,
  getBankAccounts,
  getFormattedFilterOptions,
  getShouldDisplayDateRange,
  getTransactionTypes,
} from '../bankingSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import styles from './BankingView.css';

class BankTransactionFilterOptions extends React.Component {
  onDateChange = filterName => ({ value }) => {
    const { onUpdateFilters } = this.props;
    onUpdateFilters({ filterName, value });
  }

  onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  onSelectChange = (e) => {
    const { value, name } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName: name, value });
  }

  onComboBoxChange = (item) => {
    const { id } = item;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName: 'bankAccount', value: id });
  }

  render = () => {
    const {
      filterOptions: {
        transactionType,
        dateFrom,
        dateTo,
        selectedBankAccountIndex,
        keywords,
      },
      balances: {
        bankBalance,
        myobBalance,
        unallocated,
      },
      transactionTypes,
      bankAccounts,
      onApplyFilter,
      shouldDisplayDateRange,
    } = this.props;

    const dateRangeFilter = shouldDisplayDateRange && (
      <React.Fragment>
        <DatePicker label="From" name="dateFrom" value={dateFrom} onSelect={this.onDateChange('dateFrom')} />
        <DatePicker label="To" name="dateTo" value={dateTo} onSelect={this.onDateChange('dateTo')} />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <FilterBar onApply={onApplyFilter}>
          <AccountCombobox
            items={bankAccounts}
            selectedIndex={selectedBankAccountIndex}
            onChange={this.onComboBoxChange}
            label="Bank account"
            hideLabel={false}
          />

          <FilterBar.Group>
            <Select name="transactionType" label="Type" value={transactionType} onChange={this.onSelectChange}>
              {transactionTypes.map(({ label, value }) => (
                <Select.Option value={value} label={label} key={value} />
              ))}
            </Select>

            {dateRangeFilter}
          </FilterBar.Group>
          <Search id="Search_Box" name="Search" label="Search" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
        </FilterBar>
        <hr />
        <div className={styles.balances}>
          <span className={styles.balanceItem}>{`Bank balance: ${bankBalance}`}</span>
          <span className={styles.balanceItem}>{`MYOB balance: ${myobBalance}`}</span>
          <span className={styles.unallocated}>{`Unallocated: ${unallocated}`}</span>
        </div>
      </React.Fragment>
    );
  }
}

BankTransactionFilterOptions.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  onUpdateFilters: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({}).isRequired,
  balances: PropTypes.shape({}).isRequired,
  transactionTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  bankAccounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  shouldDisplayDateRange: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  balances: getBalances(state),
  filterOptions: getFormattedFilterOptions(state),
  transactionTypes: getTransactionTypes(state),
  bankAccounts: getBankAccounts(state),
  shouldDisplayDateRange: getShouldDisplayDateRange(state),
});

export default connect(mapStateToProps)(BankTransactionFilterOptions);
