import React from 'react';

import Combobox from './Combobox';

const SupplierCombobox = (props) => {
  const metaData = [{ columnName: 'displayName', showData: true }];

  return (
    <Combobox
      {...props}
      metaData={metaData}
      noMatchFoundMessage="No supplier found"
      allItemColumnName="displayName"
    />
  );
};

export default SupplierCombobox;
