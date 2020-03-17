import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const CustomerCombobox = (props) => {
  const {
    items = [],
    selectedId = '',
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const selectedItem = items
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
      items={items}
      selected={selectedItem}
      onChange={onComboboxChange}
      {...otherProps}
    />
  );
};

export default CustomerCombobox;
