import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const SupplierCombobox = (props) => {
  const {
    items = [],
    selectedId = '',
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', showData: true },
  ];

  const selectedItem = items
    .find(option => option.id === selectedId) || {};

  const onComboboxChange = (item) => {
    const newItem = item || {};
    const { id = '' } = newItem;
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

export default SupplierCombobox;
