import React from 'react';

import CreateNewItemCombobox from './CreateNewItemCombobox';

const StateEditableCombobox = (props) => {
  const metaData = [{ columnName: 'name', showData: true }];

  return (
    <CreateNewItemCombobox
      metaData={metaData}
      addItemLabel={{ label: 'Create new state' }}
      {...props}
    />
  );
};

export default StateEditableCombobox;
