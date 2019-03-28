import PropTypes from 'prop-types';
import React from 'react';

import Combobox from '../Feelix/ComboBox/Combobox';

const AccountCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
    allowClearSelection,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '5rem', showData: true },
    { columnName: 'displayName', columnWidth: '20rem', showData: true },
    { columnName: 'accountType', columnWidth: '10rem' },
  ];

  const clearSelectionText = 'None';

  const clearSelectionItem = { displayId: clearSelectionText };
  const formattedItems = items && items.map(({ displayName, ...rest }) => ({ ...rest, displayName: ` ${displayName}` }));

  const completedItems = allowClearSelection
    ? [clearSelectionItem, ...formattedItems]
    : formattedItems;

  let selectedItem = {};
  if (typeof selectedIndex === 'number' && selectedIndex !== -1) {
    const index = allowClearSelection ? selectedIndex + 1 : selectedIndex;
    selectedItem = completedItems[index];
  }

  const onComboboxChange = (item) => {
    if (item.displayId === clearSelectionText) {
      onChange({});
    } else {
      onChange(item);
    }
  };

  return (
    <Combobox
      metaData={metaData}
      items={completedItems}
      selected={selectedItem}
      onChange={onComboboxChange}
      {...otherProps}
    />
  );
};

AccountCombobox.defaultProps = {
  selectedIndex: null,
  allowClearSelection: false,
};

AccountCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  allowClearSelection: PropTypes.bool,
};

export default AccountCombobox;
