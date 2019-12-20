import { Checkbox } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../AccountListSelectors';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const AccountListFilterOptions = (props) => {
  const {
    keywords,
    showInactive,
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
      <FilterBar.Item>
        <Checkbox
          id="showInactive"
          name="showInactive"
          label="Show inactive"
          checked={showInactive}
          onChange={handleCheckboxChange(onUpdateFilterOptions)}
        />
      </FilterBar.Item>
    </FilterBar>
  );
};

const mapStateToProps = state => getFilterOptions(state);

export default connect(mapStateToProps)(AccountListFilterOptions);
