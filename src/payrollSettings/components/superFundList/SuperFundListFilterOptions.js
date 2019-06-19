import { FilterBar, Search } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getFilterOptions } from '../../selectors/superFundListSelectors';

const onInputChange = handler => ({ target: { name: key, value } }) => handler({ key, value });

const SuperFundListFilterOptions = (props) => {
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
        onChange={onInputChange(onUpdateFilterOptions)}
      />
    </FilterBar>
  );
};

SuperFundListFilterOptions.propTypes = {
  keywords: PropTypes.string.isRequired,
  onUpdateFilterOptions: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => getFilterOptions(state);

export default connect(mapStateToProps)(SuperFundListFilterOptions);
