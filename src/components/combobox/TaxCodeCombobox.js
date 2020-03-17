import React from 'react';

import Combobox from './Combobox';

const TaxCodeCombobox = (props) => {
  const {
    items = [],
    selectedId = '',
    onChange,
    disabled,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', columnWidth: '5rem', showData: true },
    { columnName: 'description', columnWidth: '20rem' },
    { columnName: 'displayRate', columnWidth: '5rem' },
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
      onChange={onComboboxChange}
      selected={selectedItem}
      disabled={disabled}
      {...otherProps}
    />
  );
};

export default TaxCodeCombobox;
