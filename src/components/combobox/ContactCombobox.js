import PropTypes from 'prop-types';
import React from 'react';

import Combobox from '../Feelix/ComboBox/Combobox';

const ContactCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '10rem' },
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'contactType', columnWidth: '10rem' },
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

ContactCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ContactCombobox;
