import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const buildItems = ({ hasAllItem, allItem, items }) => {
  if (hasAllItem) {
    return [allItem, ...items];
  }

  return items;
};

const SupplierCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    hasAllItem,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', showData: true },
  ];

  const allItem = { displayName: 'All', id: undefined };

  const emptyValue = hasAllItem ? allItem : {};

  const selectedItem = items
    .find(option => option.id === selectedId) || emptyValue;

  return (
    <Combobox
      metaData={metaData}
      items={buildItems({ hasAllItem, allItem, items })}
      selected={selectedItem}
      onChange={onChange}
      {...otherProps}
    />
  );
};

SupplierCombobox.defaultProps = {
  selectedId: null,
};

export default SupplierCombobox;
