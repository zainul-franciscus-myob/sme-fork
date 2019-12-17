import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const ESACombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const selectedItem = items
    .find(option => option.name === selectedId) || {};

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onChange}
      hintText="Please select an ESA"
      {...otherProps}
    />
  );
};

export default ESACombobox;
