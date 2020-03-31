import React from 'react';

import Combobox from './Combobox';

const TaxCodeCombobox = (props) => {
  const {
    disabled,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', columnWidth: '5rem', showData: true },
    { columnName: 'description', columnWidth: '20rem' },
    { columnName: 'displayRate', columnWidth: '5rem' },
  ];

  return (
    <Combobox
      metaData={metaData}
      disabled={disabled}
      noMatchFoundMessage="No tax code found"
      {...otherProps}
    />
  );
};

export default TaxCodeCombobox;
