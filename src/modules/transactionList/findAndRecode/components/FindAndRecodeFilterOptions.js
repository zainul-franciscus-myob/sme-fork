import { FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountList,
  getFilterOptions,
  getRegion,
  getTaxCodeList,
} from '../findAndRecodeSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import PeriodPicker from '../../../../components/PeriodPicker/PeriodPicker';
import SourceJournalSelect, {
  SourceJournalType,
} from '../../components/SourceJournalSelect';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './FindAndRecodeFilterOptions.module.css';

const FindAndRecodeFilterOptions = ({
  accountList,
  taxCodeList,
  region,
  filterOptions: {
    sourceJournal,
    dateFrom,
    dateTo,
    keywords,
    accountId,
    taxCodeId,
    period,
  },
  onUpdateFilters,
  onResetFilters,
  onPeriodChange,
}) => (
  <FilterBar onReset={onResetFilters}>
    <FilterBar.Group>
      <PeriodPicker
        className={styles.period}
        region={region}
        period={period}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onChange={onPeriodChange}
      />
    </FilterBar.Group>
    <SourceJournalSelect
      className={styles.sourceJournal}
      value={sourceJournal}
      onChange={onUpdateFilters}
      showSourceJournalTypes={[
        SourceJournalType.ALL,
        SourceJournalType.GENERAL,
        SourceJournalType.SALE,
        SourceJournalType.PURCHASE,
        SourceJournalType.CASH_RECEIPT,
        SourceJournalType.CASH_PAYMENT,
      ]}
    />
    <AccountCombobox
      className={styles.account}
      label="Account"
      name="accountId"
      items={accountList}
      selectedId={accountId}
      onChange={handleComboboxChange('accountId', onUpdateFilters)}
      hintText="All"
      allowClear
      hasAllItem
    />
    <TaxCodeCombobox
      className={styles.taxCode}
      label="Tax code"
      name="taxCode"
      items={taxCodeList}
      selectedId={taxCodeId}
      onChange={handleComboboxChange('taxCodeId', onUpdateFilters)}
      hintText="All"
      hasAllItem
    />
    <FilterBarSearch
      className={styles.search}
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
  accountList: getAccountList(state),
  taxCodeList: getTaxCodeList(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(FindAndRecodeFilterOptions);
