import React from 'react';

import AutoComplete from './AutoComplete';

const metaData = [
  { columnName: 'itemId', columnWidth: '15rem', showData: true },
  { columnName: 'description', columnWidth: '20rem' },
];

const ItemAutoComplete = (props) => {
  const { addNewItem, ...otherProps } = props;

  return (
    <AutoComplete
      metaData={metaData}
      addNewItem={addNewItem && { label: 'Create item', onAddNew: addNewItem }}
      {...otherProps}
    />
  );
};

ItemAutoComplete.defaultProps = {
  hintText: 'Search for item...',
};

export default ItemAutoComplete;
