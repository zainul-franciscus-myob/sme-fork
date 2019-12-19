import {
  Checkbox, FilterBar, Search, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions, getTypeOptions } from '../itemListSelectors';
import styles from './ItemListFilterOptions.module.css';

class ItemListFilterOptions extends React.Component {
  onSelectChange = (e) => {
    const filterName = 'type';
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
        type,
        keywords,
        showInactive,
      },
      typeOptions,
      onApplyFilter,
    } = this.props;

    return (
      <FilterBar onApply={onApplyFilter}>
        <Select name="type" label="Item type" value={type} onChange={this.onSelectChange}>
          {typeOptions.map(({ label, value }) => (
            <Select.Option value={value} label={label} key={value} />
          ))}
        </Select>
        <Search name="keyword" className={styles.searchBox} label="Search" placeholder="" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
        <FilterBar.Item>
          <Checkbox id="Check_Box" name="showInactive" label="Show inactive" checked={showInactive} onChange={this.onCheckboxChange} />
        </FilterBar.Item>
      </FilterBar>
    );
  }
}

const mapStateToProps = state => ({
  typeOptions: getTypeOptions(state),
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(ItemListFilterOptions);
