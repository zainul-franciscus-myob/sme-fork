import React from 'react';

import Combobox from './Combobox';

const CustomerCombobox = (props) => {
  const { items = [] } = props;

  const metaData = [{ columnName: 'name', showData: true }];

  return (
    <Combobox
      {...props}
      items={items}
      metaData={metaData}
      noMatchFoundMessage="No customer found"
      allItemColumnName="name"
    />
  );
};

export default CustomerCombobox;
