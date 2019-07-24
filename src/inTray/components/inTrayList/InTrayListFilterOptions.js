import { DatePicker, FilterBar, Search } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../../selectors/InTrayListSelectors';
import handleDatePickerChange from '../../../components/handlers/handleDatePickerChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const InTrayListFilterOptions = (props) => {
  const {
    issueDateFrom,
    issueDateTo,
    keywords,
    onUpdateFilterOptions,
    onApplyFilter,
  } = props;

  return (
    <FilterBar onApply={onApplyFilter}>
      <FilterBar.Group>
        <DatePicker name="issuedFrom" label="Issued from" value={issueDateFrom} onSelect={handleDatePickerChange(onUpdateFilterOptions, 'issueDateFrom')} />
        <DatePicker name="issuedTo" label="Issued to" value={issueDateTo} onSelect={handleDatePickerChange(onUpdateFilterOptions, 'issueDateTo')} />
      </FilterBar.Group>
      <Search
        id="keywords"
        label="Search"
        name="keywords"
        placeholder="Search"
        maxLength={255}
        value={keywords}
        onChange={handleInputChange(onUpdateFilterOptions)}
      />
    </FilterBar>
  );
};

const mapStateToProps = state => getFilterOptions(state);

export default connect(mapStateToProps)(InTrayListFilterOptions);
