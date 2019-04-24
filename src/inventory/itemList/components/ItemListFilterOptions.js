import {
  Checkbox, FilterBar, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getFilterOptions, getTypeOptions } from '../itemListSelectors';

class ItemListFilterOptions extends React.Component {
  onSelectChange = (e) => {
    const filterName = 'filterBy';
    const { value } = e.target;

    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  onCheckboxChange = (e) => {
    const filterName = 'showInactive';
    const value = e.target.checked;
    const { onUpdateFilters } = this.props;
    onUpdateFilters({ filterName, value });
  }


  render = () => {
    const {
      filterOptions: {
        filterBy,
        keywords,
        showInactive,
      },
      typeOptions,
      onApplyFilter,
    } = this.props;

    return (
      <FilterBar onApply={onApplyFilter}>
        <Select name="filterBy" label="Type" value={filterBy} onChange={this.onSelectChange}>
          {typeOptions.map(({ label, value }) => (
            <Select.Option value={value} label={label} key={value} />
          ))}
        </Select>
        <Search label="Search" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
        <FilterBar.Item>
          <Checkbox id="Check_Box" name="showInactive" label="Show inactive items" checked={showInactive} onChange={this.onCheckboxChange} />
        </FilterBar.Item>
      </FilterBar>
    );
  }
}

ItemListFilterOptions.propTypes = {
  typeOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filterOptions: PropTypes.shape({}).isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  onUpdateFilters: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  typeOptions: getTypeOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(ItemListFilterOptions);
