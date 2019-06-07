import PropTypes from 'prop-types';
import React from 'react';

import Combobox from '../../../components/Feelix/ComboBox/Combobox';

const metaData = [
  { columnName: 'itemId', showData: true },
  { columnName: 'description', showData: true },
];

const ItemCombobox = (props) => {
  const {
    items = [],
    selectedId,
    onChange,
    ...otherProps
  } = props;

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

ItemCombobox.defaultProps = {
  selectedId: null,
};

ItemCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ItemCombobox;
