import React from 'react';

import Combobox from './Combobox';

const AccountCombobox = (props) => {
  const {
    items = [],
    addNewAccount,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '8rem', showData: true },
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'accountType', columnWidth: '10rem' },
  ];

  const formattedItems = items
    && items.map(({ displayName, ...rest }) => ({
      ...rest,
      displayName: ` ${displayName}`,
    }));

  return (
    <Combobox
      metaData={metaData}
      items={formattedItems}
      addNewItem={addNewAccount && { onAddNew: addNewAccount, label: 'Create account' }}
      noMatchFoundMessage="No account found"
      allItemColumnName="displayId"
      {...otherProps}
    />
  );
};

export default AccountCombobox;
