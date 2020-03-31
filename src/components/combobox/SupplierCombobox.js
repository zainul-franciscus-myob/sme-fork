import React from 'react';

import Combobox from './Combobox';

const SupplierCombobox = (props) => {
  const metaData = [
    { columnName: 'displayName', showData: true },
  ];

  return (
    <Combobox
      metaData={metaData}
      noMatchFoundMessage="No supplier found"
      {...props}
    />
  );
};

export default SupplierCombobox;
