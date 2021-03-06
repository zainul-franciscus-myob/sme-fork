import React from 'react';

import CreateNewItemCombobox from './CreateNewItemCombobox';
import countryList from '../../sharedData/countryList';

const CountryEditableCombobox = (props) => {
  const metaData = [{ columnName: 'name', showData: true }];

  return (
    <CreateNewItemCombobox
      items={countryList}
      metaData={metaData}
      addItemLabel={{ label: 'Create new country' }}
      {...props}
    />
  );
};

export default CountryEditableCombobox;
