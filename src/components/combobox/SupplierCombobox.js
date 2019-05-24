import PropTypes from 'prop-types';
import React from 'react';

import Combobox from '../Feelix/ComboBox/Combobox';

const SupplierCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', showData: true },
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

SupplierCombobox.defaultProps = {
  selectedId: null,
};

SupplierCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SupplierCombobox;
