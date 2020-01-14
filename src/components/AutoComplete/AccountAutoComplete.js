import React from 'react';

import AutoComplete from './AutoComplete';

const metaData = [
  { columnName: 'displayId', columnWidth: '8rem', showData: true },
  { columnName: 'displayName', columnWidth: '20rem', showData: true },
  { columnName: 'accountType', columnWidth: '10rem' },
];

const AccountAutoComplete = (props) => {
  const {
    addNewAccount,
    ...otherProps
  } = props;

  return (
    <AutoComplete
      metaData={metaData}
      addNewItem={addNewAccount && { onAddNew: addNewAccount, label: 'Create account' }}
      {...otherProps}
    />
  );
};

AccountAutoComplete.defaultProps = {
  hintText: 'Search for account...',
};

export default AccountAutoComplete;
