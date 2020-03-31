import React from 'react';

import Combobox from './Combobox';

const SuperFundCombobox = (props) => {
  const {
    items = [],
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'name', showData: true },
  ];

  const formattedItems = items.map(({ name, ...rest }) => ({ ...rest, name: ` ${name}` }));

  return (
    <Combobox
      metaData={metaData}
      items={formattedItems}
      noMatchFoundMessage="No super fund found"
      {...otherProps}
    />
  );
};

export default SuperFundCombobox;
