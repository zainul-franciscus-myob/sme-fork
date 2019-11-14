import { Combobox } from '@myob/myob-widgets';
import React from 'react';

const ContactCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'displayId', columnWidth: '15rem' },
    { columnName: 'displayContactType', columnWidth: '10rem' },
  ];

  const selectedItem = items
    .find(option => option.id === selectedId) || {};

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onChange}
      {...otherProps}
    />
  );
};

ContactCombobox.defaultProps = {
  selectedId: null,
};

export default ContactCombobox;
