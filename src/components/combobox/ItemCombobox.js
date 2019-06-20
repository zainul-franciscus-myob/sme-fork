import React from 'react';

import Combobox from '../Feelix/ComboBox/Combobox';

const metaData = [
  { columnName: 'itemId', columnWidth: '5rem', showData: true },
  { columnName: 'description', columnWidth: '20rem' },
];

const ItemCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
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
      {...otherProps}
    />
  );
};

ItemCombobox.defaultProps = {
  selectedId: null,
};

export default ItemCombobox;
