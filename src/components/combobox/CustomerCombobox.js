import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const buildItems = ({ hasAllItem, allItem, items }) => {
  if (hasAllItem) {
    return [allItem, ...items];
  }

  return items;
};

const CustomerCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    hasAllItem,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const allItem = { name: 'All', value: undefined };

  const selectedItem = items
    .find(option => option.value === selectedId) || allItem;

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

CustomerCombobox.defaultProps = {
  selectedId: null,
};

export default CustomerCombobox;
