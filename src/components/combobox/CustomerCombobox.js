import React from 'react';

import Combobox from './Combobox';

const CustomerCombobox = (props) => {
  const metaData = [
    { columnName: 'name', showData: true },
  ];

  return (
    <Combobox
      metaData={metaData}
      noMatchFoundMessage="No customer found"
      {...props}
    />
  );
};

export default CustomerCombobox;
