import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const AccountCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    allowClearSelection,
    addNewAccount,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '8rem', showData: true },
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'accountType', columnWidth: '10rem' },
  ];

  const clearSelectionText = 'None';

  const clearSelectionItem = { displayId: clearSelectionText };
  const formattedItems = items
    && items.map(({ displayName, ...rest }) => ({
      ...rest,
      displayName: ` ${displayName}`,
    }));

  const completedItems = allowClearSelection
    ? [clearSelectionItem, ...formattedItems]
    : formattedItems;

  const selectedItem = completedItems.find(option => option.id === selectedId) || {};

  const onComboboxChange = (item) => {
    if (item.displayId === clearSelectionText) {
      onChange({ id: '' });
    } else {
      onChange(item);
    }
  };

  return (
    <Combobox
      metaData={metaData}
      items={completedItems}
      selected={selectedItem}
      onChange={onComboboxChange}
      addNewItem={addNewAccount && { onAddNew: addNewAccount, label: 'Create account' }}
      {...otherProps}
    />
  );
};

AccountCombobox.defaultProps = {
  selectedId: null,
  allowClearSelection: false,
};

export default AccountCombobox;
