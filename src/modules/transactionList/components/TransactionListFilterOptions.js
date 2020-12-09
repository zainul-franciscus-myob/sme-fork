import { FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountList,
  getActiveTab,
  getFilterOptions,
  getLastMonthInFinancialYear,
} from '../selectors/transactionListSelectors';
import { tabItemIds } from '../tabItems';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import FilterBarSearch from '../../../components/FilterBarSearch/FilterBarSearch';
import PeriodPicker from '../../../components/PeriodPicker/PeriodPicker';
import SourceJournalSelect from './SourceJournalSelect';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './TransactionListFilterOptions.module.css';

const TransactionListFilterOptions = ({
  accountList,
  filterOptions: {
    sourceJournal,
    dateFrom,
    dateTo,
    keywords,
    accountId,
    period,
  },
  activeTab,
  lastMonthInFinancialYear,
  onUpdateFilters,
  onResetFilters,
  onPeriodChange,
}) => (
  <FilterBar onReset={onResetFilters}>
    <FilterBar.Group>
      <PeriodPicker
        lastMonthInFinancialYear={lastMonthInFinancialYear}
        period={period}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onChange={onPeriodChange}
      />
    </FilterBar.Group>
    <SourceJournalSelect value={sourceJournal} onChange={onUpdateFilters} />
    {activeTab === tabItemIds.debitsAndCredits && (
      <div className={styles.accountCombo}>
        <AccountCombobox
          label="Account"
          name="accountId"
          items={accountList}
          selectedId={accountId}
          onChange={handleComboboxChange('accountId', onUpdateFilters)}
          hintText="All"
          allowClear
          hasAllItem
        />
      </div>
    )}
    <FilterBarSearch
      className={activeTab === tabItemIds.debitsAndCredits ? styles.search : ''}
      label="Search"
      placeholder=""
      name="keywords"
      maxLength={255}
      value={keywords}
      onChange={handleInputChange(onUpdateFilters)}
    />
  </FilterBar>
);

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
  activeTab: getActiveTab(state),
  accountList: getAccountList(state),
  lastMonthInFinancialYear: getLastMonthInFinancialYear(state),
});

export default connect(mapStateToProps)(TransactionListFilterOptions);
