import {
  Button, DatePicker, FilterBar, InputLabel, Select,
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
  onFilterChange = filterName => (value) => {
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
        <FilterBar.Option>
          <InputLabel label="From" id="Date_From" />
          <DatePicker inputProps={{ id: 'Date_From' }} dateTime={dateFrom} onChange={this.onFilterChange('dateFrom')} />
        </FilterBar.Option>
        <FilterBar.Option>
          <InputLabel label="To" id="Date_To" />
          <DatePicker inputProps={{ id: 'Date_To' }} dateTime={dateTo} onChange={this.onFilterChange('dateTo')} />
        </FilterBar.Option>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <FilterBar>
          <FilterBar.Group>
            <FilterBar.Option>
              <AccountCombobox
                items={bankAccounts}
                selectedIndex={selectedBankAccountIndex}
                onChange={this.onComboBoxChange}
                label="Bank account"
                hideLabel={false}
              />
            </FilterBar.Option>
            <FilterBar.Option>
              <Select name="transactionType" label="Type" value={transactionType} onChange={this.onSelectChange}>
                {transactionTypes.map(({ label, value }) => (
                  <Select.Option value={value} label={label} key={value} />
                ))}
              </Select>
            </FilterBar.Option>

            {dateRangeFilter}

            <FilterBar.Option>
              <Button type="secondary" onClick={onApplyFilter}>Apply filters</Button>
            </FilterBar.Option>
          </FilterBar.Group>
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
