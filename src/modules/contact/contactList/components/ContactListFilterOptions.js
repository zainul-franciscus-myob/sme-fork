import {
  Checkbox, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions, getTypeFilterOptions } from '../contactListSelector';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import styles from './ContactListFilterOptions.module.css';

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
      onApplyFilter,
      onResetFilter,
    } = this.props;

    return (
      <FilterBar onApply={onApplyFilter} onReset={onResetFilter}>
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
        <Search
          id="Search_Box"
          name="keywords"
          label="Search"
          placeholder=""
          maxLength={255}
          value={keywords}
          onChange={this.onSearchBoxChange}
          className={styles.search}
        />
        <FilterBar.Item>
          <Checkbox
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

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
  typeFilterOptions: getTypeFilterOptions(state),
});

export default connect(mapStateToProps)(ContactListFilterOptions);
