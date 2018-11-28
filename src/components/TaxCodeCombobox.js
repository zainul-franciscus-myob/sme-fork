import PropTypes from 'prop-types';
import React from 'react';

import Combobox from './Feelix/ComboBox/Combobox';

const TaxCodeCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
    disabled,
  } = props;

  const metaData = [
    { columnName: 'displayName', columnWidth: '5rem', showData: true },
    { columnName: 'description', columnWidth: '20rem' },
    { columnName: 'displayRate', columnWidth: '5rem' },
  ];

  let selectedItem = {};
  if (typeof selectedIndex === 'number' && selectedIndex !== -1) {
    selectedItem = items[selectedIndex];
  }

  return (
    <Combobox
      metaData={metaData}
      items={items}
      onChange={onChange}
      selected={selectedItem}
      disabled={disabled}
    />
  );
};

TaxCodeCombobox.defaultProps = {
  items: [],
  selectedIndex: null,
  disabled: false,
};

TaxCodeCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default TaxCodeCombobox;
