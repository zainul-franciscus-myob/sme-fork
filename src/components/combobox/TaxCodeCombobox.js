import PropTypes from 'prop-types';
import React from 'react';

import Combobox from '../Feelix/ComboBox/Combobox';

const TaxCodeCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
    disabled,
    allowClearSelection,
    ...otherProps
  } = props;

  const metaData = [
    { columnName: 'displayName', columnWidth: '5rem', showData: true },
    { columnName: 'description', columnWidth: '20rem' },
    { columnName: 'displayRate', columnWidth: '5rem' },
  ];

  const clearSelectionText = 'None';

  const clearSelectionItem = { displayName: clearSelectionText };
  const completedItems = allowClearSelection ? [clearSelectionItem, ...items] : items;

  let selectedItem = {};
  if (typeof selectedIndex === 'number' && selectedIndex !== -1) {
    const index = allowClearSelection ? selectedIndex + 1 : selectedIndex;
    selectedItem = completedItems[index];
  }

  const onComboboxChange = (item) => {
    if (item.displayName === clearSelectionText) {
      onChange({});
    } else {
      onChange(item);
    }
  };

  return (
    <Combobox
      metaData={metaData}
      items={completedItems}
      onChange={onComboboxChange}
      selected={selectedItem}
      disabled={disabled}
      {...otherProps}
    />
  );
};

TaxCodeCombobox.defaultProps = {
  items: [],
  selectedIndex: null,
  disabled: false,
  allowClearSelection: false,
};

TaxCodeCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  allowClearSelection: PropTypes.bool,
};

export default TaxCodeCombobox;
