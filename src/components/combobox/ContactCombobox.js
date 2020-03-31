import React from 'react';

import Combobox from './Combobox';

const ContactCombobox = (props) => {
  const metaData = [
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'displayId', columnWidth: '15rem' },
    { columnName: 'displayContactType', columnWidth: '10rem' },
  ];

  return (
    <Combobox
      metaData={metaData}
      noMatchFoundMessage="No contact found"
      {...props}
    />
  );
};

export default ContactCombobox;
