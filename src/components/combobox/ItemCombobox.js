import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const metaData = [
  { columnName: 'itemId', columnWidth: '15rem', showData: true },
  { columnName: 'description', columnWidth: '20rem' },
];

const ItemCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    addNewItem,
    ...otherProps
  } = props;

  const selectedItem = items
    .find(option => option.id === selectedId) || {};

  const onComboboxChange = (item) => {
    const newItem = item || {};
    if (selectedId !== newItem.id) {
      onChange(newItem);
    }
  };

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onComboboxChange}
      addNewItem={addNewItem && { label: 'Create item', onAddNew: addNewItem }}
      {...otherProps}
    />
  );
};

export default ItemCombobox;
