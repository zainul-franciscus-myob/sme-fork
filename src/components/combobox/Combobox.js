import { Combobox as FeelixCombobox } from '@myob/myob-widgets';
import React from 'react';

const Combobox = ({
  selectedId = '', items = [], onChange, ...props
}) => {
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
    <FeelixCombobox
      selected={selectedItem}
      onChange={onComboboxChange}
      items={items}
      {...props}
    />
  );
};

export default Combobox;
