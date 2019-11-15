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

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onChange}
      addNewItem={addNewItem && { label: 'Create item', onAddNew: addNewItem }}
      {...otherProps}
    />
  );
};

ItemCombobox.defaultProps = {
  selectedId: null,
};

export default ItemCombobox;
