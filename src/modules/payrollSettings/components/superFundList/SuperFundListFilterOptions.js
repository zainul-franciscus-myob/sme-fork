import { FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../../selectors/superFundListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';

const onInputChange = (handler) => ({ target: { name: key, value } }) =>
  handler({ key, value });

const SuperFundListFilterOptions = (props) => {
  const { keywords, onUpdateFilterOptions, onResetFilterOptions } = props;

  return (
    <FilterBar onReset={onResetFilterOptions}>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={onInputChange(onUpdateFilterOptions)}
      />
    </FilterBar>
  );
};

const mapStateToProps = (state) => getFilterOptions(state);

export default connect(mapStateToProps)(SuperFundListFilterOptions);
