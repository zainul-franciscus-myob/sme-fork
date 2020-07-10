import { FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions, getIsEntryLoading } from '../InTrayModalSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const InTrayModalFilterOptions = (props) => {
  const {
    filterOptions: { keywords },
    isEntryLoading,
    onUpdateFilterOptions,
  } = props;

  return (
    <FilterBar>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={handleInputChange(onUpdateFilterOptions)}
        disabled={isEntryLoading}
      />
    </FilterBar>
  );
};

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
  isEntryLoading: getIsEntryLoading(state),
});

export default connect(mapStateToProps)(InTrayModalFilterOptions);
