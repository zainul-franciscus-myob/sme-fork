import {
  FilterBar, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountList, getFilterOptions, getRegion, getSourceJournalFilterOptions,
} from '../creditsAndDebitsListSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import PeriodPicker from '../../../components/PeriodPicker/PeriodPicker';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './CreditsAndDebitsListView.module.css';

const CreditsAndDebitsListFilterOptions = ({
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
  onApplyFilter,
  onUpdateFilters,
  onPeriodChange,
}) => (
  <FilterBar onApply={onApplyFilter}>
    <PeriodPicker
      region={region}
      period={period}
      dateFrom={dateFrom}
      dateTo={dateTo}
      onChange={onPeriodChange}
    />
    <Select name="sourceJournal" label="Source Journal" value={sourceJournal} onChange={handleSelectChange(onUpdateFilters)}>
      {sourceJournalFilterOptions.map(({ label, value }) => (
        <Select.Option value={value} label={label} key={value} />
      ))}
    </Select>
    <AccountCombobox
      label="Account"
      name="accountId"
      items={accountList}
      selectedId={accountId}
      onChange={handleComboboxChange('accountId', onUpdateFilters)}
    />
    <Search
      className={styles.search}
      label="Search"
      name="keywords"
      maxLength={255}
      value={keywords}
      onChange={handleInputChange(onUpdateFilters)}
    />
  </FilterBar>
);

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
  sourceJournalFilterOptions: getSourceJournalFilterOptions(state),
  accountList: getAccountList(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(CreditsAndDebitsListFilterOptions);