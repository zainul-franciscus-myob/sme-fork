import React from 'react';

import AutoCompleteCombobox from './AutoCompleteCombobox';

const ContactAutoComplete = ({ onAddNewContact, ...otherProps }) => {
  const metaData = [
    {
      columnName: 'displayName',
      columnWidth: '22.9rem',
      showData: true,
      showPagination: true,
    },
    { columnName: 'displayId', columnWidth: '15rem' },
    { columnName: 'displayContactType', columnWidth: '10rem' },
  ];

  const addNewItem = onAddNewContact
    ? {
        label: 'Create contact',
        onAddNew: onAddNewContact,
      }
    : undefined;

  return (
    <AutoCompleteCombobox
      metaData={metaData}
      addNewItem={addNewItem}
      {...otherProps}
    />
  );
};

ContactAutoComplete.defaultProps = {
  hintText: 'Search for contact...',
  noMatchFoundMessage: 'No contact found',
};

export default ContactAutoComplete;
