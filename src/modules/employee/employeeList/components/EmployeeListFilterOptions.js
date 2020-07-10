import { Checkbox, FilterBar } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../EmployeeListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';

const onTextFieldChange = (handler) => ({ target: { name: key, value } }) =>
  handler({ key, value });

const onCheckBoxChange = (handler) => ({
  target: { name: key, checked: value },
}) => handler({ key, value });

const EmployeeListFilterOptions = (props) => {
  const { onUpdateFilterBarOptions, keywords, showInactive } = props;

  return (
    <FilterBar>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={onTextFieldChange(onUpdateFilterBarOptions)}
      />
      <FilterBar.Item>
        <Checkbox
          id="showInactive"
          name="showInactive"
          label="Show inactive employees"
          checked={showInactive}
          onChange={onCheckBoxChange(onUpdateFilterBarOptions)}
        />
      </FilterBar.Item>
    </FilterBar>
  );
};

const mapStateToProps = (state) => getFilterOptions(state);

export default connect(mapStateToProps)(EmployeeListFilterOptions);
