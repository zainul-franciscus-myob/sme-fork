import {
  Button, DatePicker, DirectSearchBox, FilterBar, InputLabel,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getFilterOptions } from '../SpendMoneyListSelectors';

class SpendMoneyFilterOptions extends React.Component {
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

  render = () => {
    const {
      filterOptions: {
        dateFrom,
        dateTo,
        keywords,
      },
      onApplyFilter,
    } = this.props;

    return (
      <FilterBar>
        <FilterBar.Group>
          <FilterBar.Option>
            <InputLabel label="From" id="Date_From" />
            <DatePicker inputProps={{ id: 'Date_From' }} dateTime={dateFrom} onChange={this.onFilterChange('dateFrom')} />
          </FilterBar.Option>
          <FilterBar.Option>
            <InputLabel label="To" id="Date_To" />
            <DatePicker inputProps={{ id: 'Date_To' }} dateTime={dateTo} onChange={this.onFilterChange('dateTo')} />
          </FilterBar.Option>
          <FilterBar.Option>
            <InputLabel label="Description" id="Search_Box" />
            <DirectSearchBox id="Search_Box" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
          </FilterBar.Option>
          <FilterBar.Option>
            <Button type="link" onClick={onApplyFilter}>Apply filters</Button>
          </FilterBar.Option>
        </FilterBar.Group>
      </FilterBar>
    );
  }
}

SpendMoneyFilterOptions.propTypes = {
  onApplyFilter: PropTypes.func.isRequired,
  onUpdateFilters: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  filterOptions: getFilterOptions(state),
});

export default connect(mapStateToProps)(SpendMoneyFilterOptions);
