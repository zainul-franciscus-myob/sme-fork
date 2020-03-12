import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const AccountCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    addNewAccount,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '8rem', showData: true },
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'accountType', columnWidth: '10rem' },
  ];


  const formattedItems = items
    && items.map(({ displayName, ...rest }) => ({
      ...rest,
      displayName: ` ${displayName}`,
    }));

  const selectedItem = formattedItems.find(option => option.id === selectedId) || {};

  const onComboboxChange = (item) => {
    const newItem = item || {};
    if (selectedId !== newItem.id) {
      onChange(newItem);
    }
  };

  return (
    <Combobox
      metaData={metaData}
      items={formattedItems}
      selected={selectedItem}
      onChange={onComboboxChange}
      addNewItem={addNewAccount && { onAddNew: addNewAccount, label: 'Create account' }}
      {...otherProps}
    />
  );
};

export default AccountCombobox;
