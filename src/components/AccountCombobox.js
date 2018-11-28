import PropTypes from 'prop-types';
import React from 'react';

import Combobox from './Feelix/ComboBox/Combobox';

const AccountCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '5rem', showData: true },
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'accountType', columnWidth: '10rem' },
  ];

  let selectedItem = {};
  if (typeof selectedIndex === 'number') {
    selectedItem = items[selectedIndex];
  }

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onChange}
    />
  );
};

AccountCombobox.defaultProps = {
  selectedIndex: null,
};

AccountCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default AccountCombobox;
