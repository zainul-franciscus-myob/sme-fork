import { FilterBar, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions, getTypeFilterOptions } from '../contactListSelector';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import ShowInactiveCheckbox from '../../../../components/ShowInactiveCheckbox/ShowInactiveCheckbox';

class ContactListFilterOptions extends React.Component {
  onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  };

  onSelectChange = (e) => {
    const filterName = 'type';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  };

  onCheckboxChange = (e) => {
    const filterName = 'showInactive';
    const { onUpdateFilters } = this.props;
    const value = e.target.checked;
    onUpdateFilters({ filterName, value });
  };

  render = () => {
    const {
      filterOptions: { type, keywords, showInactive },
      typeFilterOptions,
      onResetFilter,
    } = this.props;

    return (
      <FilterBar onReset={onResetFilter}>
        <Select
          name="type"
          label="Contact type"
          value={type}
          onChange={this.onSelectChange}
        >
          {typeFilterOptions.map(({ label, value }) => (
            <Select.Option value={value} label={label} key={value} />
          ))}
        </Select>
        <FilterBarSearch
          id="Search_Box"
          name="keywords"
          label="Search"
          placeholder=""
          maxLength={255}
          value={keywords}
          onChange={this.onSearchBoxChange}
        />
        <FilterBar.Item>
          <ShowInactiveCheckbox
            id="Check_Box"
            name="showInactive"
            label="Show inactive"
            checked={showInactive}
            onChange={this.onCheckboxChange}
          />
        </FilterBar.Item>
      </FilterBar>
    );
  };
}

const mapStateToProps = (state) => ({
  filterOptions: getFilterOptions(state),
  typeFilterOptions: getTypeFilterOptions(state),
});

export default connect(mapStateToProps)(ContactListFilterOptions);
