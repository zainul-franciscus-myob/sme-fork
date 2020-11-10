import { FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../EmployeeListNzSelector';
import FilterBarSearch from '../../../../../components/FilterBarSearch/FilterBarSearch';
// import ShowInactiveCheckbox from '../../../../../components/ShowInactiveCheckbox/ShowInactiveCheckbox';

const onTextFieldChange = (handler) => ({ target: { name: key, value } }) =>
  handler({ key, value });

// const onCheckBoxChange = (handler) => ({
//   target: { name: key, checked: value },
// }) => handler({ key, value });

const EmployeeListNzFilterOptions = (props) => {
  const {
    onUpdateFilterBarOptions,
    keywords,
    // showInactive,
    onResetFilterBarOptions,
  } = props;

  return (
    <FilterBar onReset={onResetFilterBarOptions}>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={onTextFieldChange(onUpdateFilterBarOptions)}
      />
      {/* 
      ! TODO: Uncomment when implement Employee Deactivation
      <FilterBar.Item>
        <ShowInactiveCheckbox
          id="showInactive"
          name="showInactive"
          label="Show inactive employees"
          checked={showInactive}
          onChange={onCheckBoxChange(onUpdateFilterBarOptions)}
        />
      </FilterBar.Item> */}
    </FilterBar>
  );
};

const mapStateToProps = (state) => getFilterOptions(state);

export default connect(mapStateToProps)(EmployeeListNzFilterOptions);
