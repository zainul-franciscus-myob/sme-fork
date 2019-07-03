import React from 'react';

import Combobox from '../../../components/Feelix/ComboBox/Combobox';

const SuperFundCombobox = (props) => {
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
    .find(option => option.usi === selectedId) || {};

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onChange}
      hintText="Please select a superannuation fund"
      {...otherProps}
    />
  );
};

export default SuperFundCombobox;
