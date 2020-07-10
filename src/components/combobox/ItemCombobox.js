import React from 'react';

import Combobox from './Combobox';

const metaData = [
  { columnName: 'itemId', columnWidth: '15rem', showData: true },
  { columnName: 'description', columnWidth: '20rem' },
];

const ItemCombobox = (props) => {
  const { addNewItem, ...otherProps } = props;

  return (
    <Combobox
      metaData={metaData}
      addNewItem={addNewItem && { label: 'Create item', onAddNew: addNewItem }}
      noMatchFoundMessage="No item found"
      {...otherProps}
    />
  );
};

export default ItemCombobox;
