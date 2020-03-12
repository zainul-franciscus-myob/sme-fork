import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const ContactCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'displayId', columnWidth: '15rem' },
    { columnName: 'displayContactType', columnWidth: '10rem' },
  ];

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
      {...otherProps}
    />
  );
};

export default ContactCombobox;
