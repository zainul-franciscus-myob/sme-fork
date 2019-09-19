import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const SuperFundCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    allowClearSelection,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const clearSelectionText = 'None';

  const clearSelectionItem = { name: clearSelectionText };
  const formattedItems = items.map(({ name, ...rest }) => ({ ...rest, name: ` ${name}` }));

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
      {...otherProps}
    />
  );
};

SuperFundCombobox.defaultProps = {
  selectedId: null,
  allowClearSelection: false,
};

export default SuperFundCombobox;
