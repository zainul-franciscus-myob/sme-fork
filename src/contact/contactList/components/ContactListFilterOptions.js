import {
  Button, Checkbox, DirectSearchBox, FilterBar, InputLabel, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getFilterOptions, getTypeFilterOptions } from '../contactListSelector';

class ContactListFilterOptions extends React.Component {
  onFilterChange = filterName => (value) => {
    const { onUpdateFilters } = this.props;
    onUpdateFilters({ filterName, value });
  }

  onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  onSelectChange = (e) => {
    const filterName = 'type';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

  onCheckboxChange = (e) => {
    const filterName = 'showInactive';
    const { onUpdateFilters } = this.props;
    const value = e.target.checked;
    onUpdateFilters({ filterName, value });
  }

  render = () => {
    const {
      filterOptions: {
        type,
        keywords,
        showInactive,
      },
      typeFilterOptions,
      onApplyFilter,
    } = this.props;

    return (
      <FilterBar>
        <FilterBar.Group>
          <FilterBar.Option>
            <Select name="Type" label="Contact type" value={type} onChange={this.onSelectChange}>
              {typeFilterOptions.map(({ label, value }) => (
                <Select.Option value={value} label={label} key={value} />
              ))}
            </Select>
          </FilterBar.Option>
          <FilterBar.Option>
            <InputLabel label="Search" id="Search_Box" />
            <DirectSearchBox id="Search_Box" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
          </FilterBar.Option>
          <FilterBar.Option>
            <Checkbox id="Check_Box" name="showInactive" label="Show inactive contacts" checked={showInactive} onChange={this.onCheckboxChange} />
          </FilterBar.Option>
          <FilterBar.Option>
            <Button type="secondary" onClick={onApplyFilter}>Apply filters</Button>
          </FilterBar.Option>
        </FilterBar.Group>
      </FilterBar>
    );
  }
}

ContactListFilterOptions.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  onUpdateFilters: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({
    type: PropTypes.string,
    keywords: PropTypes.string,
    showInactive: PropTypes.bool,
  }).isRequired,
  typeFilterOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
  typeFilterOptions: getTypeFilterOptions(state),
});

export default connect(mapStateToProps)(ContactListFilterOptions);
