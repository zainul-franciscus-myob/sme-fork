import { Card, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions, getRegion, getTransactionTypes } from '../selectors';
import FilterBar from '../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../components/FilterBarSearch/FilterBarSearch';
import PeriodPicker from '../../../components/PeriodPicker/PeriodPicker';

class BankTransactionFilterOptions extends React.Component {
  onSearchBoxChange = (e) => {
    const filterName = 'keywords';
    const { value } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  };

  onSelectChange = (e) => {
    const { value, name } = e.target;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName: name, value });
  };

  render = () => {
    const {
      region,
      filterOptions: { transactionType, period, dateFrom, dateTo, keywords },
      transactionTypes,
      onPeriodChange,
      onResetFilters,
    } = this.props;

    return (
      <Card>
        <FilterBar onReset={onResetFilters}>
          <FilterBar.Group>
            <Select
              name="transactionType"
              label="Status"
              value={transactionType}
              onChange={this.onSelectChange}
              width="sm"
            >
              {transactionTypes.map(({ label, value }) => (
                <Select.Option value={value} label={label} key={value} />
              ))}
            </Select>
            <PeriodPicker
              region={region}
              period={period}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onChange={onPeriodChange}
            />
          </FilterBar.Group>
          <FilterBarSearch
            id="Search_Box"
            name="Search"
            value={keywords}
            onChange={this.onSearchBoxChange}
          />
        </FilterBar>
      </Card>
    );
  };
}

const mapStateToProps = (state) => ({
  region: getRegion(state),
  filterOptions: getFilterOptions(state),
  transactionTypes: getTransactionTypes(state),
});

export default connect(mapStateToProps)(BankTransactionFilterOptions);
