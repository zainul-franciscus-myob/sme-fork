import { FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilterOptions,
  getRuleIntentOptions,
} from '../BankingRuleListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import ShowInactiveCheckbox from '../../../../components/ShowInactiveCheckbox/ShowInactiveCheckbox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const BankingRuleListFilterOptions = ({
  onUpdateFilters,
  onResetFilters,
  filterOptions: { ruleIntent, keywords, showInactive },
  ruleIntentOptions,
}) => (
  <FilterBar onReset={onResetFilters}>
    <Select
      name="ruleIntent"
      label="Rule type"
      value={ruleIntent}
      onChange={handleSelectChange(onUpdateFilters)}
    >
      <Select.Option value="" label="All" key="All" />
      {ruleIntentOptions.map(({ label, value }) => (
        <Select.Option value={value} label={label} key={value} />
      ))}
    </Select>
    <FilterBarSearch
      name="keywords"
      value={keywords}
      onChange={handleInputChange(onUpdateFilters)}
    />
    <FilterBar.Item>
      <ShowInactiveCheckbox
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
  ruleIntentOptions: getRuleIntentOptions(state),
});

export default connect(mapStateToProps)(BankingRuleListFilterOptions);
