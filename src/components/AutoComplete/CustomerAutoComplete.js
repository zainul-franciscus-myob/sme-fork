import React from 'react';

import AutoCompleteCombobox from './AutoCompleteCombobox';

const metaData = [{ columnName: 'name', showData: true, showPagination: true }];

const CustomerAutoComplete = ({ onAddNewCustomer, ...otherProps }) => {
  const addNewItem = onAddNewCustomer
    ? {
        label: 'Create customer',
        onAddNew: onAddNewCustomer,
      }
    : undefined;

  return (
    <AutoCompleteCombobox
      metaData={metaData}
      addNewItem={addNewItem}
      {...otherProps}
    />
  );
};

CustomerAutoComplete.defaultProps = {
  hintText: 'Search for customer...',
  noMatchFoundMessage: 'No customer found',
};

export default CustomerAutoComplete;
