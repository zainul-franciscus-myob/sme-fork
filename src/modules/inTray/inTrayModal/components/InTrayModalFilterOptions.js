import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../InTrayModalSelectors';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const InTrayModalFilterOptions = (props) => {
  const {
    keywords,
    onUpdateFilterOptions,
    onApplyFilter,
  } = props;

  return (
    <FilterBar onApply={onApplyFilter}>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={handleInputChange(onUpdateFilterOptions)}
      />
    </FilterBar>
  );
};

const mapStateToProps = state => getFilterOptions(state);

export default connect(mapStateToProps)(InTrayModalFilterOptions);
