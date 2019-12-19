import { Combobox } from '@myob/myob-widgets';
import React from 'react';

import countryList from '../../sharedData/countryList';

const CountryCombobox = (props) => {
  const {
    items,
    selectedId,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const selectedItem = countryList
    .find(option => option.value === selectedId) || {};

  return (
    <Combobox
      metaData={metaData}
      items={countryList}
      selected={selectedItem}
      onChange={onChange}
      {...otherProps}
    />
  );
};

CountryCombobox.defaultProps = {
  selectedId: null,
};

export default CountryCombobox;
