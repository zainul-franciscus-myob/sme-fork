import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const SuperFundCombobox = (props) => {
  const {
    items = [],
    selectedId = '',
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const formattedItems = items.map(({ name, ...rest }) => ({ ...rest, name: ` ${name}` }));

  const selectedItem = formattedItems.find(option => option.id === selectedId) || {};

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
      items={formattedItems}
      selected={selectedItem}
      onChange={onComboboxChange}
      {...otherProps}
    />
  );
};

export default SuperFundCombobox;
