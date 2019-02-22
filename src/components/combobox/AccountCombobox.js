import PropTypes from 'prop-types';
import React from 'react';

import Combobox from '../Feelix/ComboBox/Combobox';

const AccountCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '5rem', showData: true },
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'accountType', columnWidth: '10rem' },
  ];

  const formattedItems = items && items.map(({ displayName, ...rest }) => ({ ...rest, displayName: ` ${displayName}` }));
  let selectedItem = {};
  if (typeof selectedIndex === 'number' && selectedIndex !== -1) {
    selectedItem = formattedItems[selectedIndex];
  }

  return (
    <Combobox
      metaData={metaData}
      items={formattedItems}
      selected={selectedItem}
      onChange={onChange}
      {...otherProps}
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
