import React from 'react';

import Combobox from './Combobox';
import countryList from '../../sharedData/countryList';

const CountryCombobox = (props) => {
  const metaData = [{ columnName: 'name', showData: true }];

  return (
    <Combobox
      metaData={metaData}
      items={countryList}
      noMatchFoundMessage="No country found"
      {...props}
    />
  );
};

export default CountryCombobox;
