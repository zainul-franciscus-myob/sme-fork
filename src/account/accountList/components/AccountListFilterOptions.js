import { Checkbox, FilterBar, Search } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../AccountListSelectors';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const AccountListFilterOptions = (props) => {
  const {
    keywords,
    showInactive,
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
