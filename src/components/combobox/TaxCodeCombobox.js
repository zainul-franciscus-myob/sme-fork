import { Combobox } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const TaxCodeCombobox = (props) => {
  const {
    items = [],
    selectedId,
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

  const selectedItem = completedItems
    .find(option => option.id === selectedId) || {};

  const onComboboxChange = (item) => {
    if (item.displayName === clearSelectionText) {
      onChange({ id: '' });
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
  selectedId: null,
  disabled: false,
  allowClearSelection: false,
};

TaxCodeCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  selectedId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  allowClearSelection: PropTypes.bool,
};

export default TaxCodeCombobox;
