import React from 'react';

import AutoComplete from './AutoComplete';

const metaData = [{ columnName: 'name', showData: true }];

const CustomerAutoComplete = (props) => {
  const { addNewCustomer, ...otherProps } = props;

  return (
    <AutoComplete
      metaData={metaData}
      addNewItem={
        addNewCustomer && { label: 'Create customer', onAddNew: addNewCustomer }
      }
      {...otherProps}
    />
  );
};

CustomerAutoComplete.defaultProps = {
  hintText: 'Search for customer...',
};

export default CustomerAutoComplete;
