import {
  Checkbox, FilterBar, Search,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../BankingRuleListSelectors';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './BankingRuleListFilterOptions.module.css';

const BankingRuleListFilterOptions = ({
  onUpdateFilters,
  onApplyFilters,
  filterOptions: {
    keywords,
    showInactive,
  },
}) => (
  <FilterBar onApply={onApplyFilters}>
    <Search
      name="keywords"
      label="Search"
      className={styles.search}
      maxLength={255}
      value={keywords}
      onChange={handleInputChange(onUpdateFilters)}
    />
    <FilterBar.Item>
      <Checkbox
        name="showInactive"
        label="Show inactive"
        checked={showInactive}
        onChange={handleCheckboxChange(onUpdateFilters)}
      />
    </FilterBar.Item>
  </FilterBar>
);

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(BankingRuleListFilterOptions);
