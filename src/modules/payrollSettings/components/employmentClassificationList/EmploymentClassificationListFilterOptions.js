import { FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmploymentClassificationFilterOptions } from '../../selectors/employmentClassificationListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const EmploymentClassificationListFilterOptions = (props) => {
  const { keywords, onUpdateFilterOptions } = props;

  return (
    <FilterBar>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={handleInputChange(onUpdateFilterOptions)}
      />
    </FilterBar>
  );
};

const mapStateToProps = (state) =>
  getEmploymentClassificationFilterOptions(state);

export default connect(mapStateToProps)(
  EmploymentClassificationListFilterOptions
);
