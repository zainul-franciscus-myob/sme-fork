import { Checkbox, FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions, getTypeOptions } from '../itemListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const ItemListFilterOptions = ({
  filterOptions: { type, keywords, showInactive },
  typeOptions,
  onUpdateFilters,
}) => (
  <FilterBar>
    <Select
      name="type"
      label="Item type"
      value={type}
      onChange={handleSelectChange(onUpdateFilters)}
    >
      {typeOptions.map(({ label, value }) => (
        <Select.Option value={value} label={label} key={value} />
      ))}
    </Select>
    <FilterBarSearch
      name="keywords"
      value={keywords}
      onChange={handleInputChange(onUpdateFilters)}
    />
    <FilterBar.Item>
      <Checkbox
        id="Check_Box"
        name="showInactive"
        label="Show inactive"
        checked={showInactive}
        onChange={handleCheckboxChange(onUpdateFilters)}
      />
    </FilterBar.Item>
  </FilterBar>
);

const mapStateToProps = (state) => ({
  typeOptions: getTypeOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(ItemListFilterOptions);
