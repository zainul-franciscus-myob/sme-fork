import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const PayItemCombobox = (props) => {
  const { items = [], selectedId, onChange, ...otherProps } = props;

  const metaData = [{ columnName: 'name', showData: true }];

  const selectedItem = items.find((option) => option.id === selectedId) || {};

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

export default PayItemCombobox;
