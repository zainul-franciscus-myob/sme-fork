import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const SupplierCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', showData: true },
  ];

  const selectedItem = items
    .find(option => option.id === selectedId) || {};

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

SupplierCombobox.defaultProps = {
  selectedId: null,
};

export default SupplierCombobox;
