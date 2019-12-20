import { DatePicker } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilterOptions } from '../InTrayModalSelectors';
import FilterBar from '../../../../components/Feelix/FilterBar/FilterBar';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import handleDatePickerChange from '../../../../components/handlers/handleDatePickerChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const InTrayModalFilterOptions = (props) => {
  const {
    invoiceDateFrom,
    invoiceDateTo,
    keywords,
    onUpdateFilterOptions,
    onApplyFilter,
  } = props;

  return (
    <FilterBar onApply={onApplyFilter}>
      <FilterBar.Group>
        <DatePicker name="issuedFrom" label="Issued from" value={invoiceDateFrom} onSelect={handleDatePickerChange(onUpdateFilterOptions, 'invoiceDateFrom')} />
        <DatePicker name="issuedTo" label="Issued to" value={invoiceDateTo} onSelect={handleDatePickerChange(onUpdateFilterOptions, 'invoiceDateTo')} />
      </FilterBar.Group>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={handleInputChange(onUpdateFilterOptions)}
      />
    </FilterBar>
  );
};

const mapStateToProps = state => getFilterOptions(state);

export default connect(mapStateToProps)(InTrayModalFilterOptions);
