import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const CustomerCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const selectedItem = items
    .find(option => option.value === selectedId) || {};

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

CustomerCombobox.defaultProps = {
  selectedId: null,
};

export default CustomerCombobox;
