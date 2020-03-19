import { Combobox } from '@myob/myob-widgets';
import React from 'react';

import countryList from '../../sharedData/countryList';

const CountryCombobox = (props) => {
  const {
    items,
    selectedId = '',
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const selectedItem = countryList
    .find(option => option.value === selectedId) || {};

  const onComboboxChange = (item) => {
    const newItem = item || {};
    const { value: id = '' } = newItem;
    if (selectedId !== id) {
      onChange(newItem);
    }
  };

  return (
    <Combobox
      metaData={metaData}
      items={countryList}
      selected={selectedItem}
      onChange={onComboboxChange}
      noMatchFoundMessage="No country found"
      {...otherProps}
    />
  );
};

export default CountryCombobox;
