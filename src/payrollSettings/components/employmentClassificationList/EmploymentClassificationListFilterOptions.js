import { FilterBar, Search } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmploymentClassificationFilterOptions } from '../../selectors/employmentClassificationListSelectors';
import handleInputChange from '../../../components/handlers/handleInputChange';

const EmploymentClassificationListFilterOptions = (props) => {
  const {
    keywords,
    onUpdateFilterOptions,
    onApplyFilter,
  } = props;

  return (
    <FilterBar onApply={onApplyFilter}>
      <Search
        id="keywords"
        label="Search"
        name="keywords"
        placeholder="Search"
        maxLength={255}
        value={keywords}
        onChange={handleInputChange(onUpdateFilterOptions)}
      />
    </FilterBar>
  );
};

const mapStateToProps = state => getEmploymentClassificationFilterOptions(state);

export default connect(mapStateToProps)(EmploymentClassificationListFilterOptions);
