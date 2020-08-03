import { Checkbox, FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../BankingRuleListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const BankingRuleListFilterOptions = ({
  onUpdateFilters,
  onResetFilters,
  filterOptions: { keywords, showInactive },
}) => (
  <FilterBar onReset={onResetFilters}>
    <FilterBarSearch
      name="keywords"
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

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(BankingRuleListFilterOptions);
