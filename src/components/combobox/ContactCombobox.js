import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const buildItems = ({ hasAllItem, allItem, items }) => {
  if (hasAllItem) {
    return [allItem, ...items];
  }

  return items;
};

const ContactCombobox = (props) => {
  const {
    items = [],
    selectedId,
    hasAllItem,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'displayId', columnWidth: '15rem' },
    { columnName: 'displayContactType', columnWidth: '10rem' },
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

ContactCombobox.defaultProps = {
  selectedId: null,
};

export default ContactCombobox;
