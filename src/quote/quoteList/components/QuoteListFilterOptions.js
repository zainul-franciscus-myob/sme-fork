import {
  Button, DatePicker, DirectSearchBox, FilterBar, InputLabel,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { getCustomerFilterOptions, getFormattedFilterOptions, getTotal } from '../quoteListSelector';
import ContactCombobox from '../../../components/combobox/ContactCombobox';
import style from './QuoteListView.css';

class QuoteListFilterOptions extends React.Component {
  onComboBoxChange = (item) => {
    const filterName = 'customerId';
    const { value } = item;
    const { onUpdateFilters } = this.props;

    onUpdateFilters({ filterName, value });
  }

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
        customerId,
        dateFrom,
        dateTo,
        keywords,
      },
      customerFilterOptions,
      total,
      onApplyFilter,
    } = this.props;

    return (
      <Fragment>
        <FilterBar>
          <FilterBar.Group>
            <FilterBar.Option>
              <ContactCombobox
                items={customerFilterOptions}
                selectedId={customerId}
                onChange={this.onComboBoxChange}
                label="Customer"
                name="Customer"
                hideLabel={false}
              />
            </FilterBar.Option>
            <FilterBar.Option>
              <InputLabel label="Issued from" id="Date_From" />
              <DatePicker inputProps={{ id: 'Date_From' }} dateTime={dateFrom} onChange={this.onFilterChange('dateFrom')} />
            </FilterBar.Option>
            <FilterBar.Option>
              <InputLabel label="Issued to" id="Date_To" />
              <DatePicker inputProps={{ id: 'Date_To' }} dateTime={dateTo} onChange={this.onFilterChange('dateTo')} />
            </FilterBar.Option>
            <FilterBar.Option>
              <InputLabel label="Search" id="Search_Box" />
              <DirectSearchBox id="Search_Box" placeholder="Search" maxLength={255} value={keywords} onChange={this.onSearchBoxChange} />
            </FilterBar.Option>
            <FilterBar.Option>
              <Button type="secondary" onClick={onApplyFilter}>Apply filters</Button>
            </FilterBar.Option>
          </FilterBar.Group>
        </FilterBar>
        <hr />
        <div className={style.total}>
          {`Total: ${total}`}
        </div>
      </Fragment>
    );
  }
}

QuoteListFilterOptions.propTypes = {
  customerFilterOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filterOptions: PropTypes.shape({
    customerId: PropTypes.string,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    keywords: PropTypes.string,
  }).isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  onUpdateFilters: PropTypes.func.isRequired,
  total: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  customerFilterOptions: getCustomerFilterOptions(state),
  filterOptions: getFormattedFilterOptions(state),
  total: getTotal(state),
});

export default connect(mapStateToProps)(QuoteListFilterOptions);
