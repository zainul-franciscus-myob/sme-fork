import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const SuperFundProductCombobox = (props) => {
  const { items = [], selectedId, onChange, ...otherProps } = props;

  const metaData = [{ columnName: 'name', showData: true }];

  const clearSelectionItem = { name: 'Clear' };
  const completedItems = [selectedId && clearSelectionItem, ...items].filter(
    Boolean
  );

  const selectedItem =
    completedItems.find((option) => option.usi === selectedId) || {};

  const handleChange = (item) =>
    item.name === 'Clear' ? onChange({ usi: '' }) : onChange(item);

  return (
    <Combobox
      metaData={metaData}
      items={completedItems}
      selected={selectedItem}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export default SuperFundProductCombobox;
