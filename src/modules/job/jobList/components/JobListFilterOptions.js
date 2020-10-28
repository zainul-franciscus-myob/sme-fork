import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../jobListSelector';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import ShowInactiveCheckbox from '../../../../components/ShowInactiveCheckbox/ShowInactiveCheckbox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const JobListFilterOptions = ({
  onUpdateFilters,
  onResetFilters,
  filterOptions: { keywords, showInactive },
}) => (
  <FilterBar onReset={onResetFilters}>
    <FilterBarSearch
      name="keywords"
      maxLength={255}
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
});

export default connect(mapStateToProps)(JobListFilterOptions);
