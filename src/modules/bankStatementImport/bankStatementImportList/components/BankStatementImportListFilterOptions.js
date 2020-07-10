import { FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getFilterOptions,
} from '../BankStatementImportListSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './BankStatementImportListFilterOptions.module.css';

const BankStatementImportListFilterOptions = ({
  accountOptions,
  filterOptions: { accountId },
  onUpdateFilterBarOptions,
}) => (
  <FilterBar>
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

const mapStateToProps = (state) => ({
  accountOptions: getAccountOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(BankStatementImportListFilterOptions);
