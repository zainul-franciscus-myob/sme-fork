import {
  Checkbox, FilterBar, Search,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getFilterOptions } from '../EmployeeListSelectors';

const onTextFieldChange = handler => ({ target: { name: key, value } }) => handler({ key, value });

const onCheckBoxChange = handler => (
  { target: { name: key, checked: value } },
) => handler({ key, value });

const EmployeeListFilterOptions = (props) => {
  const {
    onUpdateFilterBarOptions,
    keywords,
    showInactive,
    onApplyFilter,
  } = props;

  return (
    <FilterBar onApply={onApplyFilter}>
      <Search id="keywords" label="Search" name="keywords" placeholder="Search" maxLength={255} value={keywords} onChange={onTextFieldChange(onUpdateFilterBarOptions)} />
      <FilterBar.Item>
        <Checkbox id="showInactive" name="showInactive" label="Show inactive employees" checked={showInactive} onChange={onCheckBoxChange(onUpdateFilterBarOptions)} />
      </FilterBar.Item>
    </FilterBar>
  );
};

EmployeeListFilterOptions.propTypes = {
  onUpdateFilterBarOptions: PropTypes.func.isRequired,
  keywords: PropTypes.string.isRequired,
  showInactive: PropTypes.bool.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => getFilterOptions(state);

export default connect(mapStateToProps)(EmployeeListFilterOptions);
