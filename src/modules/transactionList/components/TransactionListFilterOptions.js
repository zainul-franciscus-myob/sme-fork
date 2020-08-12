import { FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountList,
  getActiveTab,
  getFilterOptions,
  getRegion,
  getSourceJournalFilterOptions,
} from '../selectors/transactionListSelectors';
import { tabItemIds } from '../tabItems';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import FilterBarSearch from '../../../components/FilterBarSearch/FilterBarSearch';
import PeriodPicker from '../../../components/PeriodPicker/PeriodPicker';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './TransactionListFilterOptions.module.css';

const TransactionListFilterOptions = ({
  accountList,
  region,
  filterOptions: {
    sourceJournal,
    dateFrom,
    dateTo,
    keywords,
    accountId,
    period,
  },
  sourceJournalFilterOptions,
  activeTab,
  onUpdateFilters,
  onResetFilters,
  onPeriodChange,
}) => (
  <FilterBar onReset={onResetFilters}>
    <FilterBar.Group>
      <PeriodPicker
        region={region}
        period={period}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onChange={onPeriodChange}
      />
    </FilterBar.Group>
    <Select
      name="sourceJournal"
      label="Source journal"
      value={sourceJournal}
      onChange={handleSelectChange(onUpdateFilters)}
    >
      {sourceJournalFilterOptions.map(({ label, value }) => (
        <Select.Option value={value} label={label} key={value} />
      ))}
    </Select>
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
  sourceJournalFilterOptions: getSourceJournalFilterOptions(state),
  activeTab: getActiveTab(state),
  accountList: getAccountList(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(TransactionListFilterOptions);
