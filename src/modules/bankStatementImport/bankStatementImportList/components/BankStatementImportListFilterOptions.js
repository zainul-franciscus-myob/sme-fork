import { connect } from 'react-redux';
import React from 'react';

import { getAccountOptions, getFilterOptions } from '../BankStatementImportListSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './BankStatementImportListFilterOptions.module.css';

const BankStatementImportListFilterOptions = ({
  accountOptions,
  filterOptions: {
    accountId,
  },
  onUpdateFilterBarOptions,
  onApplyFilter,
}) => (
  <FilterBar onApply={onApplyFilter}>
    <div className={styles.account}>
      <AccountCombobox
        label="Bank account"
        name="accountId"
        hideLabel={false}
        items={accountOptions}
        selectedId={accountId}
        onChange={handleComboboxChange('accountId', onUpdateFilterBarOptions)}
        width="xl"
      />
    </div>
  </FilterBar>
);

const mapStateToProps = state => ({
  accountOptions: getAccountOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(BankStatementImportListFilterOptions);
