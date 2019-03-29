import {
  Button, Checkbox, DirectSearchBox, FilterBar, InputLabel, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getFilterOptions, getTypeOptions } from '../itemListSelectors';

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
      <FilterBar>
        <FilterBar.Group>
          <FilterBar.Option>
            <Select name="type" label="Type" value={type} onChange={this.onSelectChange}>
              {typeOptions.map(({ label, value }) => (
                <Select.Option value={value} label={label} key={value} />
              ))}
            </Select>
          </FilterBar.Option>
          <FilterBar.Option>
            <InputLabel label="Search" id="Search_Box" />
            <DirectSearchBox id="Search_Box" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
          </FilterBar.Option>
          <FilterBar.Option>
            <Checkbox id="Check_Box" name="showInactive" label="Show inactive items" checked={showInactive} onChange={this.onCheckboxChange} />
          </FilterBar.Option>
          <FilterBar.Option>
            <Button type="secondary" onClick={onApplyFilter}>Apply filters</Button>
          </FilterBar.Option>
        </FilterBar.Group>
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
